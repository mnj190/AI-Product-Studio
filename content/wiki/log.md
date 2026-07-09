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

## [2026-06-19] api | LLM Provider Adapter and Rate Limit

- Source: Next Recommended Step
- Created:
  - `lib/ask-config.ts`
  - `lib/llm-provider.ts`
  - `lib/rate-limit.ts`
  - `knowledge/LLM_PROVIDER_ADAPTER_DESIGN.md`
  - `knowledge/ASK_RATE_LIMIT_POLICY.md`
  - `content/logs/2026-06-19-llm-provider-adapter-rate-limit.md`
- Updated:
  - `app/api/ask/route.ts`
  - `app/ask/page.tsx`
  - `.env.example`
  - `knowledge/LLM_ANSWER_API_DESIGN.md`
  - `knowledge/LLM_API_SECURITY_POLICY.md`
  - `knowledge/NEXT_ACTIONS.md`
- Notes:
  - 기본값은 mock mode로 유지한다.
  - `ASK_API_MODE=real`, `LLM_API_KEY`, `LLM_MODEL`이 모두 설정된 경우에만 provider 호출이 가능하다.
  - `/api/ask`에 in-memory rate limit gate를 추가했다.
  - 다음 단계는 real mode 비용/품질 샘플 기준과 production persistent rate limit store 결정이다.

## [2026-06-19] eval | Ask Real Mode Evaluation

- Source: Next Recommended Step
- Created:
  - `lib/ask-evaluation.ts`
  - `app/ask/eval/page.tsx`
  - `knowledge/ASK_REAL_MODE_EVALUATION.md`
  - `content/wiki/ask-real-mode-evaluation.md`
  - `content/logs/2026-06-19-ask-real-mode-evaluation.md`
- Updated:
  - `app/ask/page.tsx`
  - `app/globals.css`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
  - `knowledge/NEXT_ACTIONS.md`
- Notes:
  - real mode 전환 전 품질, 안전, 비용 기준을 정의했다.
  - answerable, blocked, unknown, feedback 샘플 질문을 추가했다.
  - `/ask/eval` 페이지에서 평가 샘플과 readiness checklist를 볼 수 있게 했다.
  - 다음 단계는 production persistent rate limit store를 결정하는 것이다.

## [2026-06-19] infra | Production Rate Limit Store Decision

- Source: Next Recommended Step
- Created:
  - `lib/rate-limit-config.ts`
  - `knowledge/PRODUCTION_RATE_LIMIT_STORE_DECISION.md`
  - `content/wiki/production-rate-limit-store.md`
  - `content/logs/2026-06-19-production-rate-limit-store.md`
- Updated:
  - `lib/rate-limit.ts`
  - `app/api/ask/route.ts`
  - `.env.example`
  - `knowledge/ASK_RATE_LIMIT_POLICY.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - production persistent rate limit store는 Upstash Redis via Vercel Marketplace를 1순위로 선택했다.
  - local/mock mode 기본값은 `RATE_LIMIT_STORE=memory`로 유지한다.
  - `/api/ask` metadata에 rate limit store와 production readiness를 표시하도록 준비했다.
  - 다음 단계는 real mode 제한 배포 환경을 결정하는 것이다.

## [2026-06-19] deploy | Real Mode Preview Deployment Decision

- Source: Next Recommended Step
- Created:
  - `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`
  - `content/wiki/real-mode-preview-deployment.md`
  - `content/logs/2026-06-19-real-mode-preview-deployment.md`
- Updated:
  - `README.md`
  - `.env.example`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - 첫 real mode는 Vercel Preview Deployment에서만 켠다.
  - Production은 계속 `ASK_API_MODE=mock`을 유지한다.
  - Preview environment variable에만 real mode secret과 Upstash Redis 설정을 둔다.
  - 다음 단계는 Vercel 프로젝트 연결과 Preview environment variable 설정 여부를 결정하는 것이다.

## [2026-06-19] workflow | Daily Work Logging System Revision

- Source: 사용자의 매일 작업 기록 운영 방식 보강 요청
- Created:
  - `content/wiki/daily-work-logging-system.md`
- Updated:
  - `knowledge/DAILY_WORK_LOGGING_SYSTEM.md`
  - `content/prompts/daily-work-log.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - “어제 작업”뿐 아니라 “기록되지 않은 모든 작업”을 찾는 기준을 명확히 했다.
  - AI 사용량을 토큰 수가 아니라 Planning, Building, Reviewing, Reflecting 역할로 설명하도록 정리했다.
  - 중요한 요청과 프롬프트를 초보자가 재사용할 수 있는 Prompt Note로 남기는 원칙을 보강했다.

