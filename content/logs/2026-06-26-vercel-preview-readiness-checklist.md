# 2026-06-26 - Vercel Preview Readiness Checklist

## What I Did

Ask About Me real mode를 실제 Vercel 계정에 연결하기 전, 로컬에서 Preview readiness를 점검할 수 있는 체크리스트와 스크립트를 추가했다.

이번 작업은 외부 배포 상태를 바꾸지 않는다.

Production은 계속 mock mode로 유지하고, Preview에서만 제한적으로 real mode를 검수한다는 기존 결정을 실행 가능한 준비 단계로 바꿨다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Official References Checked

- Vercel Environments
- Vercel Environment Variables

## Decisions

- 실제 Vercel project 연결과 secret 설정은 아직 하지 않는다.
- 먼저 로컬에서 `npm run check:preview-env`로 환경 변수 상태를 점검한다.
- 스크립트는 secret 값을 출력하지 않고 설정 여부만 보여준다.
- `VERCEL_ENV=production`에서 `ASK_API_MODE=real`인 상태는 hard stop으로 처리한다.
- `ASK_API_MODE=real`에는 provider config와 Upstash persistent rate limit store를 요구한다.
- 기본 로컬 mock mode는 provider credentials나 Upstash credentials가 없어도 성공으로 본다.

## Code Added

- `scripts/check-preview-env.mjs`

## Code Updated

- `package.json`

## Documents Added

- `knowledge/VERCEL_PREVIEW_READINESS_CHECKLIST.md`
- `content/wiki/vercel-preview-readiness-checklist.md`

## Documents Updated

- `README.md`
- `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/index.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run check:preview-env
npm run build
```

결과:

- `npm run check:preview-env` 성공
- 기본 로컬 상태에서 `ASK_API_MODE=mock`, `RATE_LIMIT_STORE=memory` 확인
- rate limit 기본값 `20 / 600000ms` 확인
- `npm run build` 성공
- 정적 페이지 60개 생성

## Next Step

- 실제 Vercel Preview Deployment 연결 여부를 사용자가 결정한다.
- 연결 전에는 체크리스트와 `npm run check:preview-env`를 기준으로 readiness를 확인한다.
