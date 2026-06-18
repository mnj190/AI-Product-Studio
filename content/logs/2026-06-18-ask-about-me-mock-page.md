# 2026-06-18 - Ask About Me Mock Page

## What I Did

LLM Wiki 기반 Ask About Me 인터페이스의 첫 단계를 구현했다.

이번 단계에서는 실제 LLM API를 붙이지 않고, `/ask` 페이지에서 예시 질문과 참고 문서 mapping을 보여주는 mock 인터페이스를 만들었다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 실제 LLM API 호출은 아직 하지 않는다.
- 먼저 답변 기준과 출처 정책을 문서화한다.
- `/ask` 페이지는 예시 질문, 답변 정책, 참고 문서 링크를 보여준다.
- 다음 단계는 Local Wiki Lookup이다.

## Documents Added

- `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`
- `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`

## Code Added

- `app/ask/page.tsx`

## Code Updated

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`

## Verification

다음 단계에서 `npm run build`로 `/ask` 페이지가 정상 정적 생성되는지 확인한다.

## Next Step

- Local Wiki Lookup 설계
- 질문 입력 UI 추가
- 질문과 관련된 Wiki/About/Project 문서 후보 표시

