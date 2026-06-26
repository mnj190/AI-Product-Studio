import Link from "next/link";
import {
  askCostGates,
  askEvalSamples,
  askQualityRubric,
  deploymentGates,
  realModeReadinessChecklist,
} from "@/lib/ask-evaluation";

const categoryLabels = {
  answerable: "Answerable",
  unknown: "Unknown",
  blocked: "Blocked",
  feedback: "Feedback",
};

export default function AskEvalPage() {
  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">Ask Evaluation</p>
        <h1>real mode를 켜기 전 확인할 기준.</h1>
        <p>
          Ask About Me가 실제 LLM provider를 호출해도 되는지 판단하기 위한 품질,
          안전, 비용 기준입니다. 지금은 mock mode를 유지하면서 이 기준을 먼저
          통과하도록 샘플 질문을 관리합니다.
        </p>
        <div className="actions">
          <Link className="button primary" href="/ask">
            Ask로 돌아가기
          </Link>
          <Link className="button" href="/api/ask">
            API 상태 보기
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Quality Rubric</p>
            <h2>좋은 답변의 기준.</h2>
          </div>
        </div>
        <div className="policy-list">
          {askQualityRubric.map((item) => (
            <div className="policy-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Cost Gates</p>
            <h2>비용이 발생하기 전 막아야 할 것.</h2>
          </div>
        </div>
        <div className="checklist-grid">
          {askCostGates.map((gate, index) => (
            <div className="check-item" key={gate}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{gate}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Sample Set</p>
            <h2>real mode 전환 전 최소 샘플.</h2>
          </div>
        </div>
        <div className="eval-list">
          {askEvalSamples.map((sample) => (
            <article className="eval-card" key={sample.question}>
              <div className="result-meta">
                <span>{categoryLabels[sample.category]}</span>
                <span>{sample.expectedStatus}</span>
              </div>
              <h3>{sample.question}</h3>
              <div className="pill-row">
                <span className="pill">
                  provider {sample.shouldCallProvider ? "allowed" : "skipped"}
                </span>
                {sample.expectedSources.map((source) => (
                  <span className="pill" key={source}>
                    {source}
                  </span>
                ))}
              </div>
              <ul>
                {sample.passCriteria.map((criteria) => (
                  <li key={criteria}>{criteria}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card feature-card">
          <div>
            <p className="eyebrow">Readiness Checklist</p>
            <h2>이 항목이 모두 통과되기 전에는 mock mode를 유지합니다.</h2>
          </div>
          <div className="checklist-grid compact">
            {realModeReadinessChecklist.map((item) => (
              <div className="check-item" key={item}>
                <span>✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Deployment Gates</p>
            <h2>Preview URL이 생긴 뒤 따라갈 실행 순서.</h2>
          </div>
          <Link className="button" href="/wiki/vercel-preview-smoke-test-runbook">
            Smoke test runbook
          </Link>
        </div>
        <div className="deployment-gates">
          {deploymentGates.map((gate, index) => (
            <article className="deployment-gate" key={gate.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{gate.title}</h3>
                <p>{gate.body}</p>
                {gate.command ? <code>{gate.command}</code> : null}
                {gate.href ? (
                  <Link className="text-link" href={gate.href}>
                    관련 문서 보기
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
