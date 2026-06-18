import { ContentCard } from "@/components/content-card";
import { getEntries } from "@/lib/content";

export default function AiStackPage() {
  const entries = getEntries("ai-stack");

  return (
    <main className="container">
      <div className="document-header">
        <p className="eyebrow">AI Stack</p>
        <h1>AI 도구를 역할별로 사용하기.</h1>
        <p>
          ChatGPT, Codex, Claude 같은 도구를 하나의 만능 도구로 보지 않고,
          작업 단계에 맞게 나누어 사용합니다.
        </p>
      </div>
      <div className="cards">
        {entries.map((entry) => (
          <ContentCard entry={entry} href={`/ai-stack/${entry.slug}`} key={entry.slug} />
        ))}
      </div>
    </main>
  );
}

