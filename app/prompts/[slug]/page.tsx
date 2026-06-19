import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("prompts").map((entry) => ({ slug: entry.slug }));
}

export default function PromptDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("prompts", params.slug)) {
    notFound();
  }

  const entry = getEntry("prompts", params.slug);
  const entries = getEntries("prompts");

  return <DocumentPage entry={entry} entries={entries} eyebrow="Prompt Library" section="prompts" />;
}