## [2026-06-19] workflow | 2026-06-19 Daily Digest

- Source: Daily Work Logging System 루틴 실행
- Created:
  - `content/logs/2026-06-19-daily-digest.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 2026-06-19의 작업 단위 로그를 하루치 공유용 Daily Digest로 묶었다.
  - 읽기 경험 개선, Ask About Me real mode 준비, rate limit store 결정, Preview Deployment 결정, 작업 기록 시스템 보강을 하나의 흐름으로 정리했다.
  - 다음 작업은 Vercel Preview 환경 준비 여부 결정 또는 로컬 readiness 체크리스트 작성이다.

## [2026-06-26] deploy | Vercel Preview Readiness Checklist

- Source: Next Recommended Step
- Created:
  - `knowledge/VERCEL_PREVIEW_READINESS_CHECKLIST.md`
  - `content/wiki/vercel-preview-readiness-checklist.md`
  - `scripts/check-preview-env.mjs`
  - `content/logs/2026-06-26-vercel-preview-readiness-checklist.md`
- Updated:
  - `package.json`
  - `README.md`
  - `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - 실제 Vercel 계정을 건드리기 전, Preview real mode 준비 상태를 로컬에서 점검하는 명령을 추가했다.
  - `npm run check:preview-env`는 secret 값을 출력하지 않고 설정 여부와 위험 상태만 확인한다.
  - Production real mode는 여전히 금지 상태이며, Preview에서만 제한 검수한다.

## [2026-06-26] deploy | Preview Smoke Test Runbook

- Source: Next Recommended Step
- Created:
  - `scripts/check-ask-url.mjs`
  - `knowledge/VERCEL_PREVIEW_SMOKE_TEST_RUNBOOK.md`
  - `content/wiki/vercel-preview-smoke-test-runbook.md`
  - `content/logs/2026-06-26-preview-smoke-test-runbook.md`
- Updated:
  - `package.json`
  - `README.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - Preview Deployment URL이 생긴 뒤 safe GET smoke test를 실행할 수 있게 했다.
  - smoke test는 `/api/ask`, `/ask/eval`, Preview readiness Wiki 페이지를 확인한다.
  - 질문 POST를 보내지 않기 때문에 provider answer generation이나 비용 발생을 트리거하지 않는다.

## [2026-06-26] ui | Ask Eval Deployment Gates

- Source: Next Recommended Step
- Updated:
  - `app/ask/eval/page.tsx`
  - `lib/ask-evaluation.ts`
  - `app/globals.css`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
  - `content/logs/2026-06-26-ask-eval-deployment-gates.md`
- Notes:
  - `/ask/eval`에 Preview Deployment Gates 섹션을 추가했다.
  - 로컬 readiness, Preview smoke test, manual sample review 순서를 화면에 노출했다.
  - 실제 Vercel 연결 전에도 사용자가 다음 실행 명령과 관련 문서를 찾을 수 있게 했다.

## [2026-06-26] workflow | 2026-06-26 Daily Digest

- Source: Daily Work Logging System 루틴 실행
- Created:
  - `content/logs/2026-06-26-daily-digest.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 2026-06-26의 작업 단위 로그를 하루치 공유용 Daily Digest로 묶었다.
  - Preview readiness check, Preview URL smoke test, `/ask/eval` Deployment Gates UI를 하나의 흐름으로 정리했다.
  - 실제 Vercel 연결은 여전히 사용자 결정이 필요한 다음 단계로 남겼다.

## [2026-06-26] ui | Operating Mode Visibility

- Source: Next Recommended Step
- Created:
  - `content/logs/2026-06-26-operating-mode-visibility.md`
- Updated:
  - `app/page.tsx`
  - `app/ask/page.tsx`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 홈에 Current Operating Mode 섹션을 추가했다.
  - Production mock mode, Preview gated real mode, script-ready verification 상태를 한눈에 보여준다.
  - Ask 페이지의 Next Step을 Preview readiness와 smoke test 중심으로 갱신했다.

## [2026-06-26] deploy | Vercel Connection Decision Brief

- Source: Next Recommended Step
- Created:
  - `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
  - `content/wiki/vercel-connection-decision-brief.md`
  - `content/logs/2026-06-26-vercel-connection-decision-brief.md`
- Updated:
  - `README.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - 실제 Vercel 연결 전에 Option A/B/C 의사결정 브리프를 추가했다.
  - 현재 추천은 Vercel 연결 + Production mock-only 배포인 Option B로 정리했다.
  - Preview real mode는 여전히 별도 검수 단계로 남긴다.

## [2026-06-26] ui | Vercel Decision Visibility

