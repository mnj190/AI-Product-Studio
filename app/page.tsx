import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { getEntries, getEntriesBySlugs, getLatestEntries } from "@/lib/content";

export default function HomePage() {
  const projects = getEntriesBySlugs("projects", [
    "portfolio-site",
    "ask-about-me-chatbot",
    "llm-wiki",
  ]);
  const prompts = getEntriesBySlugs("prompts", [
    "project-planning",
    "daily-work-log",
    "code-review",
  ]);
  const logs = getLatestEntries("logs", 3);
  const wikiCount = getEntries("wiki").length;
  const projectCount = getEntries("projects").length;
  const logCount = getEntries("logs").length;

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">Vibe Coding Lab</p>
        <h1>AI와 함께 기획하고 구현하는 포트폴리오.</h1>
        <p>
          조정민의 경력, 프로젝트, 프롬프트, 개발 로그를 Markdown 지식 베이스로
          쌓고, LLM Wiki를 기반으로 질문에 답하는 AI 포트폴리오입니다.
        </p>
        <div className="actions">
          <Link className="button primary" href="/projects">
            프로젝트 보기
          </Link>
          <Link className="button" href="/ask">
            질문해보기
          </Link>
          <Link className="button" href="/about">
            조정민 알아보기
          </Link>
        </div>
        <div className="status-strip">
          <div>
            <span>{wikiCount}</span>
            <p>Wiki docs</p>
          </div>
          <div>
            <span>{projectCount}</span>
            <p>Projects</p>
          </div>
          <div>
            <span>{logCount}</span>
            <p>Build logs</p>
          </div>
          <div>
            <span>mock</span>
            <p>Ask API mode</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Current Operating Mode</p>
            <h2>Production은 안전하게, Preview는 검수 가능하게.</h2>
          </div>
          <div className="actions">
            <Link className="button" href="/wiki/vercel-connection-decision-brief">
              Vercel 선택지 보기
            </Link>
            <Link className="button" href="/ask/eval">
              Deployment Gates 보기
            </Link>
          </div>
        </div>
        <div className="cards">
          {[
            [
              "Production",
              "mock mode",
              "공개 포트폴리오는 외부 LLM provider를 호출하지 않는 안전한 상태를 유지합니다.",
            ],
            [
              "Preview",
              "gated real mode",
              "Vercel Preview URL이 생기면 readiness check와 safe smoke test를 먼저 통과해야 합니다.",
            ],
            [
              "Verification",
              "script-ready",
              "`check:preview-env`와 `check:ask-url`로 secret 노출 없이 준비 상태를 확인합니다.",
            ],
          ].map(([title, label, body]) => (
            <div className="card" key={title}>
              <div>
                <div className="result-meta">
                  <span>{title}</span>
                  <span>{label}</span>
                </div>
                <h3>{body}</h3>
              </div>
            </div>
          ))}
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
            ["Ask About Me", "방문자가 궁금한 내용을 Wiki 기반으로 질문하도록 확장합니다."],
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
            <p className="eyebrow">Ask About Me</p>
            <h2>질문에서 시작하는 포트폴리오.</h2>
          </div>
          <Link className="button" href="/ask">
            Ask 보기
          </Link>
        </div>
        <div className="card feature-card">
          <div>
            <h3>질문 → 문서 검색 → 답변 초안 → Wiki 반영 후보까지 연결했습니다.</h3>
            <p>
              실제 LLM API를 붙이기 전, Local Wiki Lookup과 deterministic draft answer로
              안전한 질문형 포트폴리오 흐름을 먼저 만들었습니다.
            </p>
          </div>
          <div className="pill-row">
            <span className="pill">Local lookup</span>
            <span className="pill">Draft answer</span>
            <span className="pill">Feedback candidate</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">How It Works</p>
            <h2>Wiki가 답변으로 바뀌는 흐름.</h2>
          </div>
        </div>
        <div className="timeline-grid">
          {[
            ["01", "Raw Source", "대화, 메모, 참고 자료를 원본으로 보관합니다."],
            ["02", "LLM Wiki", "LLM이 읽기 좋은 Markdown Wiki로 정리합니다."],
            ["03", "Ask Lookup", "질문이 들어오면 관련 문서를 먼저 찾습니다."],
            ["04", "Feedback Loop", "좋은 질문은 다시 Wiki 업데이트 후보가 됩니다."],
          ].map(([step, title, body]) => (
            <div className="timeline-item" key={step}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{body}</p>
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
            <h2>가장 최근에 AI와 함께 만든 기록.</h2>
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
