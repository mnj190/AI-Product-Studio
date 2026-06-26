# 2026-06-26 - Vercel Mock-only Production Runbook

## What I Did

Option B를 선택했을 때 따라갈 Vercel mock-only Production 배포 runbook을 추가했다.

실제 Vercel 계정, project, secret, 배포 상태는 변경하지 않았다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- Option B는 Vercel 연결과 공개 URL 생성을 목표로 하되, Production real mode는 켜지 않는다.
- Production에는 `ASK_API_MODE=mock`만 유지한다.
- Production에는 `LLM_API_KEY`, `LLM_MODEL`, Upstash credentials를 넣지 않는다.
- 배포 후에는 `npm run check:ask-url -- <production-url>`로 safe smoke test를 실행한다.
- mock-only Production에서는 `rateLimitProductionReady=false`가 허용된다.

## Documents Added

- `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`
- `content/wiki/vercel-mock-production-runbook.md`

## Documents Updated

- `README.md`
- `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/vercel-connection-decision-brief.md`
- `content/wiki/index.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run build
npm run check:preview-env
```

결과:

- `npm run build` 성공
- 정적 페이지 70개 생성
- `npm run check:preview-env` 성공
- 기본 로컬 상태: `ASK_API_MODE=mock`, `RATE_LIMIT_STORE=memory`

## Next Step

사용자가 Option B를 선택하면 이 runbook에 따라 Vercel mock-only Production 배포를 진행한다.