- Source: Next Recommended Step
- Created:
  - `content/logs/2026-06-26-vercel-decision-visibility.md`
- Updated:
  - `app/page.tsx`
  - `lib/ask-evaluation.ts`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 홈 Current Operating Mode 섹션에 Vercel 선택지 링크를 추가했다.
  - `/ask/eval` Deployment Gates의 첫 단계로 Connection decision을 추가했다.
  - 실제 연결 전에 Option A/B/C 선택지를 사용자 화면에서 찾을 수 있게 했다.

## [2026-06-26] deploy | Vercel Mock-only Production Runbook

- Source: Next Recommended Step
- Created:
  - `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`
  - `content/wiki/vercel-mock-production-runbook.md`
  - `content/logs/2026-06-26-vercel-mock-production-runbook.md`
- Updated:
  - `README.md`
  - `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/vercel-connection-decision-brief.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - Option B 선택 시 따라갈 mock-only Production 배포 절차를 추가했다.
  - Production에서는 `ASK_API_MODE=mock`을 유지하고 `LLM_API_KEY`를 넣지 않는 것을 명확히 했다.
  - 배포 후 `npm run check:ask-url -- <production-url>`로 safe smoke test를 실행하도록 정리했다.

## [2026-06-26] workflow | Vercel Mock Production Deploy Report Template

- Source: Next Recommended Step
- Created:
  - `knowledge/VERCEL_MOCK_PRODUCTION_DEPLOY_REPORT_TEMPLATE.md`
  - `content/prompts/vercel-mock-production-deploy-report.md`
  - `content/logs/2026-06-26-vercel-mock-production-deploy-report-template.md`
- Updated:
  - `README.md`
  - `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - Option B 배포 후 결과를 기록하기 위한 Build Log 템플릿을 추가했다.
  - Production URL, `/api/ask` metadata, smoke test 결과, manual page check, 안전 제약을 빠뜨리지 않도록 정리했다.
  - Prompt Library에 mock-only Production 배포 결과 기록 프롬프트를 추가했다.

## [2026-06-26] ui | Home Recent Build Logs

- Source: Home page quality check
- Created:
  - `content/logs/2026-06-26-home-recent-build-logs.md`
- Updated:
  - `app/page.tsx`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 홈 Build Log 섹션이 오래된 로그를 보여주던 문제를 수정했다.
  - `getLatestEntries("logs", 3)`로 최신 작업 3개를 보여주도록 변경했다.
  - 섹션 제목도 “가장 최근에 AI와 함께 만든 기록”으로 갱신했다.

## [2026-06-26] docs | README Current Direction Refresh

- Source: Current direction consistency check
- Created:
  - `content/logs/2026-06-26-readme-current-direction-refresh.md`
- Updated:
  - `README.md`
  - `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
  - `content/wiki/log.md`
- Notes:
  - README의 Next Direction을 현재 추천인 Option B 중심으로 정리했다.
  - Production은 mock mode를 유지하고, real mode는 이후 Preview에서 제한적으로 검수한다는 순서를 명확히 했다.
  - GitHub/로컬 main 동기화 상태처럼 자주 바뀌는 문장은 고정 상태값 대신 확인 명령 기준으로 바꿨다.

## [2026-06-26] refactor | Latest Content Entries Helper

- Source: Build Log ordering follow-up
- Created:
  - `content/logs/2026-06-26-latest-content-helper.md`
- Updated:
  - `lib/content.ts`
  - `app/page.tsx`
  - `app/logs/page.tsx`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/logs/2026-06-26-home-recent-build-logs.md`
  - `content/wiki/log.md`
- Notes:
  - 홈과 Build Log 목록에서 직접 `reverse()`를 호출하던 최신순 표현을 `getLatestEntries()` helper로 모았다.
  - “최신 작업을 보여준다”는 의도를 페이지 코드가 아니라 콘텐츠 유틸에서 드러내도록 정리했다.
  - 상세 페이지의 이전/다음 탐색은 기존 전체 정렬을 유지했다.

## [2026-06-26] ui | Featured Home Content

- Source: Home content discoverability check
- Created:
  - `content/logs/2026-06-26-featured-home-content.md`
- Updated:
  - `lib/content.ts`
  - `app/page.tsx`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 홈 Projects와 Prompt Library 섹션이 파일명 알파벳순 앞 3개를 보여주던 방식을 대표 콘텐츠 기준으로 바꿨다.
  - 대표 프로젝트는 `portfolio-site`, `ask-about-me-chatbot`, `llm-wiki`로 정했다.
  - 대표 프롬프트는 `project-planning`, `daily-work-log`, `code-review`로 정했다.

