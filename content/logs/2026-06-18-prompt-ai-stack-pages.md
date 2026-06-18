# 2026-06-18 - Prompt Library and AI Stack Pages

## What I Did

Static Portfolio MVP에 Prompt Library와 AI Stack 섹션을 추가했다.

이제 `content/prompts`와 `content/ai-stack` 아래의 Markdown 문서를 웹에서 목록과 상세 페이지로 볼 수 있다.

## AI Used

- Codex

## Prompts Used

사용자 요청:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 기존 `projects`, `logs`, `wiki` 라우트 구조를 재사용했다.
- 콘텐츠 타입에 `prompts`, `ai-stack`을 추가했다.
- 프롬프트는 모든 대화를 저장하는 공간이 아니라, 재사용 가능한 좋은 프롬프트만 선별하는 공간으로 유지한다.
- AI Stack은 도구별 장단점보다 “언제 어떤 역할로 쓰는가”를 중심으로 작성한다.

## Documents Added

- `content/prompts/project-planning.md`
- `content/prompts/documentation.md`
- `content/prompts/code-review.md`
- `content/ai-stack/chatgpt.md`
- `content/ai-stack/codex.md`
- `content/ai-stack/claude.md`

## Routes Added

- `/prompts`
- `/prompts/[slug]`
- `/ai-stack`
- `/ai-stack/[slug]`

## Problems

현재 Markdown 렌더러는 MVP용 간단한 구현이다.

복잡한 Markdown 문법, 표, 링크, 중첩 리스트 등이 필요해지면 Markdown 렌더링 라이브러리나 MDX 도입을 검토해야 한다.

## Verification

다음 단계에서 `npm run build`로 전체 정적 페이지 생성 여부를 확인한다.

## Next Step

RAG 챗봇 준비를 위해 문서 청크 구조와 검색 API 후보를 설계한다.

