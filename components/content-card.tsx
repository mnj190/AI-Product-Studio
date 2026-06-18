import Link from "next/link";
import type { ContentEntry } from "@/lib/content";

export function ContentCard({
  entry,
  href,
}: {
  entry: ContentEntry;
  href: string;
}) {
  return (
    <Link className="card" href={href}>
      <div>
        <p className="meta">{entry.section}</p>
        <h3>{entry.title}</h3>
        <p>{entry.summary}</p>
      </div>
      <span className="meta">Read document →</span>
    </Link>
  );
}