## [2026-06-26] guard | Featured Content Guard

- Source: Featured home content follow-up
- Created:
  - `content/logs/2026-06-26-featured-content-guard.md`
- Updated:
  - `lib/content.ts`
  - `content/logs/2026-06-26-featured-home-content.md`
  - `content/wiki/log.md`
- Notes:
  - `getEntriesBySlugs()`가 누락된 slug를 조용히 필터링하지 않도록 바꿨다.
  - 대표 콘텐츠 파일이 삭제되거나 이름이 바뀌면 빌드에서 바로 `Missing content entry` 에러가 나도록 했다.
  - 홈 대표 콘텐츠는 fallback보다 명시적 실패가 더 안전하다고 판단했다.

## [2026-06-26] docs | Local Development Docs

- Source: Local web restart check
- Created:
  - `content/logs/2026-06-26-local-development-docs.md`
- Updated:
  - `README.md`
  - `content/wiki/log.md`
- Notes:
  - README에 로컬 개발 서버 실행, 재기동, 상태 확인 방법을 추가했다.
  - 기본 `npm run dev`와 포트 충돌 회피용 `127.0.0.1:3001` 실행 방식을 함께 남겼다.
  - `curl -I`로 `200 OK` 응답을 확인하는 기준을 문서화했다.

## [2026-06-26] dx | Dev Local Script

- Source: Local development workflow follow-up
- Created:
  - `content/logs/2026-06-26-dev-local-script.md`
- Updated:
  - `package.json`
  - `README.md`
  - `content/logs/2026-06-26-local-development-docs.md`
  - `content/wiki/log.md`
- Notes:
  - `npm run dev:local` script를 추가했다.
  - 긴 `npm run dev -- -H 127.0.0.1 -p 3001` 명령 대신 짧은 실행 명령을 README에 반영했다.
  - 기본 `npm run dev` 흐름은 유지했다.

## [2026-06-26] dx | Verify Script

- Source: Verification workflow cleanup
- Created:
  - `content/logs/2026-06-26-verify-script.md`
- Updated:
  - `package.json`
  - `README.md`
  - `content/logs/2026-06-26-dev-local-script.md`
  - `content/wiki/log.md`
- Notes:
  - `npm run verify` script를 추가했다.
  - 이 명령은 `npm run build`와 `npm run check:preview-env`를 순서대로 실행한다.
  - Preview URL smoke test는 실제 URL이 생긴 뒤 별도로 실행하도록 분리했다.

## [2026-06-26] docs | Git Sync Docs

- Source: Local/remote commit state cleanup
- Created:
  - `content/logs/2026-06-26-git-sync-docs.md`
- Updated:
  - `README.md`
  - `content/wiki/log.md`
- Notes:
  - README에 `git status --short --branch`로 로컬/원격 차이를 확인하는 방법을 추가했다.
  - `[ahead N]`이 로컬에 아직 push하지 않은 커밋 수라는 점을 설명했다.
  - push 전에는 `npm run verify`를 먼저 통과시키도록 정리했다.

## [2026-06-26] docs | Repository Map Docs

- Source: README onboarding check
- Created:
  - `content/logs/2026-06-26-repository-map-docs.md`
- Updated:
  - `README.md`
  - `content/wiki/log.md`
- Notes:
  - README에 Repository Map 섹션을 추가했다.
  - `app`, `components`, `lib`, `scripts`, `content`, `knowledge`, `raw`의 역할을 정리했다.
  - 새 작업자가 코드와 공개 콘텐츠, 기획 문서, 원본 자료 위치를 빠르게 구분할 수 있게 했다.

## [2026-06-26] docs | Content Authoring Docs

- Source: README content workflow check
- Created:
  - `content/logs/2026-06-26-content-authoring-docs.md`
- Updated:
  - `README.md`
  - `knowledge/DAILY_WORK_LOGGING_SYSTEM.md`
  - `content/wiki/log.md`
- Notes:
  - README에 Content Authoring 섹션을 추가했다.
  - 새 프로젝트, 프롬프트, Build Log, Wiki 문서를 어디에 추가하는지 짧게 정리했다.
  - Daily Work Logging System의 검증 명령을 `npm run verify` 기준으로 갱신했다.

## [2026-06-26] planning | Next Actions Ops Refresh

