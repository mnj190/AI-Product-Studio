# Production Rate Limit Store

## Summary

Ask About Me의 production persistent rate limit store는 Upstash Redis via Vercel Marketplace를 1순위로 선택한다.

현재 로컬과 mock mode에서는 in-memory rate limit을 사용한다.

공개 real mode를 켜기 전에는 Redis 기반 persistent store로 전환해야 한다.

## Decision

선택:

- Upstash Redis via Vercel Marketplace

보류:

- Vercel KV라는 이름의 신규 store
- hosted database counter
- API gateway only limit

## Why

Vercel 문서 기준으로 Vercel KV는 더 이상 신규 프로젝트에서 직접 선택하는 방식이 아니다.

새 프로젝트는 Redis integration을 Marketplace에서 설치하는 방향이다.

Upstash Rate Limit은 serverless functions, Vercel, Vercel Edge, Next.js 같은 환경을 대상으로 하는 HTTP 기반 rate limiting library를 제공한다.

Ask About Me는 공개 endpoint이지만 초기 트래픽은 작고, provider 호출 비용 보호가 핵심이다.

따라서 Redis 기반 persistent rate limit은 충분히 작고 명확한 선택이다.

## Current Mode

현재 `.env.example` 기본값:

```text
RATE_LIMIT_STORE=memory
ASK_RATE_LIMIT_MAX_REQUESTS=20
ASK_RATE_LIMIT_WINDOW_MS=600000
```

production 전환 후보:

```text
RATE_LIMIT_STORE=upstash
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

## Current Code

관련 파일:

- `lib/rate-limit.ts`
- `lib/rate-limit-config.ts`
- `app/api/ask/route.ts`

`/api/ask`는 rate limit 결과와 store 상태를 response metadata로 반환한다.

## Next Step

다음 단계는 real mode를 제한적으로 켤 배포 환경을 결정하는 것이다.

우선 후보는 Vercel preview deployment이다.
