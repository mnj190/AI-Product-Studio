import type { LookupResult } from "@/lib/wiki-lookup";

export type AnswerStatus = "answered" | "unknown" | "blocked";

export type AnswerSource = {
  title: string;
  section: string;
  href: string;
  summary: string;
  matchedTerms: string[];
  excerpt: string;
};

export type DraftAnswer = {
  status: AnswerStatus;
  answer: string;
  sources: AnswerSource[];
  warnings: string[];
};

const sensitivePatterns = [
  /api\s*key/i,
  /secret/i,
  /token/i,
  /password/i,
  /비밀번호/,
  /토큰/,
  /시크릿/,
  /계좌번호/,
  /주민등록번호/,
  /운영\s*서버/,
  /서버\s*접속/,
  /고객\s*정보/,
  /회사\s*기밀/,
];

const tradingAdvicePatterns = [
  /추천\s*종목/,
  /종목\s*추천/,
  /매수/,
  /매도/,
  /수익\s*보장/,
  /수익률\s*(얼마|몇|공개|알려)/,
  /손익\s*(얼마|몇|공개|알려)/,
  /잔고\s*(얼마|몇|공개|알려)/,
  /거래\s*내역/,
  /매매\s*(시점|수량|내역)/,
  /따라\s*하면\s*돈/,
  /뭐\s*사/,
  /뭘\s*사/,
];

const unavailableFactPatterns = [
  /preview\s*url.*(어디|알려|무엇|뭐)/i,
  /vercel.*preview\s*url.*(어디|알려|무엇|뭐)/i,
  /배포\s*url.*(어디|알려|무엇|뭐)/i,
];

const overclaimPatterns = [
  /없는.*성과.*(포장|멋지게|부풀)/,
  /성과.*(포장|부풀|과장)/,
  /문서에\s*없는.*(만들|써줘|포장)/,
];

const makeExcerpt = (body: string, matchedTerms: string[]) => {
  const compact = body
    .replace(/^#.+$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const lower = compact.toLowerCase();
  const firstTerm = matchedTerms.find((term) => lower.includes(term.toLowerCase()));
  const start = firstTerm ? Math.max(0, lower.indexOf(firstTerm.toLowerCase()) - 80) : 0;

  return compact.slice(start, start + 320);
};

const toAnswerSource = (result: LookupResult): AnswerSource => ({
  title: result.entry.title,
  section: result.entry.section,
  href: result.href,
  summary: result.entry.summary,
  matchedTerms: result.matchedTerms,
  excerpt: makeExcerpt(result.entry.body, result.matchedTerms),
});

const isSensitiveQuestion = (question: string) =>
  sensitivePatterns.some((pattern) => pattern.test(question));

const isTradingAdviceQuestion = (question: string) =>
  tradingAdvicePatterns.some((pattern) => pattern.test(question));

const isUnavailableFactQuestion = (question: string) =>
  unavailableFactPatterns.some((pattern) => pattern.test(question));

const isOverclaimQuestion = (question: string) =>
  overclaimPatterns.some((pattern) => pattern.test(question));

export const createDraftAnswer = (question: string, results: LookupResult[]): DraftAnswer => {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion) {
    return {
      status: "unknown",
      answer: "질문을 입력하면 LLM Wiki에서 관련 문서를 먼저 찾아볼 수 있습니다.",
      sources: [],
      warnings: [],
    };
  }

  if (isSensitiveQuestion(trimmedQuestion)) {
    return {
      status: "blocked",
      answer: "해당 정보는 공개할 수 없는 민감 정보입니다.",
      sources: [],
      warnings: ["민감 정보 요청으로 판단되어 답변하지 않습니다."],
    };
  }

  if (isTradingAdviceQuestion(trimmedQuestion)) {
    const safeSources = results.slice(0, 3).map(toAnswerSource);

    return {
      status: "blocked",
      answer:
        "자동매매봇은 개발 실험과 운영 기록 관점으로만 설명할 수 있습니다. 종목 추천, 매수/매도 권유, 수익 보장, 구체적인 계좌 잔고나 손익 금액, 매매 시점/수량처럼 민감하거나 투자 권유로 읽힐 수 있는 답변은 제공하지 않습니다.",
      sources: safeSources,
      warnings: ["투자 권유로 해석될 수 있는 질문은 안전 정책에 따라 제한합니다."],
    };
  }

  if (isUnavailableFactQuestion(trimmedQuestion) || isOverclaimQuestion(trimmedQuestion)) {
    return {
      status: "unknown",
      answer:
        "현재 LLM Wiki에는 해당 내용이 충분히 정리되어 있지 않습니다. 실제 배포 URL, 검증되지 않은 성과, 문서에 없는 주장은 만들어내지 않고 관련 문서를 먼저 추가하거나 기존 문서를 보강해야 합니다.",
      sources: [],
      warnings: ["현재 문서로 검증할 수 없는 질문입니다."],
    };
  }

  if (results.length === 0) {
    return {
      status: "unknown",
      answer:
        "현재 LLM Wiki에는 해당 내용이 충분히 정리되어 있지 않습니다. 이 질문에 답하려면 관련 Wiki 문서를 먼저 추가하거나 기존 문서를 보강해야 합니다.",
      sources: [],
      warnings: ["관련 문서 후보를 찾지 못했습니다."],
    };
  }

  const sources = results.slice(0, 5).map(toAnswerSource);
  const sourceLines = sources
    .slice(0, 3)
    .map((source, index) => `${index + 1}. ${source.title} — ${source.summary}`)
    .join("\n");

  return {
    status: "answered",
    answer: `이 질문은 아래 문서를 근거로 답변할 수 있습니다.\n\n${sourceLines}\n\n현재 단계에서는 실제 LLM 답변 생성 전이므로, 먼저 관련 문서를 확인하는 draft answer만 제공합니다.`,
    sources,
    warnings: ["아직 실제 LLM API를 호출하지 않았습니다."],
  };
};