- Source: Next Actions consistency check
- Created:
  - `content/logs/2026-06-26-next-actions-ops-refresh.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 최근 완료한 README와 npm script 기반 운영 루틴을 Next Actions에 반영했다.
  - `운영/온보딩 루틴 정리` 섹션을 추가했다.
  - Vercel 연결 전 로컬 확인 기준을 `npm run verify`로 갱신했다.

## [2026-06-27] docs | Daily Digest Refresh

- Source: Daily work logging routine
- Created:
  - `content/logs/2026-06-27-daily-digest-refresh.md`
- Updated:
  - `content/logs/2026-06-26-daily-digest.md`
  - `content/wiki/log.md`
- Notes:
  - 2026-06-26 Daily Digest에 누락된 후반 작업을 보강했다.
  - 홈 콘텐츠 품질 개선, README 온보딩 문서, local dev/verify script, Git sync, Content Authoring, Next Actions 갱신을 하루 요약에 추가했다.
  - Important Prompts와 Related Build Logs도 후반 작업 기준으로 확장했다.

## [2026-06-27] docs | Verify Docs Alignment

- Source: Verification workflow consistency check
- Created:
  - `content/logs/2026-06-27-verify-docs-alignment.md`
- Updated:
  - `knowledge/LLM_WIKI_INGEST_WORKFLOW.md`
  - `knowledge/LLM_WIKI_LINT_CHECKLIST.md`
  - `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`
  - `content/wiki/log.md`
- Notes:
  - LLM Wiki ingest/lint 체크리스트의 검증 기준을 `npm run verify`로 갱신했다.
  - Vercel mock-only Production runbook의 pre-flight도 `npm run verify` 중심으로 정리했다.
  - Vercel 배포 설정의 build command 안내는 `npm run build`로 유지했다.

## [2026-06-27] docs | Workspace Coordination Docs

- Source: Untracked workspace knowledge review
- Created:
  - `content/logs/2026-06-27-workspace-coordination-docs.md`
- Updated:
  - `knowledge/WORKSPACE_GUIDE.md`
  - `knowledge/AGENT_SYNC.md`
  - `knowledge/CROSS_PROJECT.md`
  - `README.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 멀티 프로젝트/멀티 에이전트 운영 문서를 정식 공유 지식으로 편입했다.
  - trading-bot 공개 로그 전달 경로를 현재 자동 노출되는 `content/logs/YYYY-MM-DD-trading-topic.md` 형식으로 정리했다.
  - `content/logs/trading/` 하위 폴더를 쓰려면 콘텐츠 로더 확장이 먼저 필요하다고 명시했다.

## [2026-06-27] docs | Trading Bot Portfolio Integration

- Source: Cross-project documentation follow-up
- Created:
  - `content/logs/2026-06-27-trading-bot-portfolio-integration.md`
- Updated:
  - `content/projects/trading-bot.md`
  - `content/wiki/log.md`
- Notes:
  - trading-bot 프로젝트 문서에 Portfolio Integration 섹션을 추가했다.
  - 공개 로그 반영 경로를 `content/logs/YYYY-MM-DD-trading-topic.md`로 명시했다.
  - 공개 가능한 내용과 제외해야 할 민감/투자 권유성 내용을 분리했다.

## [2026-06-27] guard | Trading Bot Answer Guard

- Source: Ask About Me policy consistency check
- Created:
  - `content/logs/2026-06-27-trading-bot-answer-guard.md`
- Updated:
  - `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`
  - `lib/answer-draft.ts`
  - `lib/ask-evaluation.ts`
  - `content/wiki/log.md`
- Notes:
  - trading-bot 답변 정책에 구체적인 비공개 범위를 추가했다.
  - 계좌 잔고, 손익 금액, 매매 시점/수량은 답변하지 않는 기준으로 명시했다.
  - blocked 답변 문구와 eval pass criteria를 같은 기준으로 맞췄다.

## [2026-06-27] digest | Daily Digest

- Source: Daily work logging routine
- Created:
  - `content/logs/2026-06-27-daily-digest.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 2026-06-27 작업을 하루치 공유용 Daily Digest로 묶었다.
  - 기록 보강, verify 기준 정렬, 멀티 프로젝트 운영 문서, trading-bot 공개/답변 가드레일을 하나의 흐름으로 정리했다.
  - 초보자가 재사용할 수 있는 프롬프트 패턴 4개를 추가했다.

## [2026-06-27] planning | Safe Local Backlog

- Source: Next Actions planning check
- Created:
  - `content/logs/2026-06-27-safe-local-backlog.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - Vercel 결정 전에도 진행 가능한 안전한 로컬 백로그를 추가했다.
  - 외부 계정, secret, 배포를 건드리지 않는 작업 후보를 분리했다.
  - Home/Project Archive, LLM Wiki lint, Ask 품질, Daily Work Logging, GitHub 동기화 준비를 후보로 정리했다.

