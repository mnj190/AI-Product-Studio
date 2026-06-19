# 2026-06-19 - Production Rate Limit Store Decision

## What I Did

Ask About Me의 production persistent rate limit store를 결정했다.

현재 in-memory rate limit은 local/mock mode용으로 유지하고, 공개 real mode를 켤 때는 Upstash Redis via Vercel Marketplace로 전환하는 방향으로 정리했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Official References Checked

- Vercel Redis documentation
- Upstash Rate Limit overview
- Upstash Rate Limit getting started
- Upstash Rate Limit features

## Decisions

- 신규 프로젝트 기준으로 `Vercel KV`라는 이름은 쓰지 않는다.
- production persistent store는 `Upstash Redis via Vercel Marketplace`를 1순위로 선택한다.
- 현재 코드는 `RATE_LIMIT_STORE=memory`를 기본값으로 유지한다.
- real mode 공개 전 `RATE_LIMIT_STORE=upstash`와 Upstash Redis credentials를 설정한다.
- hosted database counter는 현재 MVP에 DB가 없으므로 보류한다.
- API gateway rate limit은 나중에 보조 방어선으로 고려한다.

## Code Added

- `lib/rate-limit-config.ts`

## Code Updated

- `lib/rate-limit.ts`
- `app/api/ask/route.ts`
- `.env.example`

## Documents Added

- `knowledge/PRODUCTION_RATE_LIMIT_STORE_DECISION.md`
- `content/wiki/production-rate-limit-store.md`

## Documents Updated

- `knowledge/ASK_RATE_LIMIT_POLICY.md`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/index.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 production build를 확인했다.

```bash
npm run build
```

결과:

- build 성공
- 정적 페이지 54개 생성
- `/wiki/production-rate-limit-store` 상세 페이지 생성

로컬 개발 서버에서 다음을 확인했다.

- `GET /api/ask`: `rateLimitStore: "memory"`, `rateLimitProductionReady: false` 반환
- `POST /api/ask`: `rateLimit.store: "memory"`, `rateLimit.productionReady: false` 반환
- `/wiki/production-rate-limit-store`: Wiki 상세 문서 렌더링

## Next Step

- real mode 제한 배포 환경 결정
- Vercel preview deployment를 우선 후보로 검토
