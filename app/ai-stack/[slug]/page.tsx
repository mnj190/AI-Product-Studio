import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("ai-stack").map((entry) => ({ slug: entry.slug }));
}

export default function AiStackDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("ai-stack", params.slug)) {
    notFound();
  }

  const entry = getEntry("ai-stack", params.slug);
  const entries = getEntries("ai-stack");

  return <DocumentPage entry={entry} entries={entries} eyebrow="AI Stack" section="ai-stack" />;
}
