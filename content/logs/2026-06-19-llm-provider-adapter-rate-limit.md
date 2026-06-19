# 2026-06-19 - LLM Provider Adapter and Rate Limit

## What I Did

Ask About Me API를 실제 LLM provider로 전환할 수 있도록 adapter-ready 구조로 정리했다.

기본값은 여전히 mock mode이며, 실제 외부 LLM API 호출은 `ASK_API_MODE=real`, `LLM_API_KEY`, `LLM_MODEL`이 모두 준비된 경우에만 가능하도록 했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Official References Checked

- OpenAI Text Generation guide
- OpenAI Rate Limits guide
- OpenAI Production Best Practices

## Decisions

- 실제 LLM 호출은 server route에서만 수행한다.
- 기본 배포는 mock mode로 유지한다.
- real mode가 요청되어도 API key 또는 model이 없으면 provider를 호출하지 않는다.
- provider 호출 전 Local Wiki Lookup, answer guard, rate limit을 먼저 통과해야 한다.
- provider 장애나 빈 답변은 draft answer fallback으로 처리한다.
- 초기 rate limit은 `20 requests / 10 minutes / client key`로 둔다.

## Code Added

- `lib/ask-config.ts`
- `lib/llm-provider.ts`
- `lib/rate-limit.ts`

## Code Updated

- `app/api/ask/route.ts`
- `app/ask/page.tsx`

## Documents Added

- `knowledge/LLM_PROVIDER_ADAPTER_DESIGN.md`
- `knowledge/ASK_RATE_LIMIT_POLICY.md`

## Documents Updated

- `.env.example`
- `knowledge/LLM_ANSWER_API_DESIGN.md`
- `knowledge/LLM_API_SECURITY_POLICY.md`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 production build를 확인했다.

```bash
npm run build
```

결과:

- build 성공
- 정적 페이지 49개 생성
- `/api/ask` dynamic route 유지

로컬 개발 서버에서 API 응답도 확인했다.

- `GET /api/ask`: `mode: "mock"`, `provider: "openai"`, `realModeReady: false`, limit metadata 반환
- `POST /api/ask`: Local Wiki Lookup, draft answer, feedback candidate, rateLimit metadata 반환
- 기본 mock mode에서는 외부 LLM API를 호출하지 않음

## Next Step

- real mode를 실제로 켤지 결정하기 전 비용/품질 샘플 기준을 만든다.
- production 배포 전 persistent rate limit store를 선택한다.
