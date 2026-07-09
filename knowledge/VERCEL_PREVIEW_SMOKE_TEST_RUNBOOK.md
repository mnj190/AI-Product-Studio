# Vercel Preview Smoke Test Runbook

이 문서는 Vercel Preview Deployment URL이 생긴 뒤, Ask About Me real mode를 안전하게 검수하는 실행 절차다.

Vercel project 연결과 mock-only Production 배포는 완료되었다.

Preview real mode secret 설정과 Preview 배포 실행은 사용자가 결정한 뒤 진행한다.

## Goal

Preview URL에서 다음을 확인한다.

- 배포 URL이 정상 응답한다.
- `/api/ask` metadata가 의도한 mode와 rate limit 상태를 보여준다.
- `/ask/eval` 평가 페이지가 접근 가능하다.
- Preview readiness Wiki 문서가 접근 가능하다.
- real mode가 켜졌다면 persistent rate limit store를 사용한다.

## Before You Start

먼저 로컬에서 readiness를 확인한다.

```bash
npm run check:preview-env
```

Preview real mode를 검수하려면 Vercel Preview 환경에 다음이 설정되어 있어야 한다.

- `ASK_API_MODE=real`
- `LLM_PROVIDER=openai`
- `LLM_MODEL`
- `LLM_API_KEY`
- `RATE_LIMIT_STORE=upstash`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `ASK_RATE_LIMIT_MAX_REQUESTS`
- `ASK_RATE_LIMIT_WINDOW_MS`

Production은 계속 `ASK_API_MODE=mock`이어야 한다.

Production public URL `https://ai-product-studio-psi.vercel.app/`는 mock-only smoke test를 통과한 상태여야 한다.

## Safe Automated Smoke Test

Preview URL이 생기면 다음 명령을 실행한다.

```bash
npm run check:ask-url -- https://your-preview-url.vercel.app
```

이 smoke test는 안전한 GET 요청만 보낸다.

- `GET /api/ask`
- `GET /ask/eval`
- `GET /wiki/vercel-preview-readiness-checklist`

질문을 POST하지 않기 때문에 real provider answer generation을 트리거하지 않는다.

## Expected Metadata

### Preview mock mode

아직 real mode를 켜지 않은 Preview라면 아래 상태도 정상이다.

```text
mode=mock
realModeReady=false
rateLimitStore=memory
```

### Preview real mode

real mode 검수 Preview라면 아래 상태여야 한다.

```text
mode=real
realModeReady=true
rateLimitStore=upstash
rateLimitProductionReady=true
```

`mode=real`인데 `rateLimitStore=memory`이면 실패로 본다.

## Manual Eval Flow

자동 smoke test가 통과하면 `/ask/eval`에서 샘플 질문을 수동 검수한다.

1. answerable sample을 확인한다.
2. blocked sample이 provider 호출 전 차단되는지 확인한다.
3. unknown sample이 모르는 것으로 처리되는지 확인한다.
4. feedback sample이 Wiki 개선 후보로 이어지는지 확인한다.
5. 답변이 source context를 벗어나지 않는지 확인한다.

## Stop Conditions

아래 중 하나라도 발생하면 Production 승격을 보류한다.

- Preview URL에서 `/api/ask`가 200이 아님
- real mode인데 `realModeReady=false`
- real mode인데 `rateLimitStore=memory`
- real mode인데 `rateLimitProductionReady=false`
- blocked 질문이 provider 호출까지 진행됨
- unknown 질문이 지어낸 답변으로 처리됨
- answerable 질문이 source context 없는 내용을 단정함

## After Smoke Test

검수 결과를 다음 중 하나로 기록한다.

- pass: Preview real mode가 제한 검수 기준을 통과했다.
- retry: 환경 변수나 provider 설정을 수정하고 다시 검수한다.
- rollback: Preview도 mock mode로 되돌린다.

결과는 Build Log 또는 Daily Digest에 남긴다.

기록할 때 secret 값은 절대 쓰지 않고, 설정 여부와 metadata 결과만 남긴다.

## Related Files

- `scripts/check-ask-url.mjs`
- `scripts/check-preview-env.mjs`
- `knowledge/VERCEL_PREVIEW_READINESS_CHECKLIST.md`
- `knowledge/ASK_REAL_MODE_EVALUATION.md`
- `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`
