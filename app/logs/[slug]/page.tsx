import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/markdown-view";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("logs").map((entry) => ({ slug: entry.slug }));
}

export default function LogDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("logs", params.slug)) {
    notFound();
  }

  const entry = getEntry("logs", params.slug);

  return (
    <main className="container document">
      <div className="document-header">
        <p className="eyebrow">Build Log</p>
      </div>
      <MarkdownView body={entry.body} />
    </main>
  );
}

