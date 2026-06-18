import { notFound } from "next/navigation";
import { MarkdownView } from "@/components/markdown-view";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("projects").map((entry) => ({ slug: entry.slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("projects", params.slug)) {
    notFound();
  }

  const entry = getEntry("projects", params.slug);

  return (
    <main className="container document">
      <div className="document-header">
        <p className="eyebrow">Project</p>
      </div>
      <MarkdownView body={entry.body} />
    </main>
  );
}

