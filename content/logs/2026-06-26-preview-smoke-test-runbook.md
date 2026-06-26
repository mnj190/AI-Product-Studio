# 2026-06-26 - Preview Smoke Test Runbook

## What I Did

Vercel Preview Deployment URL이 생긴 뒤 Ask About Me 상태를 안전하게 확인할 수 있는 smoke test 스크립트와 runbook을 추가했다.

이 작업은 실제 Vercel 계정, secret, 배포 상태를 변경하지 않는다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- Preview URL smoke test는 안전한 GET 요청만 보낸다.
- 질문 POST를 보내지 않아 real provider answer generation을 트리거하지 않는다.
- `/api/ask` metadata에서 mode와 rate limit 상태를 확인한다.
- real mode인데 memory rate limit이면 실패로 본다.
- real mode인데 `rateLimitProductionReady=false`이면 실패로 본다.
- `/ask/eval`과 Preview readiness Wiki 페이지가 열리는지 함께 확인한다.

## Code Added

- `scripts/check-ask-url.mjs`

## Code Updated

- `package.json`

## Documents Added

- `knowledge/VERCEL_PREVIEW_SMOKE_TEST_RUNBOOK.md`
- `content/wiki/vercel-preview-smoke-test-runbook.md`

## Documents Updated

- `README.md`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/index.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run check:ask-url -- --help
npm run check:preview-env
npm run build
```

결과:

- `npm run check:ask-url -- --help` 성공
- `npm run check:preview-env` 성공
- `npm run build` 성공
- 정적 페이지 62개 생성

추가로 로컬 dev server를 띄운 뒤 실제 URL smoke test를 실행했다.

```bash
npm run dev -- -H 127.0.0.1 -p 3001
npm run check:ask-url -- http://127.0.0.1:3001
```

결과:

- `GET /api/ask` 200
- `/ask/eval` 200
- `/wiki/vercel-preview-readiness-checklist` 200
- API metadata: `mode=mock`, `rateLimitStore=memory`, `realModeReady=false`
- smoke test 통과

Preview URL이 생긴 뒤에는 다음 명령으로 실제 URL을 확인한다.

```bash
npm run check:ask-url -- https://your-preview-url.vercel.app
```

## Next Step

- 실제 Vercel Preview Deployment 연결 여부를 사용자가 결정한다.
- Preview URL이 생기면 safe GET smoke test를 먼저 실행한다.
