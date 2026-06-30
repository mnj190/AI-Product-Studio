import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("projects").map((entry) => ({ slug: entry.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!hasEntry("projects", slug)) {
    notFound();
  }

  const entry = getEntry("projects", slug);
  const entries = getEntries("projects");

  return <DocumentPage entry={entry} entries={entries} eyebrow="Project" section="projects" />;
}
