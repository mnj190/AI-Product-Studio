# 2026-06-18 - Mock Ask API Route

## What I Did

Ask About Me의 실제 LLM API 연동 전 단계로 mock `/api/ask` route를 만들었다.

이 route는 외부 LLM API를 호출하지 않고 Local Wiki Lookup, draft answer, feedback candidate를 JSON으로 반환한다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 실제 LLM API 연동은 아직 보류한다.
- 기본 모드는 `ASK_API_MODE=mock`으로 둔다.
- API Key는 `.env.local` 또는 hosting provider secret에만 저장한다.
- 공개 배포 전에는 rate limit과 비용 제한이 필요하다.
- `/api/ask`는 mock mode response contract를 먼저 안정화한다.

## Code Added

- `app/api/ask/route.ts`
- `.env.example`

## Documents Added

- `knowledge/LLM_API_SECURITY_POLICY.md`

## Documents Updated

- `README.md`
- `knowledge/LLM_ANSWER_API_DESIGN.md`
- `knowledge/NEXT_ACTIONS.md`
- `content/projects/ask-about-me-chatbot.md`
- `content/wiki/log.md`

## Verification

다음 단계에서 `npm run build`로 API route와 페이지가 정상 빌드되는지 확인한다.

## Next Step

- real LLM provider adapter 설계 여부 결정
- rate limit 정책 정리
- 또는 API 연동 전에 UI/콘텐츠 품질을 먼저 다듬기

