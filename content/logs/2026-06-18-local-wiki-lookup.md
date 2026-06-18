# 2026-06-18 - Local Wiki Lookup

## What I Did

Ask About Me 인터페이스에 Local Wiki Lookup을 추가했다.

이제 `/ask` 페이지에서 질문을 입력하면 `content/` 아래 Markdown 문서 중 관련성이 높은 문서 후보를 보여준다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 실제 LLM 답변 생성은 아직 하지 않는다.
- 먼저 질문과 관련된 근거 문서를 찾는 lookup을 만든다.
- 검색 대상은 `content/wiki`, `content/about`, `content/projects`, `content/prompts`, `content/ai-stack`, `content/logs`로 둔다.
- 초기 검색은 keyword scoring으로 구현한다.
- Wiki 문서에 가장 높은 우선순위를 둔다.

## Code Added

- `lib/wiki-lookup.ts`

## Code Updated

- `lib/content.ts`
- `app/ask/page.tsx`
- `app/globals.css`

## Documents Added

- `knowledge/LOCAL_WIKI_LOOKUP_DESIGN.md`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`
- `content/projects/ask-about-me-chatbot.md`
- `content/wiki/log.md`

## Verification

다음 단계에서 `npm run build`로 `/ask` 페이지와 lookup 코드가 정상 빌드되는지 확인한다.

## Next Step

- LLM Answer API 설계
- 검색 결과를 LLM 프롬프트에 넘기는 형식 정의
- answer guard와 출처 표시 고도화

