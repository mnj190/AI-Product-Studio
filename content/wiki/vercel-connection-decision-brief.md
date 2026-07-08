# Vercel Connection Decision Brief

## Summary

Vercel Connection Decision Brief는 AI Product Studio를 실제 배포 환경에 연결할지 판단하기 위한 의사결정 문서다.

핵심은 “바로 real LLM mode를 켜는 것”이 아니라, 공개 웹 URL과 안전한 mock mode, Preview 검수 흐름을 분리해서 선택하는 것이다.

2026-07-08 기준 선택 결과는 Option B다.

mock-only Production 배포는 완료되었고, 공개 URL은 `https://ai-product-studio-psi.vercel.app/`이다.

## Current State

- GitHub `main`은 최신 상태다.
- Vercel project는 `ai-vibe-project/ai-product-studio`에 연결되어 있다.
- Production URL은 `https://ai-product-studio-psi.vercel.app/`이다.
- Production real mode는 꺼져 있다.
- `/api/ask` 기본값은 mock mode다.
- Production smoke test는 `mode=mock`, `realModeReady=false`, `rateLimitStore=memory`로 통과했다.
- Preview readiness check가 준비되어 있다.
- Preview URL smoke test가 준비되어 있다.
- `/ask/eval`에서 Deployment Gates를 볼 수 있다.

## Options

### Option A. Defer Vercel connection

Vercel 연결을 보류하고 콘텐츠, UI, LLM Wiki 품질을 더 다듬는다.

이 선택은 가장 안전하다.

### Option B. Connect mock-only Production

Vercel에 GitHub repo를 연결하되 Production은 mock mode로만 배포한다.

이 선택은 공개 URL을 먼저 만들면서도 LLM API key와 비용 리스크를 피한다.

선택 결과는 Option B이며, mock-only Production 배포는 완료되었다.

상세 절차는 [Vercel Mock-only Production Runbook](./vercel-mock-production-runbook.md)을 따른다.

### Option C. Prepare Preview real mode

Vercel Preview 환경에만 real mode secret과 persistent rate limit store를 설정한다.

이 선택은 실제 LLM 답변 품질을 검수할 준비가 되었을 때만 진행한다.

## Recommended Path

Option B는 완료되었다.

- 포트폴리오 웹은 이미 공개 가능한 mock 상태다.
- Ask About Me는 외부 LLM 호출 없이도 흐름을 보여줄 수 있다.
- real mode는 Preview에서만 별도로 검수하면 된다.

다음 선택지는 공개 URL 공유 전 polish를 더 할지, Preview real mode 검수 준비로 갈지 결정하는 것이다.

## Decision Prompt

초기 의사결정에서는 다음처럼 선택했다.

```text
Option A로 가자. Vercel 연결은 보류하고 콘텐츠/UI를 더 다듬자.
```

```text
Option B로 가자. Vercel에 연결하되 Production은 mock mode로만 배포하자.
```

```text
Option C로 가자. Vercel Preview에서 real mode 검수까지 준비하자.
```

## Related Files

- `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
- `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`
- `content/logs/2026-07-08-vercel-mock-production-deploy.md`
- `knowledge/VERCEL_PREVIEW_READINESS_CHECKLIST.md`
- `knowledge/VERCEL_PREVIEW_SMOKE_TEST_RUNBOOK.md`
- `content/wiki/vercel-preview-readiness-checklist.md`
- `content/wiki/vercel-preview-smoke-test-runbook.md`
