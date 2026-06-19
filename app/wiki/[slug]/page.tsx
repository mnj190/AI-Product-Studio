import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("wiki").map((entry) => ({ slug: entry.slug }));
}

export default function WikiDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("wiki", params.slug)) {
    notFound();
  }

  const entry = getEntry("wiki", params.slug);
  const entries = getEntries("wiki");

  return <DocumentPage entry={entry} entries={entries} eyebrow="Wiki" section="wiki" />;
}
