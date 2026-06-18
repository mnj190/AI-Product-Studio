import { MarkdownView } from "@/components/markdown-view";
import { getEntries } from "@/lib/content";

export default function AboutPage() {
  const entries = getEntries("about");

  return (
    <main className="container document">
      <div className="document-header">
        <p className="eyebrow">About</p>
        <h1>조정민에 대한 문서.</h1>
        <p>개인 소개, 경력, 기술 스택, 관심사를 하나의 위키처럼 정리합니다.</p>
      </div>
      {entries.map((entry) => (
        <article className="section" key={entry.slug}>
          <MarkdownView body={entry.body} />
        </article>
      ))}
    </main>
  );
}

