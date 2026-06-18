import { ContentCard } from "@/components/content-card";
import { getEntries } from "@/lib/content";

export default function ProjectsPage() {
  const entries = getEntries("projects");

  return (
    <main className="container">
      <div className="document-header">
        <p className="eyebrow">Projects</p>
        <h1>프로젝트 아카이브.</h1>
        <p>AI 활용 방식, 개발 과정, 결과를 프로젝트별 문서로 쌓습니다.</p>
      </div>
      <div className="cards">
        {entries.map((entry) => (
          <ContentCard entry={entry} href={`/projects/${entry.slug}`} key={entry.slug} />
        ))}
      </div>
    </main>
  );
}

