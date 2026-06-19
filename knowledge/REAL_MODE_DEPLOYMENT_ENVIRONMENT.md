# Real Mode Deployment Environment

이 문서는 Ask About Me의 real LLM mode를 처음 켤 배포 환경을 결정한다.

## Decision

첫 real mode는 `Vercel Preview Deployment`에서만 켠다.

Production deployment에서는 계속 mock mode를 유지한다.

## References

- Vercel Environments: https://vercel.com/docs/deployments/environments
- Vercel Environment Variables: https://vercel.com/docs/environment-variables

## Why Preview First

Vercel Preview Environment는 production site에 영향을 주지 않고 live setting에서 변경을 테스트하기 위한 환경이다.

Vercel은 기본적으로 다음 경우 preview deployment를 만든다.

- production branch가 아닌 branch에 push
- pull request 생성
- `vercel` CLI를 `-prod` 없이 실행

Preview deployment는 자동 생성 URL을 갖기 때문에 제한된 검수에 적합하다.

## Environment Strategy

### Production

Production은 공개 포트폴리오 기본 환경이다.

```text
ASK_API_MODE=mock
RATE_LIMIT_STORE=memory
```

Production에서는 외부 LLM provider를 호출하지 않는다.

### Preview

Preview는 real mode 후보를 검수하는 제한 환경이다.

```text
ASK_API_MODE=real
LLM_PROVIDER=openai
LLM_MODEL=<selected-model>
LLM_API_KEY=<preview-scoped-secret>
RATE_LIMIT_STORE=upstash
UPSTASH_REDIS_REST_URL=<preview-redis-url>
UPSTASH_REDIS_REST_TOKEN=<preview-redis-token>
ASK_RATE_LIMIT_MAX_REQUESTS=10
ASK_RATE_LIMIT_WINDOW_MS=600000
```

Preview real mode는 샘플 질문 검수와 비용 확인 용도로만 사용한다.

### Development

Local development는 mock mode를 기본으로 유지한다.

```text
ASK_API_MODE=mock
RATE_LIMIT_STORE=memory
```

필요하면 `.env.local`에서만 임시 real mode를 실험할 수 있지만, 기본 개발 흐름으로 삼지 않는다.

## Preview Activation Checklist

Preview real mode를 켜기 전 다음을 완료한다.

- GitHub repo와 Vercel project 연결
- production branch가 `main`인지 확인
- preview branch 생성
- Preview environment variable에만 `ASK_API_MODE=real` 설정
- Preview environment variable에만 `LLM_API_KEY` 설정
- Preview environment variable에만 `LLM_MODEL` 설정
- Upstash Redis integration 연결
- Preview environment variable에 `RATE_LIMIT_STORE=upstash` 설정
- Preview deployment URL에서 `/api/ask` GET 확인
- `/api/ask` metadata가 `mode: "real"` 또는 `real-not-configured`로 의도대로 표시되는지 확인
- `/api/ask` metadata가 `rateLimitStore: "upstash"`로 표시되는지 확인
- `/ask/eval` 샘플 질문을 수동 검수
- blocked 질문이 provider 호출 없이 차단되는지 확인
- unknown 질문이 provider 호출 없이 unknown 처리되는지 확인
- answerable 질문이 source context를 벗어나지 않는지 확인

## Promotion Rule

Preview real mode를 곧바로 Production real mode로 승격하지 않는다.

Production real mode 전환은 별도 결정으로 다룬다.

Production real mode로 가려면 다음이 추가로 필요하다.

- 비용 알림 설정 완료
- persistent rate limit production 환경 검증
- 최소 20개 이상 real answer sample 검수
- blocked/unknown guard 재검증
- provider 장애 fallback 검증
- 공개 안내 문구 점검

## Current Recommendation

다음 구현 단계는 배포 연결이 아니라 `deployment checklist`를 README와 Wiki에 노출하고, preview 환경에서 검증할 명령/URL 체크를 준비하는 것이다.
