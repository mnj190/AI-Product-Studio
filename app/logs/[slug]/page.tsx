import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("logs").map((entry) => ({ slug: entry.slug }));
}

export default function LogDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("logs", params.slug)) {
    notFound();
  }

  const entry = getEntry("logs", params.slug);
  const entries = getEntries("logs");

  return <DocumentPage entry={entry} entries={entries} eyebrow="Build Log" section="logs" />;
}
