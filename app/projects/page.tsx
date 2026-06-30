import Link from "next/link";
import { getEntries } from "@/lib/content";

type ProjectResource = {
  label: string;
  href: string;
};

const projectResources: Record<string, ProjectResource[]> = {
  "ask-about-me-chatbot": [
    { label: "Ask eval", href: "/ask/eval" },
    { label: "Answer policy", href: "/wiki/ask-real-mode-evaluation" },
    { label: "Build log", href: "/logs/2026-06-18-ask-about-me-mock-page" },
  ],
  "llm-wiki": [
    { label: "Wiki index", href: "/wiki/index" },
    { label: "Ingest flow", href: "/wiki/llm-wiki-pattern" },
    { label: "Build log", href: "/logs/2026-06-18-llm-wiki-direction-change" },
  ],
  "portfolio-site": [
    { label: "Home", href: "/" },
    { label: "Prompt", href: "/prompts/project-planning" },
    { label: "Build log", href: "/logs/2026-06-18-static-portfolio-mvp" },
  ],
  "webgpu-game": [
    { label: "WebGPU wiki", href: "/wiki/webgpu" },
    { label: "Prompt", href: "/prompts/project-planning" },
    { label: "Roadmap", href: "/projects/webgpu-game" },
  ],
};

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
        {entries.map((entry) => {
          const resources = projectResources[entry.slug] ?? [];

          return (
            <article className="card project-card" key={entry.slug}>
              <div>
                <p className="meta">{entry.section}</p>
                <h3>
                  <Link href={`/projects/${entry.slug}`}>{entry.title}</Link>
                </h3>
                <p>{entry.summary}</p>
              </div>
              <div className="project-card-footer">
                <Link className="meta" href={`/projects/${entry.slug}`}>
                  Read document →
                </Link>
                {resources.length > 0 ? (
                  <div className="resource-links" aria-label={`${entry.title} related resources`}>
                    {resources.map((resource) => (
                      <Link href={resource.href} key={resource.href}>
                        {resource.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
