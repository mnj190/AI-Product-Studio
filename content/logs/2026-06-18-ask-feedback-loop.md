# 2026-06-18 - Ask Feedback Loop

## What I Did

Ask About Me 인터페이스에 Wiki feedback candidate를 추가했다.

이제 사용자가 질문하면 관련 문서 lookup, draft answer에 이어 이 질문을 Wiki에 반영할 가치가 있는지 후보를 보여준다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 모든 질문을 저장하지 않는다.
- 민감 정보 요청과 투자 권유성 질문은 저장하지 않는다.
- 좋은 질문은 기존 문서 update, 새 Wiki 문서 create, Prompt Library 추가, Build Log 추가 후보로 분류한다.
- 현재 단계에서는 자동 파일 수정 버튼을 만들지 않는다.
- 먼저 추천 action, target path, next step만 보여준다.

## Code Added

- `lib/feedback-candidate.ts`

## Code Updated

- `app/ask/page.tsx`
- `app/globals.css`

## Documents Added

- `knowledge/ASK_FEEDBACK_LOOP_DESIGN.md`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`
- `content/projects/ask-about-me-chatbot.md`
- `content/wiki/log.md`

## Verification

다음 단계에서 `npm run build`로 feedback candidate 코드와 `/ask` 페이지가 정상 빌드되는지 확인한다.

## Next Step

- 실제 LLM API 연동 여부 결정
- API 연동 시 환경 변수와 보안 정책 정리
- 필요하면 mock answer에서 real answer로 전환하는 단계를 설계한다.

