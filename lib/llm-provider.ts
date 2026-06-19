import type { AskConfig } from "@/lib/ask-config";
import type { AnswerSource } from "@/lib/answer-draft";

export type LlmProviderAnswer = {
  status: "answered" | "unknown";
  answer: string;
  warnings: string[];
  provider: string;
  model: string;
};

type GenerateLlmAnswerInput = {
  question: string;
  sources: AnswerSource[];
  config: AskConfig;
};

const sourceContext = (sources: AnswerSource[]) =>
  sources
    .map(
      (source, index) => [
        `[${index + 1}] ${source.title}`,
        `href: ${source.href}`,
        `summary: ${source.summary}`,
        `excerpt: ${source.excerpt}`,
      ].join("\n"),
    )
    .join("\n\n");

const trimInput = (input: string, maxChars: number) =>
  input.length > maxChars ? `${input.slice(0, maxChars)}\n\n[context trimmed]` : input;

const extractOutputText = (body: unknown) => {
  if (body && typeof body === "object" && "output_text" in body) {
    const outputText = (body as { output_text?: unknown }).output_text;

    if (typeof outputText === "string") {
      return outputText.trim();
    }
  }

  return "";
};

export const generateLlmAnswer = async ({
  question,
  sources,
  config,
}: GenerateLlmAnswerInput): Promise<LlmProviderAnswer> => {
  if (!config.realModeReady) {
    return {
      status: "unknown",
      answer: "real mode가 요청되었지만 LLM provider 설정이 완료되지 않았습니다.",
      warnings: ["LLM_API_KEY와 LLM_MODEL을 설정해야 real mode를 사용할 수 있습니다."],
      provider: config.provider,
      model: config.model || "not-configured",
    };
  }

  const context = trimInput(sourceContext(sources), config.maxInputChars);
  const instructions = [
    "You answer questions about Jo Jungmin's public portfolio.",
    "Use only the provided source context.",
    "If the source context does not support an answer, say that the wiki does not contain enough information.",
    "Do not reveal secrets, private operational details, tokens, or personal sensitive information.",
    "Do not provide investment advice, trading recommendations, or guaranteed returns.",
    "Answer in Korean.",
    "Keep the answer concise and cite source titles naturally.",
  ].join("\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LLM_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      max_output_tokens: config.maxOutputTokens,
      reasoning: { effort: "low" },
      input: [
        {
          role: "developer",
          content: instructions,
        },
        {
          role: "user",
          content: `Question:\n${question}\n\nSource context:\n${context}`,
        },
      ],
    }),
    signal: AbortSignal.timeout(config.timeoutMs),
  });

  if (!response.ok) {
    return {
      status: "unknown",
      answer: "LLM provider 응답을 정상적으로 받지 못했습니다. 현재는 문서 기반 draft answer로 대체합니다.",
      warnings: [`Provider request failed with status ${response.status}.`],
      provider: config.provider,
      model: config.model,
    };
  }

  const body = (await response.json()) as unknown;
  const answer = extractOutputText(body);

  if (!answer) {
    return {
      status: "unknown",
      answer: "LLM provider가 빈 답변을 반환했습니다. 현재는 문서 기반 draft answer로 대체합니다.",
      warnings: ["Provider returned empty output_text."],
      provider: config.provider,
      model: config.model,
    };
  }

  return {
    status: "answered",
    answer,
    warnings: [],
    provider: config.provider,
    model: config.model,
  };
};
