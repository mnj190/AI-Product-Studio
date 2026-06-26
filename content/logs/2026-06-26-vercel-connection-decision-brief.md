# 2026-06-26 - Vercel Connection Decision Brief

## What I Did

Vercel 연결 여부를 결정하기 위한 Decision Brief를 추가했다.

실제 Vercel 계정, project, secret, 배포 상태는 변경하지 않았다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Official References Checked

- Vercel Environments
- Vercel Environment Variables
- Vercel Git deployments

## Decisions

- 실제 Vercel 연결은 사용자 결정 전까지 진행하지 않는다.
- 선택지를 Option A/B/C로 나눈다.
- 현재 추천은 Option B: Vercel 연결 + Production mock-only 배포이다.
- Option C인 Preview real mode 검수는 Upstash, Preview env var, smoke test, `/ask/eval` 수동 검수가 준비된 경우에만 진행한다.
- Production real mode는 여전히 켜지지 않는다.

## Documents Added

- `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
- `content/wiki/vercel-connection-decision-brief.md`

## Documents Updated

- `README.md`
- `knowledge/NEXT_ACTIONS.md`
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
- 정적 페이지 67개 생성
- `npm run check:preview-env` 성공
- 기본 로컬 상태: `ASK_API_MODE=mock`, `RATE_LIMIT_STORE=memory`

## Next Step

사용자가 Option A, B, C 중 하나를 선택한다.

- Option A: Vercel 연결 보류
- Option B: Vercel 연결 + Production mock-only 배포
- Option C: Vercel 연결 + Preview real mode 검수 준비
