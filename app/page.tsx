import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { getEntries } from "@/lib/content";

export default function HomePage() {
  const projects = getEntries("projects").slice(0, 3);
  const prompts = getEntries("prompts").slice(0, 3);
  const logs = getEntries("logs").slice(0, 2);

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">Vibe Coding Lab</p>
        <h1>AI와 함께 기획하고 구현하는 포트폴리오.</h1>
        <p>
          조정민의 경력, 프로젝트, 프롬프트, 개발 로그를 Markdown 지식 베이스로
          쌓고, 이후 챗봇이 이 문서를 기반으로 답변하도록 만드는 AI 포트폴리오입니다.
        </p>
        <div className="actions">
          <Link className="button primary" href="/projects">
            프로젝트 보기
          </Link>
          <Link className="button" href="/about">
            조정민 알아보기
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Core Concept</p>
            <h2>읽는 포트폴리오에서 질문하는 포트폴리오로.</h2>
          </div>
        </div>
        <div className="cards">
          {[
            ["LLM Wiki", "개인 소개, 경력, 프로젝트, 로그를 문서로 축적합니다."],
            ["Ask About Me", "방문자가 궁금한 내용을 챗봇에게 질문하도록 확장합니다."],
            ["Build Log", "결과뿐 아니라 AI와 함께 만든 과정을 기록합니다."],
          ].map(([title, summary]) => (
            <div className="card" key={title}>
              <div>
                <h3>{title}</h3>
                <p>{summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Projects</p>
            <h2>현재 쌓고 있는 프로젝트.</h2>
          </div>
          <Link className="button" href="/projects">
            전체 보기
          </Link>
        </div>
        <div className="cards">
          {projects.map((entry) => (
            <ContentCard entry={entry} href={`/projects/${entry.slug}`} key={entry.slug} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Prompt Library</p>
            <h2>재사용 가능한 프롬프트.</h2>
          </div>
          <Link className="button" href="/prompts">
            프롬프트 보기
          </Link>
        </div>
        <div className="cards">
          {prompts.map((entry) => (
            <ContentCard entry={entry} href={`/prompts/${entry.slug}`} key={entry.slug} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Build Log</p>
            <h2>AI와 함께 만든 기록.</h2>
          </div>
          <Link className="button" href="/logs">
            로그 보기
          </Link>
        </div>
        <div className="cards">
          {logs.map((entry) => (
            <ContentCard entry={entry} href={`/logs/${entry.slug}`} key={entry.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
