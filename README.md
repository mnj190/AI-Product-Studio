# AI Product Studio

Vibe Coding Lab 기반의 AI 포트폴리오 웹 레포지토리.

AI 활용 과정을 보여주는 개인 포트폴리오 프로젝트.

이 프로젝트는 단순한 결과물 중심 포트폴리오가 아니라, AI와 함께 아이디어를 기획하고 구현하고 개선하는 과정을 기록하는 것을 목표로 한다.

## Core Structure

- `knowledge/`: 프로젝트 방향, 작업 규칙, 대화 요약, 아이디어 저장소
- `content/`: 웹사이트와 LLM Wiki가 사용할 공개 콘텐츠 원본

## Repository Map

- `app/`: Next.js App Router 페이지와 API route
- `app/api/ask/route.ts`: Ask About Me API endpoint
- `components/`: 카드, 문서 상세, Markdown 렌더링 같은 공통 UI
- `lib/`: 콘텐츠 로딩, Wiki lookup, draft answer, provider adapter, rate limit 로직
- `scripts/`: 로컬 검증과 배포 전 smoke test helper
- `content/about/`: 공개 프로필, 경력, 기술, 관심사
- `content/projects/`: 포트폴리오 프로젝트 문서
- `content/prompts/`: 재사용 가능한 프롬프트 라이브러리
- `content/logs/`: 작업 단위 Build Log와 Daily Digest
- `content/wiki/`: 공개 LLM Wiki 문서
- `content/ai-stack/`: AI 도구별 사용 방식
- `knowledge/`: 공개 전 기획, 정책, 운영 규칙, 의사결정 문서
- `raw/`: 공개 콘텐츠로 정리하기 전 원본 자료 보관 위치

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

Daily Work Logging System을 통해 매일 아침 AI와 함께 한 작업, 중요한 의사결정, 재사용 가능한 프롬프트를 공유용 기록으로 정리한다.

## Next Direction

다음 단계는 Vercel 연결 방향을 결정하는 것이다.

현재 추천은 `Option B: Vercel 연결 + Production mock-only 배포`이다.

Production은 계속 mock mode를 유지하고, 실제 LLM real mode는 나중에 Preview Deployment에서만 제한적으로 검수한다.

외부 Vercel 계정/프로젝트 연결, secret 설정, 배포 실행은 사용자가 명시적으로 선택하기 전까지 진행하지 않는다.

선택지는 다음 문서에서 확인한다.

- `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`

## Ask API Mode

현재 `/api/ask`는 mock mode로 동작한다.

기본값에서는 외부 LLM API를 호출하지 않고, Local Wiki Lookup과 deterministic draft answer만 반환한다.

real mode 관련 문서는 다음을 먼저 확인한다.

- `knowledge/LLM_API_SECURITY_POLICY.md`
- `knowledge/LLM_PROVIDER_ADAPTER_DESIGN.md`
- `knowledge/ASK_REAL_MODE_EVALUATION.md`
- `knowledge/PRODUCTION_RATE_LIMIT_STORE_DECISION.md`
- `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`
- `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
- `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`
- `knowledge/VERCEL_MOCK_PRODUCTION_DEPLOY_REPORT_TEMPLATE.md`
- `knowledge/VERCEL_PREVIEW_READINESS_CHECKLIST.md`
- `knowledge/VERCEL_PREVIEW_SMOKE_TEST_RUNBOOK.md`

로컬에서 Preview real mode 준비 상태를 점검하려면 다음을 실행한다.

```bash
npm run check:preview-env
```

Preview Deployment URL이 생긴 뒤 안전한 GET smoke test를 실행하려면 다음을 사용한다.

```bash
npm run check:ask-url -- https://your-preview-url.vercel.app
```

## Local Development

로컬 웹을 실행하려면 다음을 사용한다.

```bash
npm run dev
```

브라우저에서 기본 주소를 연다.

```text
http://localhost:3000
```

다른 작업과 포트 충돌을 피하고 싶으면 `127.0.0.1:3001`로 실행한다.

```bash
npm run dev:local
```

이 경우 브라우저에서 다음 주소를 연다.

```text
http://127.0.0.1:3001
```

재기동은 서버를 띄운 터미널에서 `Ctrl + C`로 중지한 뒤 같은 명령을 다시 실행한다.

이미 켜져 있는지 확인하려면 다음을 사용한다.

```bash
curl -I http://127.0.0.1:3001
```

`HTTP/1.1 200 OK`가 나오면 로컬 웹이 정상 응답 중이다.

## Verification

작업 단위를 마무리하기 전에는 다음 명령으로 production build와 Preview 환경 설정 점검을 함께 실행한다.

```bash
npm run verify
```

이 명령은 다음을 순서대로 실행한다.

```bash
npm run build
npm run check:preview-env
```

## Git Sync

로컬 작업이 GitHub보다 앞서 있는지 확인하려면 다음을 사용한다.

```bash
git status --short --branch
```

`[ahead N]`이 보이면 로컬에 아직 GitHub로 push하지 않은 커밋이 `N`개 있다는 뜻이다.

최근 커밋을 확인하려면 다음을 사용한다.

```bash
git log --oneline --decorate -10
```

작업을 GitHub에 올릴 때는 다음을 실행한다.

```bash
git push origin main
```

push 전에는 먼저 `npm run verify`가 통과했는지 확인한다.

## Work Logging

매일 작업 기록은 다음 문서를 기준으로 운영한다.

- `knowledge/DAILY_WORK_LOGGING_SYSTEM.md`
- `content/prompts/daily-work-log.md`
- `content/wiki/daily-work-logging-system.md`
