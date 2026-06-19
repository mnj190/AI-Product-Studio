import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { getEntries, getEntry, hasEntry } from "@/lib/content";

export function generateStaticParams() {
  return getEntries("projects").map((entry) => ({ slug: entry.slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  if (!hasEntry("projects", params.slug)) {
    notFound();
  }

  const entry = getEntry("projects", params.slug);
  const entries = getEntries("projects");

  return <DocumentPage entry={entry} entries={entries} eyebrow="Project" section="projects" />;
}
