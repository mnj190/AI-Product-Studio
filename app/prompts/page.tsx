import { ContentCard } from "@/components/content-card";
import { getEntries } from "@/lib/content";

export default function PromptsPage() {
  const entries = getEntries("prompts");

  return (
    <main className="container">
      <div className="document-header">
        <p className="eyebrow">Prompt Library</p>
        <h1>결과에 영향을 준 프롬프트.</h1>
        <p>
          모든 대화를 저장하지 않고, 3개월 뒤에도 다시 쓸 수 있는 프롬프트만
          선별합니다.
        </p>
      </div>
      <div className="cards">
        {entries.map((entry) => (
          <ContentCard entry={entry} href={`/prompts/${entry.slug}`} key={entry.slug} />
        ))}
      </div>
    </main>
  );
}

