import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("ai-stack").map((entry) => ({ slug: entry.slug }));
}

export default async function AiStackDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!hasEntry("ai-stack", slug)) {
    notFound();
  }

  const entry = getEntry("ai-stack", slug);
  const entries = getEntries("ai-stack");

  return <DocumentPage entry={entry} entries={entries} eyebrow="AI Stack" section="ai-stack" />;
}
