# LLM Provider Adapter Design

이 문서는 Ask About Me API를 mock mode에서 real LLM provider mode로 전환할 때의 adapter 설계를 정의한다.

현재 기본값은 여전히 mock mode이다.

실제 외부 LLM API 호출은 `ASK_API_MODE=real`, `LLM_API_KEY`, `LLM_MODEL`이 모두 설정된 경우에만 허용한다.

## References

- OpenAI Text Generation guide: https://developers.openai.com/api/docs/guides/text?api-mode=responses
- OpenAI Production Best Practices: https://developers.openai.com/api/docs/guides/production-best-practices
- OpenAI Rate Limits guide: https://developers.openai.com/api/docs/guides/rate-limits

## Design Goals

- 기본 배포는 안전한 mock mode로 유지한다.
- provider 호출은 server route에서만 수행한다.
- LLM에는 Local Wiki Lookup 결과만 전달한다.
- 민감 정보 요청, 투자 권유성 요청, source 없는 질문은 provider 호출 전에 차단한다.
- provider 장애가 발생해도 문서 기반 draft answer로 fallback한다.
- provider 교체가 가능하도록 route와 provider 호출 코드를 분리한다.

## Files

- `lib/ask-config.ts`
- `lib/llm-provider.ts`
- `lib/rate-limit.ts`
- `app/api/ask/route.ts`

## Runtime Modes

### mock

```text
ASK_API_MODE=mock
```

외부 LLM API를 호출하지 않는다.

응답은 Local Wiki Lookup과 deterministic draft answer로 구성한다.

### real-not-configured

```text
ASK_API_MODE=real
LLM_API_KEY=
LLM_MODEL=
```

real mode가 요청되었지만 필수 설정이 없으므로 provider를 호출하지 않는다.

이 상태는 배포 설정 오류를 빠르게 발견하기 위한 중간 상태이다.

### real

```text
ASK_API_MODE=real
LLM_API_KEY=...
LLM_MODEL=...
```

다음 조건을 모두 통과하면 provider를 호출한다.

- 질문 길이 제한 통과
- rate limit 통과
- Local Wiki Lookup 결과 존재
- draft answer status가 `answered`
- 민감 정보 요청 아님
- 투자 권유성 질문 아님

## Request Flow

```text
browser
→ /api/ask
→ validate request
→ rate limit
→ local wiki lookup
→ answer guard
→ optional provider adapter
→ feedback candidate
→ JSON response
```

## Provider Contract

```ts
type LlmProviderAnswer = {
  status: "answered" | "unknown";
  answer: string;
  warnings: string[];
  provider: string;
  model: string;
};
```

Provider는 항상 실패 가능한 외부 의존성으로 본다.

실패 시 route는 500으로 터뜨리지 않고, warning과 함께 draft answer를 반환한다.

## OpenAI Adapter

초기 real provider는 OpenAI Responses API를 사용한다.

이유:

- text generation에 적합하다.
- instructions와 user input을 분리할 수 있다.
- server-side API route에서 호출하기 쉽다.

초기 요청은 다음 성격을 가진다.

- model: `LLM_MODEL`
- input: developer instruction + user question + source context
- max output: `LLM_MAX_OUTPUT_TOKENS`
- timeout: `LLM_TIMEOUT_MS`

## Prompt Boundary

LLM에 전달하는 developer instruction은 다음 원칙을 포함한다.

- 공개 포트폴리오 질문에만 답한다.
- 제공된 source context만 사용한다.
- source context가 부족하면 모른다고 답한다.
- secret, token, private operational detail을 공개하지 않는다.
- 투자 조언, 종목 추천, 수익 보장 답변을 하지 않는다.
- 한국어로 짧게 답한다.

## Fallback Rules

Provider 호출은 다음 경우 생략한다.

- mock mode
- real mode 설정 누락
- source 없음
- answer guard에서 blocked
- rate limit 초과

Provider 호출 후 다음 경우 draft answer로 fallback한다.

- timeout
- non-2xx response
- empty output
- JSON parse 또는 네트워크 오류

## Current Decision

현재는 adapter-ready 상태까지만 구현한다.

실제 배포에서 real mode를 켜는 결정은 다음이 준비된 뒤 한다.

- API key secret 설정
- model 선택
- 비용 모니터링
- public traffic rate limit
- 답변 품질 샘플 검수
