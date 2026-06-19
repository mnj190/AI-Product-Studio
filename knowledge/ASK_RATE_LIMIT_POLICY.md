# Ask Rate Limit Policy

이 문서는 `/api/ask`의 rate limit과 비용 제한 정책을 정의한다.

Ask About Me는 공개 포트폴리오에 노출될 수 있으므로, 실제 LLM provider를 호출하기 전 반드시 abuse와 비용 폭주를 막아야 한다.

## References

- OpenAI Rate Limits guide: https://developers.openai.com/api/docs/guides/rate-limits
- OpenAI Production Best Practices: https://developers.openai.com/api/docs/guides/production-best-practices

## Initial Policy

초기 정책:

```text
20 requests / 10 minutes / client key
```

현재 구현은 in-memory rate limit이다.

개발 및 초기 검증에는 충분하지만, serverless/edge production에서는 instance 간 공유되지 않을 수 있다.

## Client Key

우선순위:

1. `x-forwarded-for`
2. `x-real-ip`
3. `anonymous`

공개 배포에서는 hosting provider의 실제 IP 전달 방식을 확인해야 한다.

## Response On Limit

요청이 제한되면 다음 응답을 반환한다.

```http
429 Too Many Requests
Retry-After: <seconds>
```

응답 body에는 다음 정보를 포함한다.

- `status: "blocked"`
- `warnings`
- `rateLimit.limit`
- `rateLimit.remaining`
- `rateLimit.resetAt`

## Why Limit Mock Mode Too

현재 mock mode는 외부 비용이 없지만, route 자체가 public endpoint이기 때문에 mock mode에도 rate limit을 적용한다.

이유:

- real mode 전환 시 정책을 그대로 유지할 수 있다.
- scraping 또는 반복 호출을 초기에 줄일 수 있다.
- UI/API contract를 미리 안정화할 수 있다.

## Production Upgrade

공개 real mode 배포 전에는 in-memory limit을 다음 중 하나로 교체한다.

- Vercel KV / Redis
- Upstash Redis
- hosted database counter
- provider/API gateway rate limit

권장 production policy:

```text
anonymous visitor: 10 requests / 10 minutes
trusted/admin user: 60 requests / 10 minutes
daily provider budget cap: required
```

## Cost Controls

Rate limit 외에도 다음 제한을 함께 사용한다.

- 질문 최대 500자
- source 최대 5개
- source context 전체 `LLM_MAX_INPUT_CHARS`
- output token `LLM_MAX_OUTPUT_TOKENS`
- provider timeout `LLM_TIMEOUT_MS`
- source 없는 질문은 provider 호출 생략
- blocked 질문은 provider 호출 생략

## Current Decision

현재 구현은 adapter-ready 단계이다.

real mode를 공개로 켜기 전에는 persistent rate limit store와 비용 알림을 추가해야 한다.
