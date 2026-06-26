# Vercel Mock-only Production Runbook

## Summary

Vercel Mock-only Production Runbook은 AI Product Studio를 Vercel에 연결하되, Production에서는 Ask About Me real mode를 켜지 않는 배포 절차다.

이 선택은 Decision Brief의 Option B에 해당한다.

## Goal

공개 웹 URL을 만든다.

하지만 Production은 계속 mock mode로 유지한다.

## Why This Path

이 프로젝트는 이미 공개 가능한 정적 포트폴리오와 mock Ask 흐름을 갖고 있다.

따라서 먼저 공개 URL을 만들고, real LLM mode는 나중에 Preview에서 제한적으로 검수하는 것이 안전하다.

## Production Rules

Production에서는 다음을 유지한다.

- `ASK_API_MODE=mock`
- 외부 LLM provider 호출 없음
- `LLM_API_KEY` 없음
- Production real mode 전환 없음

## Smoke Test

Production URL이 생기면 아래 명령으로 확인한다.

```bash
npm run check:ask-url -- https://your-production-url.vercel.app
```

기대 상태:

- `mode=mock`
- `realModeReady=false`
- `rateLimitStore=memory`

mock-only Production에서는 `rateLimitProductionReady=false`도 허용된다.

## Hard Stops

아래 상태에서는 배포 검수를 중단한다.

- Production에서 `mode=real`
- Production에 `LLM_API_KEY` 설정
- `/ask`가 provider answer generation을 트리거
- `/ask/eval` 접근 불가

## Related Files

- `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`
- `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
- `content/wiki/vercel-connection-decision-brief.md`
- `scripts/check-ask-url.mjs`
- `scripts/check-preview-env.mjs`
