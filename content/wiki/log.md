# Wiki Log

## Summary

이 문서는 LLM Wiki의 시간순 변경 기록이다.

새 자료 ingest, Wiki 문서 수정, 구조 변경, lint 결과를 append-only 방식으로 기록한다.

## [2026-06-18] schema | LLM Wiki 방향 전환

- Source: Karpathy `llm-wiki` gist
- Reference: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Updated:
  - `knowledge/LLM_WIKI_SCHEMA.md`
  - `knowledge/LLM_WIKI_ARCHITECTURE.md`
  - `content/wiki/llm-wiki-pattern.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - RAG 인프라를 먼저 만드는 계획에서 LLM Wiki를 먼저 구축하는 계획으로 변경했다.
  - Vector DB와 embedding은 필수가 아니라, Wiki 규모가 커진 뒤 선택적으로 붙이는 보조 도구로 둔다.

## [2026-06-18] workflow | Raw Source and Maintenance Rules

- Source: 현재 프로젝트 작업 흐름
- Created:
  - `raw/README.md`
  - `raw/conversations/README.md`
  - `raw/articles/README.md`
  - `raw/notes/README.md`
  - `raw/assets/README.md`
  - `knowledge/RAW_SOURCE_POLICY.md`
  - `knowledge/LLM_WIKI_INGEST_WORKFLOW.md`
  - `knowledge/LLM_WIKI_LINT_CHECKLIST.md`
- Updated:
  - `knowledge/LLM_WIKI_SCHEMA.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - raw source 보존 규칙, Wiki ingest 절차, Wiki lint 체크리스트를 추가했다.
  - 다음 단계는 Ask About Me 답변 기준과 질문형 인터페이스 설계이다.

## [2026-06-18] interface | Ask About Me Mock Page

- Source: 현재 프로젝트 작업 흐름
- Created:
  - `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`
  - `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`
  - `app/ask/page.tsx`
