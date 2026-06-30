import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("prompts").map((entry) => ({ slug: entry.slug }));
}

export default async function PromptDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!hasEntry("prompts", slug)) {
    notFound();
  }

  const entry = getEntry("prompts", slug);
  const entries = getEntries("prompts");

  return <DocumentPage entry={entry} entries={entries} eyebrow="Prompt Library" section="prompts" />;
}
