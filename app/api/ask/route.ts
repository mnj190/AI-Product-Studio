import { NextResponse } from "next/server";
import { createDraftAnswer } from "@/lib/answer-draft";
import { createFeedbackCandidate } from "@/lib/feedback-candidate";
import { lookupWiki, tokenizeQuery } from "@/lib/wiki-lookup";

export const runtime = "nodejs";

const maxQuestionLength = 500;

type AskRequest = {
  question?: unknown;
};

export async function GET() {
  return NextResponse.json({
    name: "Ask About Me API",
    mode: "mock",
    description:
      "POST a question to receive Local Wiki Lookup results, a deterministic draft answer, and a Wiki feedback candidate. No external LLM API is called.",
    endpoint: "POST /api/ask",
    request: {
      question: "AI를 어떻게 활용하나요?",
    },
  });
}

export async function POST(request: Request) {
  let payload: AskRequest;

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
        mode: "mock",
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
        mode: "mock",
      },
      { status: 400 },
    );
  }

  const results = lookupWiki(question, 6);
  const draft = createDraftAnswer(question, results);
  const feedback = createFeedbackCandidate(question, draft);
  const terms = tokenizeQuery(question).slice(0, 10);

  return NextResponse.json({
    ...draft,
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
    mode: "mock",
  });
}
