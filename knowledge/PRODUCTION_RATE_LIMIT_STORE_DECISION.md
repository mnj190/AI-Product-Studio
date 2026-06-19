# Production Rate Limit Store Decision

이 문서는 Ask About Me의 production persistent rate limit store 결정을 기록한다.

## Decision

production persistent rate limit store는 `Upstash Redis via Vercel Marketplace`를 1순위로 선택한다.

현재 코드는 기본 `memory` store를 유지한다.

공개 real mode를 켜기 전 다음 환경 변수로 `upstash` store를 활성화한다.

```text
RATE_LIMIT_STORE=upstash
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

## Why Upstash Redis

### 1. Vercel KV는 새 프로젝트 기준 선택지가 아니다

Vercel 문서 기준으로 Vercel KV는 더 이상 신규로 사용할 수 없고, 새 프로젝트는 Marketplace Redis integration을 설치하는 흐름으로 바뀌었다.

따라서 문서와 코드에서는 `Vercel KV`라는 이름보다 `Redis via Vercel Marketplace` 또는 `Upstash Redis`를 사용한다.

Reference:

- https://vercel.com/docs/redis

### 2. Upstash Rate Limit은 serverless/edge 환경에 맞다

Upstash Rate Limit 문서는 HTTP 기반 connectionless rate limiting library로 설명하며, Vercel, Vercel Edge, Next.js, serverless functions 같은 환경을 대상으로 한다.

Reference:

- https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
- https://upstash.com/docs/redis/sdks/ratelimit-ts/gettingstarted

### 3. 이 프로젝트의 요구사항과 맞다

Ask About Me는 다음 특성을 가진다.

- 공개 포트폴리오 endpoint
- 낮은 트래픽 예상
- provider 호출 비용 보호 필요
- IP 또는 visitor 단위 제한 필요
- server route에서 작동
- real mode 전환 전 최소 인프라만 필요

Upstash Redis는 이 요구에 비해 과하지 않고, Vercel 배포와 환경 변수 연결이 쉽다.

## Compared Options

### In-memory

장점:

- 의존성 없음
- 로컬 개발과 mock mode에 충분
- 빠름

단점:

- serverless instance 간 공유되지 않는다.
- cold start와 scale out에 취약하다.
- production real mode 보호 장치로는 부족하다.

결론:

- local/mock only

### Upstash Redis via Vercel Marketplace

장점:

- serverless/edge 친화적
- Redis REST URL/token 기반으로 연결 가능
- Vercel 환경 변수 주입 흐름과 맞음
- rate limit analytics와 dashboard를 사용할 수 있음

단점:

- 외부 서비스 계정/비용이 생긴다.
- 배포 환경 설정이 필요하다.

결론:

- production real mode 1순위

### Hosted database counter

장점:

- 이미 DB를 쓰는 서비스라면 단순할 수 있다.

단점:

- 현재 포트폴리오 MVP에는 DB가 없다.
- rate limit만 위해 DB를 붙이는 것은 과하다.

결론:

- 지금은 보류

### Provider/API Gateway limit

장점:

- 앱 코드 밖에서 막을 수 있다.
- bot/firewall 정책과 연결하기 쉽다.

단점:

- 앱 레벨 사용자별 응답 metadata와 연결하기 어렵다.
- provider 호출 전 비용 gate로 세밀하게 쓰기 어렵다.

결론:

- 나중에 보조 방어선으로 고려

## Current Code State

현재 파일:

- `lib/rate-limit.ts`
- `lib/rate-limit-config.ts`
- `app/api/ask/route.ts`

현재 동작:

- `RATE_LIMIT_STORE=memory`가 기본값이다.
- `/api/ask` GET 응답에 rate limit store와 production readiness가 표시된다.
- `/api/ask` POST 응답에 rateLimit metadata가 포함된다.
- `RATE_LIMIT_STORE=upstash`를 설정해도 credentials가 없으면 production-ready로 보지 않는다.

## Production Activation Checklist

real mode를 공개로 켜기 전 다음을 완료한다.

- Vercel 프로젝트 생성 또는 연결
- Vercel Marketplace에서 Upstash Redis integration 설치
- `UPSTASH_REDIS_REST_URL` 설정
- `UPSTASH_REDIS_REST_TOKEN` 설정
- `RATE_LIMIT_STORE=upstash` 설정
- preview 환경에서 `/api/ask` GET metadata 확인
- blocked/unknown/answerable eval sample 재확인
- 비용 알림 설정

## Current Recommendation

지금은 `memory` store를 유지한다.

real mode 제한 배포를 시작할 때 `Upstash Redis via Vercel Marketplace`로 전환한다.