## [2026-06-27] lint | Wiki Index Project Coverage

- Source: LLM Wiki lint check
- Created:
  - `content/logs/2026-06-27-wiki-index-project-coverage.md`
- Updated:
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - 실제 Wiki 파일 목록과 `content/wiki/index.md` 연결 상태를 점검했다.
  - Wiki 문서 자체는 모두 index에 연결되어 있었다.
  - Project Pages에 빠져 있던 `content/projects/trading-bot.md` 링크를 추가했다.

## [2026-06-27] content | Project Related Links

- Source: Safe Local Backlog / Home and Project Archive quality
- Created:
  - `content/logs/2026-06-27-project-related-links.md`
- Updated:
  - `content/projects/portfolio-site.md`
  - `content/projects/ask-about-me-chatbot.md`
  - `content/projects/llm-wiki.md`
  - `content/projects/trading-bot.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 대표 프로젝트 문서의 비어 있던 Links 섹션을 실제 작업 로그, 프롬프트, Wiki, 운영 문서로 연결했다.
  - 프로젝트 설명을 읽은 사람이 구현 과정과 의사결정 기록을 따라갈 수 있도록 했다.
  - 별도 자동 추천 UI 대신 Markdown 링크 보강으로 먼저 안전하게 개선했다.

## [2026-06-27] lint | LLM Wiki Health Check

- Source: `knowledge/LLM_WIKI_LINT_CHECKLIST.md`
- Created:
  - `content/logs/2026-06-27-llm-wiki-health-check.md`
- Updated:
  - `content/projects/trading-bot.md`
  - `content/projects/webgpu-game.md`
  - `knowledge/PROJECT_CONTEXT.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - Wiki index와 실제 Wiki 문서 목록을 대조하고, orphan/stale/security 후보를 점검했다.
  - Trading Bot 공개 범위가 과하게 넓게 읽힐 수 있던 오래된 설명을 현재 공개/답변 정책에 맞게 조정했다.
  - WebGPU Game 문서의 비어 있던 Links 섹션을 Wiki, 프롬프트, 향후 Build Log 경로로 연결했다.

## [2026-06-27] eval | Ask Quality Samples

- Source: Safe Local Backlog / Ask About Me quality
- Created:
  - `content/logs/2026-06-27-ask-quality-samples.md`
- Updated:
  - `lib/answer-draft.ts`
  - `lib/ask-evaluation.ts`
  - `content/wiki/ask-real-mode-evaluation.md`
  - `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - Trading Bot의 구체적인 수익률, 계좌 잔고, 거래 내역 요청을 blocked 샘플과 guard에 추가했다.
  - 실제 Vercel Preview URL처럼 문서에 없는 배포 상태는 unknown으로 처리하도록 샘플과 guard를 보강했다.
  - 문서에 없는 프로젝트 성과를 과장해달라는 요청도 unknown으로 처리하도록 기준을 명확히 했다.

## [2026-06-30] ui | Project Card Resource Links

- Source: Safe Local Backlog / Home and Project Archive quality
- Created:
  - `content/logs/2026-06-30-project-card-resource-links.md`
- Updated:
  - `app/projects/page.tsx`
  - `app/globals.css`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - `/projects` 카드에서 관련 로그, 프롬프트, Wiki, 주요 화면으로 이어지는 짧은 링크를 노출했다.
  - 공용 `ContentCard`는 유지하고 Project Archive 화면에만 전용 카드 구성을 적용했다.
  - Trading Bot은 별도 에이전트 담당 범위로 두고 이번 카드 큐레이션 대상에서 제외했다.

## [2026-06-30] log | Daily Digest

- Source: Daily Work Logging routine
- Created:
  - `content/logs/2026-06-30-daily-digest.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 2026-06-30 작업을 하루치 공유용 Daily Digest로 묶었다.
  - Trading Bot은 별도 에이전트 담당 범위로 분리하고, 기본 포트폴리오 Project Archive 개선과 검증 결과를 정리했다.
  - 다음 후보를 Prompt Library 기록 판단과 LLM Wiki 발견 가능성 점검으로 남겼다.

## [2026-06-30] prompt | Multi-Agent Scope Handoff

