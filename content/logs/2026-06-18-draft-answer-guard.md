# 2026-06-18 - Draft Answer Guard

## What I Did

Ask About Me 인터페이스에 문서 기반 draft answer와 answer guard를 추가했다.

실제 외부 LLM API를 호출하지 않고, Local Wiki Lookup 결과를 기반으로 어떤 문서를 근거로 답변할 수 있는지 초안 형태로 보여준다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 외부 LLM API 연동 전 deterministic draft answer를 먼저 구현한다.
- 민감 정보 요청은 blocked로 처리한다.
- 투자 권유처럼 보이는 질문은 안전 문구로 제한한다.
- 관련 문서가 없으면 unknown으로 처리한다.
- `/ask` 페이지에는 답변 초안과 source context 후보를 함께 표시한다.

## Code Added

- `lib/answer-draft.ts`

## Code Updated

- `app/ask/page.tsx`
- `app/globals.css`

## Documents Added

- `knowledge/LLM_ANSWER_API_DESIGN.md`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`
- `content/projects/ask-about-me-chatbot.md`
- `content/wiki/log.md`

## Verification

다음 단계에서 `npm run build`로 `/ask`와 draft answer 코드가 정상 빌드되는지 확인한다.

## Next Step

- 질문/답변을 Wiki에 반영하는 feedback loop 설계
- 실제 LLM API 연동 여부 결정
- API 연동 시 필요한 환경 변수와 보안 정책 정리

