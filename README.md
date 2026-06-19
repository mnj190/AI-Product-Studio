# AI Product Studio

Vibe Coding Lab 기반의 AI 포트폴리오 웹 레포지토리.

AI 활용 과정을 보여주는 개인 포트폴리오 프로젝트.

이 프로젝트는 단순한 결과물 중심 포트폴리오가 아니라, AI와 함께 아이디어를 기획하고 구현하고 개선하는 과정을 기록하는 것을 목표로 한다.

## Core Structure

- `knowledge/`: 프로젝트 방향, 작업 규칙, 대화 요약, 아이디어 저장소
- `content/`: 웹사이트와 LLM Wiki가 사용할 공개 콘텐츠 원본

## First Principle

코드는 결과물이고, 문서와 기록은 포트폴리오의 핵심 자산이다.

새 작업을 시작하기 전에는 먼저 다음 문서를 확인한다.

- `knowledge/PROJECT_CONTEXT.md`
- `knowledge/AI_WORK_RULES.md`
- `knowledge/CONTENT_STRUCTURE.md`
- `knowledge/ROADMAP.md`
- `knowledge/NEXT_ACTIONS.md`
- `knowledge/LLM_WIKI_SCHEMA.md`
- `knowledge/LLM_WIKI_INGEST_WORKFLOW.md`

## Current Status

Static Portfolio MVP 구현 완료.

현재는 Markdown 기반 콘텐츠를 웹에서 탐색할 수 있고, LLM Wiki 운영 구조를 구축하고 있다.

Ask About Me는 mock mode, local wiki lookup, draft answer, feedback loop, provider adapter-ready 구조를 갖춘 상태이다.

## Next Direction

다음 단계는 Ask About Me real mode를 제한적으로 검수할 Vercel Preview Deployment 준비 여부를 결정하는 것이다.

Production은 계속 mock mode를 유지하고, 첫 real mode는 Preview Deployment에서만 켠다.

## Ask API Mode

현재 `/api/ask`는 mock mode로 동작한다.

기본값에서는 외부 LLM API를 호출하지 않고, Local Wiki Lookup과 deterministic draft answer만 반환한다.

real mode 관련 문서는 다음을 먼저 확인한다.

- `knowledge/LLM_API_SECURITY_POLICY.md`
- `knowledge/LLM_PROVIDER_ADAPTER_DESIGN.md`
- `knowledge/ASK_REAL_MODE_EVALUATION.md`
- `knowledge/PRODUCTION_RATE_LIMIT_STORE_DECISION.md`
- `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`