- Source: Daily Work Logging / Prompt Library curation
- Created:
  - `content/prompts/multi-agent-scope-handoff.md`
  - `content/logs/2026-06-30-multi-agent-scope-prompt.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 여러 에이전트가 같은 워크스페이스에서 일할 때 제외 범위와 진행 범위를 분리하는 프롬프트를 추가했다.
  - Trading Bot을 별도 담당 범위로 두고 기본 포트폴리오 작업을 이어간 오늘의 요청 패턴을 재사용 가능하게 정리했다.

## [2026-06-30] lint | Prompt And AI Stack Discovery

- Source: LLM Wiki quality check
- Created:
  - `content/logs/2026-06-30-prompt-ai-stack-discovery.md`
- Updated:
  - `content/wiki/index.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - Prompt Library와 AI Stack 문서가 Wiki index에서 바로 발견되도록 별도 섹션을 추가했다.
  - Ask About Me 답변 정책과 Local Wiki Lookup 설계에서 중요 지식 계층으로 쓰는 문서들이 index에서도 보이도록 맞췄다.
  - 실제 Wiki 문서 목록과 index 링크를 비교해 `index.md` 자체를 제외한 Wiki 문서가 모두 연결되어 있음을 확인했다.

## [2026-06-30] lint | Project Stale Claims

- Source: `knowledge/LLM_WIKI_LINT_CHECKLIST.md`
- Created:
  - `content/logs/2026-06-30-project-stale-claims.md`
- Updated:
  - `content/projects/portfolio-site.md`
  - `content/projects/llm-wiki.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - Portfolio Site와 Personal LLM Wiki 프로젝트 문서의 Result 섹션이 현재 구현 상태보다 초기 단계처럼 읽히던 표현을 갱신했다.
  - Vercel 연결과 real LLM mode는 여전히 사용자 결정 전 보류 상태로 유지했다.

## [2026-06-30] lint | Ask Stale Design Refresh

- Source: `knowledge/LLM_WIKI_LINT_CHECKLIST.md`
- Created:
  - `content/logs/2026-06-30-ask-stale-design-refresh.md`
- Updated:
  - `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`
  - `knowledge/ROADMAP.md`
  - `content/wiki/llm-wiki-pattern.md`
  - `content/wiki/log.md`
- Notes:
  - `/ask`가 예시 질문과 source mapping만 보여주는 초기 mock page처럼 설명되던 오래된 상태 문구를 갱신했다.
  - Local Wiki Lookup, deterministic draft answer, feedback candidate, `/api/ask` mock route, `/ask/eval` 평가 페이지가 연결된 현재 상태를 반영했다.

## [2026-06-30] lint | LLM Wiki Lint Follow-up

- Source: `knowledge/LLM_WIKI_LINT_CHECKLIST.md`
- Created:
  - `content/logs/2026-06-30-llm-wiki-lint-followup.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 트레이딩 봇 자체 작업을 제외하고 기본 포트폴리오, Ask About Me, LLM Wiki 운영 문서 중심으로 1차 stale/orphan/security 점검을 마무리했다.
  - 보안 키워드 검색 결과는 실제 secret 값이 아니라 placeholder, 정책 문구, 차단 패턴, runbook 안내로 분류했다.
  - 깊은 중복 설명 정리는 별도 리팩토링 패스로 남겼다.

## [2026-06-30] setup | Tailwind CSS

- Source: Web MVP remaining task
- Created:
  - `content/logs/2026-06-30-tailwind-setup.md`
- Updated:
  - `package.json`
  - `package-lock.json`
  - `postcss.config.mjs`
  - `app/globals.css`
  - `app/layout.tsx`
  - `knowledge/NEXT_ACTIONS.md`
  - `knowledge/TECH_DECISIONS.md`
  - `content/wiki/log.md`
- Notes:
  - Tailwind CSS v4와 `@tailwindcss/postcss`를 dev dependency로 추가했다.
  - 기존 CSS 기반 디자인을 유지하기 위해 preflight는 import하지 않고 `theme`와 `utilities`만 연결했다.
  - `body`에 `antialiased` utility를 적용해 Tailwind pipeline이 실제 빌드에서 동작하도록 했다.
  - npm audit은 Next.js 관련 advisory를 보고했지만 자동 수정이 Next 16 breaking change로 이어져 배포 전 별도 검토 항목으로 남겼다.

## [2026-06-30] security | Next Audit Triage

