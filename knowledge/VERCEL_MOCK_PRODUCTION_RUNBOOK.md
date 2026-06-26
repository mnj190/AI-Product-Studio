# Vercel Mock-only Production Runbook

이 문서는 Option B를 선택했을 때 AI Product Studio를 Vercel에 연결하고, Production은 mock mode로만 배포하는 실행 절차다.

실제 Vercel project 연결과 배포 실행은 사용자가 명시적으로 Option B를 선택한 뒤 진행한다.

## Goal

공개 웹 URL을 만든다.

단, Ask About Me Production은 계속 mock mode로 유지한다.

## Scope

포함:

- Vercel project와 GitHub repo 연결
- Production branch 확인
- Production mock mode 확인
- 배포 후 공개 URL smoke test
- 결과 기록

제외:

- Production real mode
- Production `LLM_API_KEY` 설정
- Preview real mode secret 설정
- Upstash Redis 연결
- `/ask` 질문 POST로 provider 호출 테스트

## Pre-flight

로컬에서 먼저 확인한다.

```bash
git status --short --branch
npm run check:preview-env
npm run build
```

기대 상태:

- git worktree clean
- `ASK_API_MODE=mock`
- `RATE_LIMIT_STORE=memory`
- build 성공

## Vercel Project Setup

1. Vercel Dashboard에서 새 Project를 만든다.
2. GitHub repository `mnj190/AI-Product-Studio`를 연결한다.
3. Framework preset은 Next.js로 둔다.
4. Production branch가 `main`인지 확인한다.
5. build command는 기본값 또는 `npm run build`를 사용한다.
6. install command는 기본값을 사용한다.

## Production Environment Variables

Production에는 real mode secret을 넣지 않는다.

권장 Production 설정:

```text
ASK_API_MODE=mock
RATE_LIMIT_STORE=memory
ASK_RATE_LIMIT_MAX_REQUESTS=20
ASK_RATE_LIMIT_WINDOW_MS=600000
```

Production에 넣지 말 것:

```text
LLM_API_KEY
LLM_MODEL
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

`LLM_PROVIDER=openai`는 공개 secret이 아니지만, Production mock-only 배포에서는 없어도 된다.

## Deploy

Vercel에서 Production deployment를 실행한다.

GitHub `main`이 production branch라면, `main` push 또는 Vercel Dashboard의 deploy flow로 Production deployment가 만들어진다.

## Post-deploy Smoke Test

Production URL이 생기면 아래를 확인한다.

```bash
npm run check:ask-url -- https://your-production-url.vercel.app
```

기대 결과:

```text
mode=mock
realModeReady=false
rateLimitStore=memory
rateLimitProductionReady=false
```

`rateLimitProductionReady=false`는 mock-only Production에서는 허용한다.

real mode가 아니기 때문에 persistent rate limit store가 아직 없어도 된다.

## Manual Page Check

다음 페이지를 확인한다.

- `/`
- `/ask`
- `/ask/eval`
- `/wiki/vercel-connection-decision-brief`
- `/logs`

확인할 것:

- 홈에서 `Current Operating Mode`가 보인다.
- Ask API mode가 mock으로 설명된다.
- `/ask/eval`에서 Deployment Gates가 보인다.
- Decision Brief에서 Option A/B/C가 보인다.

## Hard Stop Conditions

아래 중 하나라도 발생하면 배포 검수를 중단한다.

- `/api/ask` metadata가 `mode=real`
- Production에 `LLM_API_KEY`가 설정되어 있음
- Production에 `ASK_API_MODE=real`이 설정되어 있음
- `/ask`가 provider answer generation을 트리거함
- `/ask/eval`이 접근 불가

## Rollback

문제가 있으면 다음 순서로 되돌린다.

1. Production environment variables에서 real mode 관련 값을 제거한다.
2. `ASK_API_MODE=mock`을 다시 확인한다.
3. 재배포한다.
4. `npm run check:ask-url -- <production-url>`을 다시 실행한다.

## Record

배포 후 다음 파일 중 하나에 결과를 기록한다.

- `content/logs/YYYY-MM-DD-vercel-mock-production-deploy.md`
- 또는 해당 날짜의 Daily Digest

기록 템플릿:

- `knowledge/VERCEL_MOCK_PRODUCTION_DEPLOY_REPORT_TEMPLATE.md`

재사용 프롬프트:

- `content/prompts/vercel-mock-production-deploy-report.md`

기록할 내용:

- Production URL
- `/api/ask` metadata
- smoke test 결과
- 확인한 페이지
- 남은 작업

## Next Step After Option B

Option B가 완료되면 다음 선택지는 두 가지다.

1. 공개 포트폴리오 콘텐츠와 UI 품질을 더 다듬는다.
2. Preview real mode 검수를 위해 Option C 준비로 이동한다.
