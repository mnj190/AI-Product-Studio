export type AskApiMode = "mock" | "real";
export type LlmProvider = "openai";

export type AskConfig = {
  mode: AskApiMode;
  provider: LlmProvider;
  model: string;
  maxInputChars: number;
  maxOutputTokens: number;
  timeoutMs: number;
  hasApiKey: boolean;
  realModeReady: boolean;
};

const toPositiveInt = (value: string | undefined, fallback: number) => {
  const parsed = Number.parseInt(value ?? "", 10);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const getAskConfig = (): AskConfig => {
  const mode: AskApiMode = process.env.ASK_API_MODE === "real" ? "real" : "mock";
  const provider: LlmProvider = "openai";
  const model = process.env.LLM_MODEL?.trim() ?? "";
  const hasApiKey = Boolean(process.env.LLM_API_KEY?.trim());

  return {
    mode,
    provider,
    model,
    maxInputChars: toPositiveInt(process.env.LLM_MAX_INPUT_CHARS, 12000),
    maxOutputTokens: toPositiveInt(process.env.LLM_MAX_OUTPUT_TOKENS, 600),
    timeoutMs: toPositiveInt(process.env.LLM_TIMEOUT_MS, 15000),
    hasApiKey,
    realModeReady: mode === "real" && hasApiKey && Boolean(model),
  };
};

export const getAskRuntimeLabel = (config = getAskConfig()) => {
  if (config.realModeReady) {
    return "real";
  }

  if (config.mode === "real") {
    return "real-not-configured";
  }

  return "mock";
};
