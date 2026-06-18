import { ContentCard } from "@/components/content-card";
import { getEntries } from "@/lib/content";

export default function LogsPage() {
  const entries = getEntries("logs").reverse();

  return (
    <main className="container">
      <div className="document-header">
        <p className="eyebrow">Build Log</p>
        <h1>AI와 함께 만든 기록.</h1>
        <p>작업 과정, 의사결정, 문제, 다음 단계를 날짜별로 남깁니다.</p>
      </div>
      <div className="cards">
        {entries.map((entry) => (
          <ContentCard entry={entry} href={`/logs/${entry.slug}`} key={entry.slug} />
        ))}
      </div>
    </main>
  );
}

