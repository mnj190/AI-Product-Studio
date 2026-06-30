import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("wiki").map((entry) => ({ slug: entry.slug }));
}

export default async function WikiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!hasEntry("wiki", slug)) {
    notFound();
  }

  const entry = getEntry("wiki", slug);
  const entries = getEntries("wiki");

  return <DocumentPage entry={entry} entries={entries} eyebrow="Wiki" section="wiki" />;
}
