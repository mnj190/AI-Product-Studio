# Vercel Preview Smoke Test Runbook

## Summary

Vercel Preview Smoke Test Runbook은 Ask About Me real mode를 Preview Deployment에서 검수할 때 따라가는 안전 점검 절차다.

핵심 원칙은 real provider 호출을 바로 테스트하기 전에, 먼저 안전한 GET 요청으로 배포 URL과 metadata를 확인하는 것이다.

Production은 이미 mock-only로 배포되어 있으며, 공유 기준 URL은 `https://ai-product-studio-psi.vercel.app/`이다.

## Smoke Test Command

Preview URL이 생기면 아래 명령을 실행한다.

```bash
npm run check:ask-url -- https://your-preview-url.vercel.app
```

이 명령은 다음만 확인한다.

- `GET /api/ask`
- `GET /ask/eval`
- `GET /wiki/vercel-preview-readiness-checklist`

질문을 POST하지 않으므로 provider answer generation을 트리거하지 않는다.

## What To Check

Preview real mode라면 metadata는 다음 상태여야 한다.

- `mode=real`
- `realModeReady=true`
- `rateLimitStore=upstash`
- `rateLimitProductionReady=true`

Preview mock mode라면 다음 상태도 정상이다.

- `mode=mock`
- `realModeReady=false`
- `rateLimitStore=memory`

## Stop Conditions

아래 상태에서는 Production 승격을 보류한다.

- `/api/ask`가 200이 아님
- real mode인데 `realModeReady=false`
- real mode인데 memory rate limit을 사용함
- `/ask/eval` 페이지가 열리지 않음
- blocked 또는 unknown 질문이 guard를 통과해 provider 호출로 이어짐

## Why It Matters

LLM 기능은 작은 설정 실수로도 비용, 품질, 보안 문제가 생길 수 있다.

그래서 이 프로젝트는 real mode를 켜기 전에 다음 순서를 따른다.

1. 로컬 readiness 확인
2. Preview URL smoke test
3. `/ask/eval` 샘플 질문 수동 검수
4. 결과 기록
5. Production 승격 여부는 별도 결정

## Related Files

- `knowledge/VERCEL_PREVIEW_SMOKE_TEST_RUNBOOK.md`
- `knowledge/VERCEL_PREVIEW_READINESS_CHECKLIST.md`
- `content/logs/2026-07-08-vercel-mock-production-deploy.md`
- `scripts/check-ask-url.mjs`
- `scripts/check-preview-env.mjs`