- Source: `npm audit --audit-level=moderate`
- Created:
  - `knowledge/NEXT_AUDIT_TRIAGE.md`
  - `content/logs/2026-06-30-next-audit-triage.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - Next.js 관련 high advisory와 Next 내부 PostCSS moderate advisory를 배포 전 판단 문서로 정리했다.
  - `npm audit fix --force`가 Next 16 major upgrade를 제안하므로 자동 적용하지 않았다.
  - npm registry 기준 Next 14 최신은 현재 사용 중인 `14.2.35`라서 14 라인 안의 추가 패치 경로는 없음을 확인했다.
  - 현재 앱은 `next/image`, image remote patterns, middleware/proxy, rewrites, beforeInteractive script, WebSocket upgrade route를 사용하지 않음을 확인했다.

## [2026-06-30] dependency | Next 15 Upgrade

- Source: Next.js audit triage
- Created:
  - `content/logs/2026-06-30-next15-upgrade.md`
- Updated:
  - `package.json`
  - `package-lock.json`
  - `next-env.d.ts`
  - `next.config.mjs`
  - `app/ai-stack/[slug]/page.tsx`
  - `app/projects/[slug]/page.tsx`
  - `app/logs/[slug]/page.tsx`
  - `app/prompts/[slug]/page.tsx`
  - `app/wiki/[slug]/page.tsx`
  - `app/ask/page.tsx`
  - `knowledge/NEXT_AUDIT_TRIAGE.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - Next 15.5.19로 업그레이드하고 `npm run verify` 통과를 확인했다.
  - Next 15의 async page props 타입에 맞춰 dynamic route `params`와 `/ask`의 `searchParams`를 await하는 형태로 수정했다.
  - Next 16.2.9는 Turbopack build 중 sandbox port binding 오류로 실패했고 audit 개선도 없어 보류했다.
  - 남은 Next 내부 PostCSS moderate advisory는 배포 전 risk acceptance 또는 upstream patch 확인 대상으로 남겼다.

## [2026-07-08] dependency | Next 15 Patch and Audit Refresh

- Source: Vercel deployment pre-flight
- Created:
  - `content/logs/2026-07-08-next15-patch-audit-refresh.md`
- Updated:
  - `package.json`
  - `package-lock.json`
  - `knowledge/NEXT_AUDIT_TRIAGE.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`
  - `content/wiki/log.md`
- Notes:
  - Next 15 라인의 최신 패치인 `15.5.20`으로 업그레이드했다.
  - `npm run verify`는 Next.js 15.5.20 기준으로 통과했고 정적 페이지 107개를 생성했다.
  - `npm audit --audit-level=moderate`는 Next 내부 PostCSS moderate advisory 2건을 계속 보고했다.
  - Option B 진행 전 risk acceptance 또는 upstream patch 대기 결정을 명시해야 한다.

## [2026-07-08] deploy | Vercel Mock-only Production

- Source: Vercel Dashboard connection and CLI verification
- Created:
  - `content/logs/2026-07-08-vercel-dashboard-connection.md`
  - `content/logs/2026-07-08-vercel-mock-production-deploy.md`
- Updated:
  - `.gitignore`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - 사용자가 Vercel Dashboard에서 `ai-product-studio` 프로젝트를 연결했다.
  - `git push origin main`으로 로컬 커밋을 GitHub `main`에 반영했다.
  - Production URL `https://ai-product-studio-psi.vercel.app`에서 safe GET smoke test를 통과했다.
  - `/api/ask` metadata는 `mode=mock`, `realModeReady=false`, `rateLimitStore=memory`로 확인됐다.
  - Vercel CLI 54.21.1을 전역 설치하고 로컬 프로젝트를 `ai-vibe-project/ai-product-studio`에 연결했다.
  - Production environment variable은 설정되어 있지 않음을 확인했다.

## [2026-07-08] digest | Vercel Deployment Daily Digest

- Source: 2026-07-08 Vercel deployment work logs
- Created:
  - `content/logs/2026-07-08-daily-digest.md`
- Updated:
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - Next 15 patch, audit refresh, Vercel Dashboard connection, GitHub push, Production smoke test, Vercel CLI connection을 하루 단위 기록으로 묶었다.
  - Production은 mock-only로 유지하고 real LLM mode는 Preview에서만 별도 검수한다는 결정을 정리했다.
  - 공개 URL 공유 여부와 Preview real mode 검수 여부를 다음 선택지로 남겼다.

## [2026-07-09] docs | Post-deployment Status Refresh

- Source: post-deployment polish checklist
- Created:
  - `content/logs/2026-07-09-post-deployment-status-refresh.md`
- Updated:
  - `README.md`
  - `app/page.tsx`
  - `app/ask/page.tsx`
  - `content/projects/portfolio-site.md`
  - `content/projects/ask-about-me-chatbot.md`
  - `content/wiki/vercel-connection-decision-brief.md`
  - `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `content/wiki/log.md`
- Notes:
  - README, 홈, Ask 페이지, 프로젝트 문서, 공개 Wiki decision brief를 mock-only Production 배포 완료 상태로 갱신했다.
  - 공개 URL 공유 전 polish 체크리스트를 완료 처리했다.
  - 다음 결정은 공개 URL 공유 여부 또는 Preview real mode 검수 준비 여부로 남겼다.
