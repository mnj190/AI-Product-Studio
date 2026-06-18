import Link from "next/link";
import { createDraftAnswer } from "@/lib/answer-draft";
import { createFeedbackCandidate } from "@/lib/feedback-candidate";
import { lookupWiki, tokenizeQuery } from "@/lib/wiki-lookup";

const questions = [
  {
    question: "조정민은 어떤 개발자인가요?",
    answer:
      "Java 백엔드 개발자로, 금융 서비스와 외부 API 연동 경험을 기반으로 AI 활용 개발을 실험하고 있습니다.",
    sources: [
      ["about-me.md", "/about"],
      ["career.md", "/about"],
      ["skills.md", "/about"],
    ],
  },
  {
    question: "AI를 어떻게 활용하나요?",
    answer:
      "ChatGPT는 기획과 구조화, Codex는 구현과 검증, Claude는 긴 문서와 리뷰에 활용하는 식으로 도구별 역할을 나눕니다.",
    sources: [
      ["interests.md", "/about"],
      ["chatgpt.md", "/ai-stack/chatgpt"],
      ["codex.md", "/ai-stack/codex"],
    ],
  },
  {
    question: "ORIS 프로젝트는 무엇인가요?",
    answer:
      "한국은행 ORIS 연동 프로젝트로, 해외송금 보고와 취소 보고 기능을 구축한 경험입니다.",
    sources: [["career.md", "/about"]],
  },
  {
    question: "LLM Wiki는 무엇인가요?",
    answer:
      "자료를 질문 시점마다 새로 검색하는 대신, LLM이 지속적으로 유지보수하는 Markdown Wiki를 중심 지식 계층으로 두는 방식입니다.",
    sources: [
      ["llm-wiki-pattern.md", "/wiki/llm-wiki-pattern"],
      ["index.md", "/wiki/index"],
      ["log.md", "/wiki/log"],
    ],
  },
  {
    question: "자동매매봇은 어떻게 만들었나요?",
    answer:
      "투자 권유가 아니라 개발 실험으로 다루며, API 연동, 전략 테스트, 거래 기록, 운영 로그를 중심으로 정리합니다.",
    sources: [["trading-bot.md", "/projects/trading-bot"]],
  },
  {
    question: "좋은 프롬프트는 어떻게 저장하나요?",
    answer:
      "모든 대화를 저장하지 않고, 3개월 뒤에도 유용하고 실제 결과에 영향을 준 프롬프트만 Prompt Library에 남깁니다.",
    sources: [
      ["project-planning.md", "/prompts/project-planning"],
      ["documentation.md", "/prompts/documentation"],
      ["code-review.md", "/prompts/code-review"],
    ],
  },
];

const policies = [
  ["Wiki First", "먼저 LLM Wiki index와 관련 문서를 읽습니다."],
  ["No Guessing", "문서에 없는 내용은 추측하지 않습니다."],
  ["Sources", "답변에 사용한 문서를 함께 보여줍니다."],
  ["Safety", "민감 정보와 투자 권유성 답변은 차단합니다."],
];

