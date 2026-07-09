# Vercel Preview Readiness Checklist

## Summary

Vercel Preview Readiness Checklist는 Ask About Me real mode를 Production에 바로 켜지 않고, Preview Deployment에서 먼저 검수하기 위한 준비 목록이다.

이 프로젝트의 원칙은 단순하다.

- Production은 `https://ai-product-studio-psi.vercel.app/`에서 계속 mock mode
- Preview에서만 제한적 real mode 검수
- secret은 공개 문서나 GitHub에 남기지 않음
- persistent rate limit 없이 real mode 공개 금지

## Why It Matters

LLM 기능은 API key 하나만 넣으면 쉽게 켤 수 있다.

하지만 공개 포트폴리오에서 중요한 것은 “동작한다”보다 “안전하게 운영할 수 있다”이다.

그래서 Ask About Me는 real mode를 켜기 전에 다음을 먼저 확인한다.

- 비용이 통제되는가?
- rate limit이 persistent store를 사용하는가?
- blocked 질문과 unknown 질문이 provider 호출 전에 처리되는가?
- Production에 실수로 real mode가 켜지지 않는가?
- `/ask/eval` 샘플 질문으로 품질을 검수했는가?

## Local Check

로컬에서는 아래 명령으로 환경 상태를 확인한다.

```bash
npm run check:preview-env
```

이 명령은 secret 값을 출력하지 않고, 설정 여부와 위험 상태만 보여준다.

기본 로컬 상태에서는 mock mode와 memory rate limit이 정상이다.

Production 공개 URL의 mock-only 상태는 아래 명령으로 확인한다.

```bash
npm run check:ask-url -- https://ai-product-studio-psi.vercel.app/
```

Vercel CLI 연결, Production/Preview env 이름 목록, 공개 URL smoke test를 함께 확인하려면 아래 명령을 사용한다.

```bash
npm run check:vercel
```

이 명령은 secret 값을 출력하지 않는다.

## Preview Requirements

Preview real mode에는 다음 설정이 필요하다.

- `ASK_API_MODE=real`
- `LLM_PROVIDER=openai`
- `LLM_MODEL`
- `LLM_API_KEY`
- `RATE_LIMIT_STORE=upstash`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- rate limit 숫자 설정

## Hard Stops

아래 상태에서는 real mode를 진행하지 않는다.

- Production에서 `ASK_API_MODE=real`
- real mode인데 `LLM_API_KEY` 또는 `LLM_MODEL`이 없음
- real mode인데 persistent rate limit store가 없음
- Upstash를 선택했는데 Redis URL 또는 token이 없음

## Related Files

- `knowledge/VERCEL_PREVIEW_READINESS_CHECKLIST.md`
- `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`
- `knowledge/ASK_REAL_MODE_EVALUATION.md`
- `knowledge/PRODUCTION_RATE_LIMIT_STORE_DECISION.md`
- `content/logs/2026-07-08-vercel-mock-production-deploy.md`
- `scripts/check-vercel.mjs`
- `scripts/check-preview-env.mjs`
