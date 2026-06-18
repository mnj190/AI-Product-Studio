import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/markdown-view";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("prompts").map((entry) => ({ slug: entry.slug }));
}

export default function PromptDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("prompts", params.slug)) {
    notFound();
  }

  const entry = getEntry("prompts", params.slug);

  return (
    <main className="container document">
      <div className="document-header">
        <p className="eyebrow">Prompt Library</p>
      </div>
      <MarkdownView body={entry.body} />
    </main>
  );
}

