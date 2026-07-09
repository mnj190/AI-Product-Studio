# Vercel Preview Readiness Checklist

이 문서는 Ask About Me real mode를 Vercel Preview Deployment에서만 제한적으로 켜기 전 확인할 체크리스트다.

Vercel project 연결과 mock-only Production 배포는 완료되었다.

이 문서는 다음 단계인 Preview real mode 검수를 시작하기 전, secret 입력과 Preview 배포를 안전하게 준비하기 위한 체크리스트다.

Preview secret 입력, Upstash 연결, real mode Preview 배포 실행은 사용자가 명시적으로 결정하기 전까지 하지 않는다.

## References

- Vercel Environments: https://vercel.com/docs/deployments/environments
- Vercel Environment Variables: https://vercel.com/docs/environment-variables

## Current Decision

- Production: `ASK_API_MODE=mock`
- Preview: 검수 목적일 때만 `ASK_API_MODE=real`
- Local: 기본값은 `ASK_API_MODE=mock`
- Current public Production URL: `https://ai-product-studio-psi.vercel.app/`

Vercel은 Local, Preview, Production 환경을 기본으로 제공하며, 환경별 environment variable을 다르게 둘 수 있다.

이 프로젝트는 그 분리를 이용해 Production은 안전한 mock 상태로 유지하고, Preview에서만 real mode를 검수한다.

## Local Readiness Command

로컬에서 아래 명령으로 현재 환경 변수가 preview real mode에 적합한지 확인한다.

```bash
npm run check:preview-env
```

이 명령은 secret 값을 출력하지 않는다.

출력하는 것은 다음 항목의 존재 여부와 위험 상태뿐이다.

- `VERCEL_ENV`
- `ASK_API_MODE`
- `LLM_PROVIDER`
- `LLM_MODEL`
- `LLM_API_KEY`
- `RATE_LIMIT_STORE`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `ASK_RATE_LIMIT_MAX_REQUESTS`
- `ASK_RATE_LIMIT_WINDOW_MS`

## Expected Local Result

기본 로컬 상태에서는 다음처럼 나오는 것이 정상이다.

```text
ASK_API_MODE=mock
RATE_LIMIT_STORE=memory
realModeReady=false
```

로컬 mock mode는 provider credentials나 Upstash credentials가 없어도 실패가 아니다.

## Preview Real Mode Requirements

Preview에서 real mode를 켜려면 다음이 필요하다.

- `VERCEL_ENV=preview`
- `ASK_API_MODE=real`
- `LLM_PROVIDER=openai`
- `LLM_MODEL=<selected-model>`
- `LLM_API_KEY=<preview-scoped-secret>`
- `RATE_LIMIT_STORE=upstash`
- `UPSTASH_REDIS_REST_URL=<preview-redis-url>`
- `UPSTASH_REDIS_REST_TOKEN=<preview-redis-token>`
- `ASK_RATE_LIMIT_MAX_REQUESTS=10`
- `ASK_RATE_LIMIT_WINDOW_MS=600000`

## Hard Stop Conditions

아래 상태는 실패로 본다.

- `VERCEL_ENV=production` 이면서 `ASK_API_MODE=real`
- `ASK_API_MODE=real`인데 `LLM_MODEL` 또는 `LLM_API_KEY`가 없음
- `ASK_API_MODE=real`인데 `RATE_LIMIT_STORE=upstash`가 아님
- `RATE_LIMIT_STORE=upstash`인데 Upstash Redis URL 또는 token이 없음

## Warning Conditions

아래 상태는 경고로 본다.

- `ASK_API_MODE=real`인데 `VERCEL_ENV=preview`가 아님
- rate limit 숫자 환경 변수가 없음

경고는 로컬 실험 중에는 허용할 수 있지만, Preview Deployment 검수 전에는 정리해야 한다.

## Manual Preview Checklist

Vercel Preview Deployment가 준비되면 다음을 수동으로 확인한다.

1. Vercel project가 GitHub repo와 연결되어 있다. 완료: `ai-vibe-project/ai-product-studio`
2. Production branch가 `main`인지 확인한다.
3. Production URL `https://ai-product-studio-psi.vercel.app/`가 mock mode smoke test를 통과한다.
4. Preview branch 또는 PR을 만든다.
5. Preview environment variables에만 real mode secret을 설정한다.
6. Production environment variables는 mock mode를 유지한다.
7. Upstash Redis integration이 연결되어 있다.
8. Preview URL에서 `GET /api/ask`를 확인한다.
9. `mode`, `realModeReady`, `rateLimitStore`, `rateLimitProductionReady` metadata를 확인한다.
10. `/ask/eval` 샘플 질문을 수동 검수한다.
11. blocked 질문이 provider 호출 전 차단되는지 확인한다.
12. unknown 질문이 provider 호출 전 unknown 처리되는지 확인한다.
13. answerable 질문이 source context를 벗어나지 않는지 확인한다.

## Vercel CLI Helpers

로컬 프로젝트는 Vercel CLI로 `ai-vibe-project/ai-product-studio`에 연결되어 있다.

프로젝트 연결 상태를 확인한다.

```bash
vercel project ls
```

Production environment variable이 비어 있거나 mock-only 상태인지 확인한다.

```bash
vercel env ls production
```

Preview environment variable 이름 목록만 확인한다. secret 값은 출력하지 않는다.

```bash
vercel env ls preview
```

## Do Not

- Production에서 바로 real mode를 켜지 않는다.
- API key를 Markdown, README, Build Log, GitHub에 기록하지 않는다.
- persistent rate limit 없이 공개 real mode를 켜지 않는다.
- `/ask/eval` 검수 없이 Production 승격을 결정하지 않는다.

## Next Step

다음 작업은 Preview real mode 검수를 진행할지 사용자가 결정하는 것이다.

그 전까지는 `npm run check:preview-env`, `npm run check:ask-url -- https://ai-product-studio-psi.vercel.app/`, 문서 체크리스트만 사용한다.
