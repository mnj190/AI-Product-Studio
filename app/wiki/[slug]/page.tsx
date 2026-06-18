import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/markdown-view";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("wiki").map((entry) => ({ slug: entry.slug }));
}

export default function WikiDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("wiki", params.slug)) {
    notFound();
  }

  const entry = getEntry("wiki", params.slug);

  return (
    <main className="container document">
      <div className="document-header">
        <p className="eyebrow">Wiki</p>
      </div>
      <MarkdownView body={entry.body} />
    </main>
  );
}

