import type { DraftAnswer } from "@/lib/answer-draft";

export type FeedbackAction = "none" | "update" | "create" | "prompt" | "log";

export type FeedbackCandidate = {
  question: string;
  action: FeedbackAction;
  targetPath?: string;
  reason: string;
  sourceHrefs: string[];
  safety: "ok" | "blocked" | "unknown";
  nextStep: string;
};

const promptPatterns = [/프롬프트/, /prompt/i, /질문.*저장/, /어떻게.*물어/];
const projectPatterns = [/프로젝트/, /portfolio/i, /챗봇/, /자동매매/, /oris/i, /webgpu/i];
const wikiPatterns = [/wiki/i, /위키/, /llm/i, /vibe/i, /mcp/i, /agent/i, /context/i];
const aboutPatterns = [/조정민/, /경력/, /개발자/, /기술/, /스킬/, /관심/];

const matchesAny = (question: string, patterns: RegExp[]) =>
  patterns.some((pattern) => pattern.test(question));

const inferTargetPath = (question: string, draft: DraftAnswer) => {
  if (draft.sources[0]?.href) {
    const first = draft.sources[0];

    if (first.section === "about") {
      return "content/about/about-me.md";
    }

    return `content/${first.section}/${first.href.split("/").pop()}.md`;
  }

  if (matchesAny(question, promptPatterns)) {
    return "content/prompts/new-prompt.md";
  }

  if (matchesAny(question, projectPatterns)) {
    return "content/projects/ask-about-me-chatbot.md";
  }

  if (matchesAny(question, wikiPatterns)) {
    return "content/wiki/new-topic.md";
  }

  if (matchesAny(question, aboutPatterns)) {
    return "content/about/about-me.md";
  }

  return "content/wiki/new-topic.md";
};

export const createFeedbackCandidate = (
  question: string,
  draft: DraftAnswer | null,
): FeedbackCandidate | null => {
  const trimmedQuestion = question.trim();

  if (!trimmedQuestion || !draft) {
    return null;
  }

  const sourceHrefs = draft.sources.map((source) => source.href);

  if (draft.status === "blocked") {
    return {
      question: trimmedQuestion,
      action: "none",
      reason: "민감 정보 또는 안전 정책에 걸린 질문은 Wiki에 저장하지 않습니다.",
      sourceHrefs,
      safety: "blocked",
      nextStep: "저장하지 않고, 필요하다면 안전 정책 문서만 보강합니다.",
    };
  }

  if (draft.status === "unknown") {
    return {
      question: trimmedQuestion,
      action: "create",
      targetPath: inferTargetPath(trimmedQuestion, draft),
      reason: "현재 Wiki에 충분한 문서가 없으므로 새 문서 후보로 볼 수 있습니다.",
      sourceHrefs,
      safety: "unknown",
      nextStep: "관련 raw source를 추가한 뒤 LLM Wiki ingest workflow로 새 문서를 만듭니다.",
    };
  }

  if (matchesAny(trimmedQuestion, promptPatterns)) {
    return {
      question: trimmedQuestion,
      action: "prompt",
      targetPath: "content/prompts/new-prompt.md",
      reason: "질문이 재사용 가능한 프롬프트나 질문 패턴으로 이어질 수 있습니다.",
      sourceHrefs,
      safety: "ok",
      nextStep: "Prompt Library 저장 기준에 맞는지 확인한 뒤 프롬프트 문서로 정리합니다.",
    };
  }

  return {
    question: trimmedQuestion,
    action: "update",
    targetPath: inferTargetPath(trimmedQuestion, draft),
    reason: "관련 문서가 이미 있으므로 기존 Wiki/콘텐츠 문서를 보강하는 후보입니다.",
    sourceHrefs,
    safety: "ok",
    nextStep: "관련 문서를 업데이트하고 content/wiki/log.md에 변경 기록을 남깁니다.",
  };
};

