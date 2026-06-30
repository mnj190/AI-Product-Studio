import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("logs").map((entry) => ({ slug: entry.slug }));
}

export default async function LogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!hasEntry("logs", slug)) {
    notFound();
  }

  const entry = getEntry("logs", slug);
  const entries = getEntries("logs");

  return <DocumentPage entry={entry} entries={entries} eyebrow="Build Log" section="logs" />;
}
