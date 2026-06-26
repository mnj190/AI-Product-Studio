import fs from "node:fs";
import path from "node:path";

export type ContentSection =
  | "about"
  | "projects"
  | "prompts"
  | "logs"
  | "ai-stack"
  | "wiki";

export type ContentEntry = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  section: ContentSection;
};

const contentRoot = path.join(process.cwd(), "content");

const sectionPath = (section: ContentSection) => path.join(contentRoot, section);

const filePath = (section: ContentSection, slug: string) =>
  path.join(sectionPath(section), `${slug}.md`);

const titleFromBody = (body: string, slug: string) => {
  const titleLine = body
    .split("\n")
    .find((line) => line.startsWith("# "));

  return titleLine?.replace(/^#\s+/, "").trim() || slug;
};

const summaryFromBody = (body: string) => {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"))
    .filter((line) => !line.startsWith("- "))
    .filter((line) => !line.startsWith(">"));

  return lines[0] || "아직 요약이 작성되지 않았습니다.";
};

export const getEntries = (section: ContentSection): ContentEntry[] => {
  const dir = sectionPath(section);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      return getEntry(section, slug);
    });
};

export const getLatestEntries = (
  section: ContentSection,
  limit?: number,
): ContentEntry[] => {
  const entries = [...getEntries(section)].reverse();

  return typeof limit === "number" ? entries.slice(0, limit) : entries;
};

export const getEntriesBySlugs = (
  section: ContentSection,
  slugs: string[],
): ContentEntry[] =>
  slugs
    .filter((slug) => hasEntry(section, slug))
    .map((slug) => getEntry(section, slug));

export const getEntry = (section: ContentSection, slug: string): ContentEntry => {
  const body = fs.readFileSync(filePath(section, slug), "utf8");

  return {
    slug,
    title: titleFromBody(body, slug),
    summary: summaryFromBody(body),
    body,
    section,
  };
};

export const hasEntry = (section: ContentSection, slug: string) =>
  fs.existsSync(filePath(section, slug));

export const contentSections: ContentSection[] = [
  "wiki",
  "about",
  "projects",
  "prompts",
  "ai-stack",
  "logs",
];

export const getAllEntries = () =>
  contentSections.flatMap((section) => getEntries(section));

export const getEntryHref = (entry: Pick<ContentEntry, "section" | "slug">) => {
  if (entry.section === "about") {
    return "/about";
  }

  return `/${entry.section}/${entry.slug}`;
};