- Updated:
  - `app/layout.tsx`
  - `app/page.tsx`
  - `app/globals.css`
  - `content/projects/ask-about-me-chatbot.md`
  - `content/wiki/index.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `knowledge/ROADMAP.md`
- Notes:
  - 실제 LLM API를 붙이기 전, 예시 질문과 참고 문서를 보여주는 `/ask` mock 페이지를 만들었다.
  - 답변은 Wiki first, no guessing, source shown, safety 원칙을 따른다.
  - 다음 단계는 Local Wiki Lookup이다.

## [2026-06-18] interface | Local Wiki Lookup

- Source: 현재 프로젝트 작업 흐름
- Created:
  - `knowledge/LOCAL_WIKI_LOOKUP_DESIGN.md`
  - `lib/wiki-lookup.ts`
- Updated:
  - `lib/content.ts`
  - `app/ask/page.tsx`
  - `app/globals.css`
  - `knowledge/NEXT_ACTIONS.md`
  - `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`
  - `content/projects/ask-about-me-chatbot.md`
- Notes:
  - `/ask?q=...` query string 기반 Local Wiki Lookup을 구현했다.
  - 답변 생성 없이 관련 문서 후보, 점수, 매칭된 term을 보여준다.
  - 다음 단계는 LLM Answer API 설계이다.

## [2026-06-18] interface | Draft Answer Guard

- Source: 현재 프로젝트 작업 흐름
- Created:
  - `knowledge/LLM_ANSWER_API_DESIGN.md`
  - `lib/answer-draft.ts`
- Updated:
  - `app/ask/page.tsx`
  - `app/globals.css`
  - `knowledge/NEXT_ACTIONS.md`
  - `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`
  - `content/projects/ask-about-me-chatbot.md`
- Notes:
  - 외부 LLM API 호출 전 단계로 deterministic draft answer를 구현했다.
  - 민감 정보 요청과 투자 권유성 질문을 guard한다.
  - `/ask` 페이지에서 LLM에 전달할 source context 후보를 보여준다.
  - 다음 단계는 질문/답변을 Wiki에 반영하는 feedback loop 설계이다.

## [2026-06-18] interface | Ask Feedback Loop

- Source: 현재 프로젝트 작업 흐름
- Created:
  - `knowledge/ASK_FEEDBACK_LOOP_DESIGN.md`
  - `lib/feedback-candidate.ts`
- Updated:
  - `app/ask/page.tsx`
  - `app/globals.css`
  - `knowledge/NEXT_ACTIONS.md`
  - `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`
  - `content/projects/ask-about-me-chatbot.md`
- Notes:
  - 질문과 draft answer를 보고 Wiki 반영 후보를 생성한다.
  - 추천 action, target path, next step을 `/ask` 페이지에 표시한다.
  - 자동 저장은 하지 않는다. 사용자가 가치 있다고 판단하면 ingest workflow로 수동 반영한다.
  - 다음 단계는 실제 LLM API 연동 여부와 보안 정책 결정이다.

## [2026-06-18] api | Mock Ask API Route

- Source: 현재 프로젝트 작업 흐름
- Created:
  - `knowledge/LLM_API_SECURITY_POLICY.md`
  - `app/api/ask/route.ts`
  - `.env.example`
- Updated:
  - `knowledge/LLM_ANSWER_API_DESIGN.md`
  - `app/ask/page.tsx`
  - `README.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/projects/ask-about-me-chatbot.md`
- Notes:
  - 실제 외부 LLM API 연동은 보류하고 mock mode를 유지한다.
  - `/api/ask`는 Local Wiki Lookup, draft answer, feedback candidate를 JSON으로 반환한다.
  - 다음 단계는 real provider adapter와 rate limit 정책 설계 여부를 결정하는 것이다.

## [2026-06-18] content | Core Wiki Expansion

- Source: 현재 프로젝트 Roadmap과 누락 문서 점검
- Created:
  - `content/projects/webgpu-game.md`
  - `content/wiki/mcp.md`
  - `content/wiki/ai-agent.md`
  - `content/wiki/context-engineering.md`
  - `content/wiki/webgpu.md`
- Updated:
  - `content/wiki/index.md`
  - `knowledge/NEXT_ACTIONS.md`
- Notes:
  - Ask About Me lookup 품질을 높이기 위해 자주 언급되지만 비어 있던 핵심 개념 문서를 추가했다.
  - WebGPU Game은 장기 목표 프로젝트로 문서화했다.

## [2026-06-18] ui | Home and Ask Flow Polish

- Source: 현재 프로젝트 화면 품질 점검
- Updated:
  - `app/page.tsx`
  - `app/ask/page.tsx`
  - `app/api/ask/route.ts`
  - `app/globals.css`
  - `knowledge/NEXT_ACTIONS.md`
- Notes:
  - 홈에 Wiki/Project/Build Log 상태와 Ask API mode를 보여주는 status strip을 추가했다.
  - 홈에 raw source → LLM Wiki → Ask Lookup → Feedback Loop 흐름을 추가했다.
  - `/ask`에 단계 카드와 mock mode banner를 추가했다.
  - `/api/ask` GET 요청에 API 설명 JSON을 반환하도록 했다.

## [2026-06-19] workflow | Daily Work Logging System

- Source: 사용자의 매일 작업 기록 요청
- Created:
  - `knowledge/DAILY_WORK_LOGGING_SYSTEM.md`
  - `content/prompts/daily-work-log.md`
  - `content/logs/2026-06-18-daily-digest.md`
  - `content/logs/2026-06-19-daily-work-logging-system.md`
- Updated:
  - `app/logs/page.tsx`
  - `app/globals.css`
  - `knowledge/NEXT_ACTIONS.md`
- Notes:
  - Build Log와 Daily Digest를 분리했다.
  - 매일 아침 어제 작업 또는 미기록 작업을 공유용 기록으로 묶는 절차를 정의했다.
  - 중요한 요청과 프롬프트를 초보자용 재사용 패턴으로 남기는 기준을 추가했다.

## [2026-06-19] ui | Document Reading Experience

- Source: Next Recommended Step
- Created:
  - `components/document-page.tsx`
  - `content/logs/2026-06-19-document-reading-experience.md`
- Updated:
  - `app/projects/[slug]/page.tsx`
  - `app/wiki/[slug]/page.tsx`
  - `app/logs/[slug]/page.tsx`
  - `app/prompts/[slug]/page.tsx`
  - `app/ai-stack/[slug]/page.tsx`
  - `app/globals.css`
  - `knowledge/NEXT_ACTIONS.md`
- Notes:
  - 상세 페이지에 breadcrumb, title, summary, meta, previous/next navigation을 추가했다.
  - 중복되던 상세 페이지 구조를 공통 컴포넌트로 통합했다.
  - 다음 단계는 실제 LLM provider adapter와 rate limit 정책 설계 여부를 결정하는 것이다.
