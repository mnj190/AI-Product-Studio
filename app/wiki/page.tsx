import { ContentCard } from "@/components/content-card";
import { getEntries } from "@/lib/content";

export default function WikiPage() {
  const entries = getEntries("wiki");

  return (
    <main className="container">
      <div className="document-header">
        <p className="eyebrow">Wiki</p>
        <h1>AI 실험과 개념 노트.</h1>
        <p>LLM Wiki, Vibe Coding, Agent, MCP 같은 관심 주제를 정리합니다.</p>
      </div>
      {entries.length > 0 ? (
        <div className="cards">
          {entries.map((entry) => (
            <ContentCard entry={entry} href={`/wiki/${entry.slug}`} key={entry.slug} />
          ))}
        </div>
      ) : (
        <div className="empty">아직 Wiki 문서가 없습니다.</div>
      )}
    </main>
  );
}
