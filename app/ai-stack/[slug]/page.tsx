import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/markdown-view";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("ai-stack").map((entry) => ({ slug: entry.slug }));
}

export default function AiStackDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("ai-stack", params.slug)) {
    notFound();
  }

  const entry = getEntry("ai-stack", params.slug);

  return (
    <main className="container document">
      <div className="document-header">
        <p className="eyebrow">AI Stack</p>
      </div>
      <MarkdownView body={entry.body} />
    </main>
  );
}

