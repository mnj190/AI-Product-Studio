import Link from "next/link";
import { MarkdownView } from "@/components/markdown-view";
import type { ContentEntry, ContentSection } from "@/lib/content";

type DocumentPageProps = {
  entry: ContentEntry;
  entries: ContentEntry[];
  eyebrow: string;
  section: ContentSection;
};

const sectionLabels: Record<ContentSection, string> = {
  about: "About",
  projects: "Projects",
  prompts: "Prompt Library",
  logs: "Build Log",
  "ai-stack": "AI Stack",
  wiki: "LLM Wiki",
};

const sectionHref: Record<ContentSection, string> = {
  about: "/about",
  projects: "/projects",
  prompts: "/prompts",
  logs: "/logs",
  "ai-stack": "/ai-stack",
  wiki: "/wiki",
};

const stripFirstHeading = (body: string) => body.replace(/^# .*(\r?\n)+/, "").trim();

export function DocumentPage({ entry, entries, eyebrow, section }: DocumentPageProps) {
  const currentIndex = entries.findIndex((item) => item.slug === entry.slug);
  const previousEntry = currentIndex > 0 ? entries[currentIndex - 1] : null;
  const nextEntry = currentIndex >= 0 && currentIndex < entries.length - 1 ? entries[currentIndex + 1] : null;
  const body = stripFirstHeading(entry.body);

  return (
    <main className="container document">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href={sectionHref[section]}>{sectionLabels[section]}</Link>
      </nav>

      <header className="document-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{entry.title}</h1>
        <p>{entry.summary}</p>
        <div className="document-meta">
          <span>{sectionLabels[section]}</span>
          <span>{entry.slug}</span>
        </div>
      </header>

      <div className="document-surface">
        <MarkdownView body={body || entry.body} />
      </div>

      <nav className="document-nav" aria-label="Related documents">
        {previousEntry ? (
          <Link href={`${sectionHref[section]}/${previousEntry.slug}`}>
            <span>Previous</span>
            {previousEntry.title}
          </Link>
        ) : (
          <Link href={sectionHref[section]}>
            <span>Back to</span>
            {sectionLabels[section]}
          </Link>
        )}

        {nextEntry ? (
          <Link href={`${sectionHref[section]}/${nextEntry.slug}`}>
            <span>Next</span>
            {nextEntry.title}
          </Link>
        ) : (
          <Link href={sectionHref[section]}>
            <span>View all</span>
            {sectionLabels[section]}
          </Link>
        )}
      </nav>
    </main>
  );
}
