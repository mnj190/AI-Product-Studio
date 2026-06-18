import {
  type ContentEntry,
  type ContentSection,
  getAllEntries,
  getEntryHref,
} from "@/lib/content";

export type LookupResult = {
  entry: ContentEntry;
  href: string;
  score: number;
  matchedTerms: string[];
};

const stopWords = new Set([
  "그리고",
  "그러면",
  "어떤",
  "무엇",
  "뭐야",
  "뭔가요",
  "인가요",
  "했나요",
  "하나요",
  "어떻게",
  "알려줘",
  "설명해줘",
  "정리해줘",
  "about",
  "what",
  "how",
  "why",
  "the",
  "and",
  "for",
  "with",
]);

const sectionPriority: Record<ContentSection, number> = {
  wiki: 8,
  about: 7,
  projects: 6,
  prompts: 5,
  "ai-stack": 4,
  logs: 2,
};

const aliases: Record<string, string[]> = {
  조정민: ["about", "career", "skills", "개발자", "백엔드"],
  개발자: ["조정민", "backend", "java", "spring"],
  경력: ["career", "oris", "프로젝트"],
  프로젝트: ["projects", "portfolio", "trading", "oris"],
  ai: ["llm", "chatgpt", "codex", "claude", "vibe"],
  "AI": ["llm", "chatgpt", "codex", "claude", "vibe"],
  llm: ["wiki", "LLM", "지식", "위키"],
  wiki: ["llm", "위키", "knowledge"],
  위키: ["wiki", "llm", "지식"],
  rag: ["llm", "wiki", "검색"],
  oris: ["ORIS", "해외송금", "한국은행"],
  자동매매: ["trading", "bot", "전략", "거래"],
  프롬프트: ["prompt", "prompts", "library"],
  코덱스: ["codex"],
};

const normalize = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, " ");

const unique = (values: string[]) => Array.from(new Set(values));

export const tokenizeQuery = (query: string) => {
  const normalized = normalize(query);
  const baseTerms = normalized
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length >= 2)
    .filter((term) => !stopWords.has(term));

  const expandedTerms = baseTerms.flatMap((term) => [term, ...(aliases[term] ?? [])]);

  return unique(expandedTerms.map((term) => normalize(term).trim()).filter(Boolean));
};

const countMatches = (text: string, terms: string[]) => {
  const normalized = normalize(text);

  return terms.reduce((count, term) => {
    if (!term) {
      return count;
    }

    return normalized.includes(term) ? count + 1 : count;
  }, 0);
};

const getMatchedTerms = (entry: ContentEntry, terms: string[]) => {
  const searchable = normalize(`${entry.title} ${entry.summary} ${entry.body}`);

  return terms.filter((term) => searchable.includes(term));
};

export const lookupWiki = (query: string, limit = 6): LookupResult[] => {
  const terms = tokenizeQuery(query);

  if (terms.length === 0) {
    return [];
  }

  return getAllEntries()
    .map((entry) => {
      const titleScore = countMatches(entry.title, terms) * 12;
      const summaryScore = countMatches(entry.summary, terms) * 6;
      const bodyScore = countMatches(entry.body, terms) * 2;
      const matchedTerms = getMatchedTerms(entry, terms);
      const score =
        titleScore +
        summaryScore +
        bodyScore +
        matchedTerms.length +
        (matchedTerms.length > 0 ? sectionPriority[entry.section] : 0);

      return {
        entry,
        href: getEntryHref(entry),
        score,
        matchedTerms,
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit);
};

