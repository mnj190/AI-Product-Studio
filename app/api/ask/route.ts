import { NextResponse } from "next/server";
import { getAskConfig, getAskRuntimeLabel } from "@/lib/ask-config";
import { type AnswerStatus, createDraftAnswer } from "@/lib/answer-draft";
import { createFeedbackCandidate } from "@/lib/feedback-candidate";
import { generateLlmAnswer } from "@/lib/llm-provider";
import { checkRateLimit, getClientRateLimitKey } from "@/lib/rate-limit";
import { lookupWiki, tokenizeQuery } from "@/lib/wiki-lookup";

export const runtime = "nodejs";

const maxQuestionLength = 500;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 20;

type AskRequest = {
  question?: unknown;
};

export async function GET() {
  const config = getAskConfig();

  return NextResponse.json({
    name: "Ask About Me API",
    mode: getAskRuntimeLabel(config),
    provider: config.provider,
    model: config.model || null,
    realModeReady: config.realModeReady,
    description:
      "POST a question to receive Local Wiki Lookup results, a guarded answer, and a Wiki feedback candidate. By default this runs in mock mode with no external LLM API call.",
    endpoint: "POST /api/ask",
    request: {
      question: "AI를 어떻게 활용하나요?",
    },
    limits: {
      maxQuestionLength,
      rateLimitMaxRequests,
      rateLimitWindowSeconds: rateLimitWindowMs / 1000,
    },
  });
}

export async function POST(request: Request) {
  let payload: AskRequest;
  const config = getAskConfig();
  const runtimeMode = getAskRuntimeLabel(config);
  const rateLimit = checkRateLimit({
    key: `ask:${getClientRateLimitKey(request)}`,
    limit: rateLimitMaxRequests,
    windowMs: rateLimitWindowMs,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        status: "blocked",
        answer: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
        query: "",
        terms: [],
        results: [],
        sources: [],
        warnings: ["Rate limit exceeded."],
        feedback: null,
        mode: runtimeMode,
        rateLimit,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
        },
      },
    );
  }

  try {
    payload = (await request.json()) as AskRequest;
  } catch {
    return NextResponse.json(
      {
        status: "unknown",
        answer: "요청 본문을 JSON으로 해석할 수 없습니다.",
        results: [],
        sources: [],
        warnings: ["Invalid JSON request body."],
        feedback: null,
        mode: runtimeMode,
        rateLimit,
      },
      { status: 400 },
    );
  }

  const question = typeof payload.question === "string" ? payload.question.trim() : "";

  if (!question) {
    const draft = createDraftAnswer("", []);

    return NextResponse.json(
      {
        ...draft,
        query: "",
        terms: [],
        results: [],
        feedback: null,
        mode: runtimeMode,
        rateLimit,
      },
      { status: 400 },
    );
  }

  if (question.length > maxQuestionLength) {
    return NextResponse.json(
      {
        status: "blocked",
        answer: `질문은 ${maxQuestionLength}자 이하로 입력해주세요.`,
        query: question.slice(0, maxQuestionLength),
        terms: [],
        results: [],
        sources: [],
        warnings: ["Question is too long."],
        feedback: null,
        mode: runtimeMode,
        rateLimit,
      },
      { status: 400 },
    );
  }

  const results = lookupWiki(question, 6);
  const draft = createDraftAnswer(question, results);
  const terms = tokenizeQuery(question).slice(0, 10);
  const warnings = [...draft.warnings];
  let answer = draft.answer;
  let status: AnswerStatus = draft.status;
  let provider: string | null = null;
  let model: string | null = null;

  if (config.realModeReady && draft.status === "answered") {
    try {
      const llmAnswer = await generateLlmAnswer({
        question,
        sources: draft.sources,
        config,
      });

      provider = llmAnswer.provider;
      model = llmAnswer.model;

      if (llmAnswer.status === "answered") {
        answer = llmAnswer.answer;
        status = "answered";
        warnings.push("외부 LLM provider를 호출해 답변을 생성했습니다.");
      } else {
        warnings.push(...llmAnswer.warnings);
      }
    } catch (error) {
      warnings.push(error instanceof Error ? error.message : "LLM provider call failed.");
    }
  } else if (config.mode === "real" && !config.realModeReady) {
    warnings.push("ASK_API_MODE=real이지만 LLM_API_KEY 또는 LLM_MODEL이 설정되지 않아 mock draft를 반환합니다.");
  }

  const guardedAnswer = {
    ...draft,
    status,
    answer,
    warnings,
  };
  const feedback = createFeedbackCandidate(question, guardedAnswer);

  return NextResponse.json({
    ...guardedAnswer,
    query: question,
    terms,
    results: results.map((result) => ({
      title: result.entry.title,
      section: result.entry.section,
      href: result.href,
      summary: result.entry.summary,
      score: result.score,
      matchedTerms: result.matchedTerms,
    })),
    feedback,
    mode: runtimeMode,
    provider,
    model,
    rateLimit,
  });
}