export default function AskPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q?.trim() ?? "";
  const results = query ? lookupWiki(query, 6) : [];
  const terms = query ? tokenizeQuery(query).slice(0, 10) : [];
  const draft = query ? createDraftAnswer(query, results) : null;
  const feedback = query ? createFeedbackCandidate(query, draft) : null;

  return (
    <main className="container">
      <section className="hero">
        <p className="eyebrow">Ask About Me</p>
        <h1>조정민에 대해 질문해보세요.</h1>
        <p>
          현재는 실제 LLM API를 붙이기 전 단계입니다. 먼저 LLM Wiki 기반으로 어떤
          질문에 어떤 문서를 근거로 답할지 보여주는 mock 인터페이스를 만들었습니다.
        </p>
        <div className="actions">
          <Link className="button primary" href="/wiki/index">
            Wiki Index 보기
          </Link>
          <Link className="button" href="/projects/ask-about-me-chatbot">
            프로젝트 문서 보기
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="lookup-panel">
          <div>
            <p className="eyebrow">Local Wiki Lookup</p>
            <h2>질문을 입력하면 관련 문서를 먼저 찾습니다.</h2>
            <p>
              아직 답변을 생성하지는 않습니다. 대신 LLM Wiki와 공개 Markdown 문서 중
              어떤 자료를 근거로 삼을 수 있는지 보여줍니다.
            </p>
          </div>
          <form className="ask-form" action="/ask">
            <input
              aria-label="질문"
              defaultValue={query}
              name="q"
              placeholder="예: AI를 어떻게 활용하나요?"
              type="search"
            />
            <button className="button primary" type="submit">
              문서 찾기
            </button>
          </form>
          {query ? (
            <div className="lookup-results">
              <div className="lookup-summary">
                <span>검색어</span>
                <strong>{query}</strong>
                {terms.length > 0 ? (
                  <div className="pill-row">
                    {terms.map((term) => (
                      <span className="pill" key={term}>
                        {term}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              {draft ? (
                <div className={`draft-answer ${draft.status}`}>
                  <div className="result-meta">
                    <span>Draft Answer</span>
                    <span>{draft.status}</span>
                  </div>
                  <h3>문서 기반 답변 초안</h3>
                  <p>{draft.answer}</p>
                  {draft.warnings.length > 0 ? (
                    <div className="warning-list">
                      {draft.warnings.map((warning) => (
                        <span key={warning}>{warning}</span>
                      ))}
                    </div>
                  ) : null}
                  {draft.sources.length > 0 ? (
                    <div className="draft-sources">
                      <h3>LLM에 전달할 source context 후보</h3>
                      {draft.sources.map((source) => (
                        <Link className="source-excerpt" href={source.href} key={`${source.section}-${source.title}`}>
                          <div className="result-meta">
                            <span>{source.section}</span>
                            <span>{source.title}</span>
                          </div>
                          <p>{source.excerpt || source.summary}</p>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {feedback ? (
                <div className={`feedback-card ${feedback.safety}`}>
                  <div className="result-meta">
                    <span>Wiki Feedback Candidate</span>
                    <span>{feedback.action}</span>
                  </div>
                  <h3>이 질문을 Wiki에 반영할까요?</h3>
                  <p>{feedback.reason}</p>
                  {feedback.targetPath ? (
                    <div className="target-path">
                      <span>추천 target</span>
                      <code>{feedback.targetPath}</code>
                    </div>
                  ) : null}
                  <p>{feedback.nextStep}</p>
                  {feedback.sourceHrefs.length > 0 ? (
                    <div className="source-list">
                      <span>연결된 source</span>
                      {feedback.sourceHrefs.slice(0, 5).map((href) => (
                        <Link href={href} key={href}>
                          {href} →
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              {results.length > 0 ? (
                <div className="result-list">
                  {results.map((result) => (
                    <Link className="result-card" href={result.href} key={`${result.entry.section}-${result.entry.slug}`}>
                      <div>
                        <div className="result-meta">
                          <span>{result.entry.section}</span>
                          <span>score {result.score}</span>
                        </div>
                        <h3>{result.entry.title}</h3>
                        <p>{result.entry.summary}</p>
                      </div>
                      {result.matchedTerms.length > 0 ? (
                        <div className="pill-row">
                          {result.matchedTerms.slice(0, 6).map((term) => (
                            <span className="pill" key={`${result.entry.slug}-${term}`}>
                              {term}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="empty">
                  현재 LLM Wiki에는 해당 질문과 강하게 연결되는 문서가 충분히 정리되어 있지 않습니다.
                </div>
              )}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Answer Policy</p>
            <h2>답변은 Wiki를 기준으로 합니다.</h2>
          </div>
        </div>
        <div className="policy-list">
          {policies.map(([title, body]) => (
            <div className="policy-item" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Example Questions</p>
            <h2>이런 질문에 답할 수 있게 만들고 있습니다.</h2>
          </div>
        </div>
        <div className="question-grid">
          {questions.map((item) => (
            <article className="question-card" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
              <div className="source-list">
                <span>참고 문서</span>
                {item.sources.map(([label, href]) => (
                  <Link href={href} key={`${item.question}-${href}`}>
                    {label} →
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="card feature-card">
          <div>
            <p className="eyebrow">Next Step</p>
            <h2>다음은 실제 질문 입력과 Wiki lookup입니다.</h2>
            <p>
              다음 구현 단계에서는 사용자가 질문을 입력하면 LLM Wiki index와 관련
              문서를 찾아 보여주는 로컬 lookup을 먼저 만들고, 그 다음 LLM API를
              연결합니다.
            </p>
          </div>
          <div className="pill-row">
            <span className="pill">Local Wiki Lookup</span>
            <span className="pill">Answer API</span>
            <span className="pill">Wiki Feedback Loop</span>
          </div>
        </div>
      </section>
    </main>
  );
}
