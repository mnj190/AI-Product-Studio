# 2026-06-18 - Home and Ask UI Polish

## What I Did

홈과 `/ask` 페이지의 화면 흐름을 다듬었다.

기능은 이미 많이 붙었지만, 방문자가 현재 상태와 작동 방식을 한눈에 이해하기 어려울 수 있어서 상태 카드, 작동 흐름, mock mode 안내를 추가했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 실제 LLM API 연동 전에는 화면/콘텐츠 품질을 먼저 다듬는다.
- 홈에서 현재 구현 상태를 보여준다.
- `/ask`에서 Lookup, Draft, Guard, Feedback 단계를 명확히 보여준다.
- `/api/ask`는 GET 요청에도 설명 JSON을 반환해 링크가 깨지지 않게 한다.

## Code Updated

- `app/page.tsx`
- `app/ask/page.tsx`
- `app/api/ask/route.ts`
- `app/globals.css`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 단계에서 `npm run build`로 UI 변경과 API route가 정상 빌드되는지 확인한다.

## Next Step

- 프로젝트/위키 상세 페이지 읽기 경험 개선
- 이후 real LLM provider adapter와 rate limit 정책 설계 여부 결정

