# Wiki Log

## Summary

이 문서는 LLM Wiki의 시간순 변경 기록이다.

새 자료 ingest, Wiki 문서 수정, 구조 변경, lint 결과를 append-only 방식으로 기록한다.

## [2026-06-18] schema | LLM Wiki 방향 전환

- Source: Karpathy `llm-wiki` gist
- Reference: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Updated:
  - `knowledge/LLM_WIKI_SCHEMA.md`
  - `knowledge/LLM_WIKI_ARCHITECTURE.md`
  - `content/wiki/llm-wiki-pattern.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - RAG 인프라를 먼저 만드는 계획에서 LLM Wiki를 먼저 구축하는 계획으로 변경했다.
  - Vector DB와 embedding은 필수가 아니라, Wiki 규모가 커진 뒤 선택적으로 붙이는 보조 도구로 둔다.

## [2026-06-18] workflow | Raw Source and Maintenance Rules

- Source: 현재 프로젝트 작업 흐름
- Created:
  - `raw/README.md`
  - `raw/conversations/README.md`
  - `raw/articles/README.md`
  - `raw/notes/README.md`
  - `raw/assets/README.md`
  - `knowledge/RAW_SOURCE_POLICY.md`
  - `knowledge/LLM_WIKI_INGEST_WORKFLOW.md`
  - `knowledge/LLM_WIKI_LINT_CHECKLIST.md`
- Updated:
  - `knowledge/LLM_WIKI_SCHEMA.md`
  - `content/wiki/index.md`
  - `content/wiki/log.md`
- Notes:
  - raw source 보존 규칙, Wiki ingest 절차, Wiki lint 체크리스트를 추가했다.
  - 다음 단계는 Ask About Me 답변 기준과 질문형 인터페이스 설계이다.

## [2026-06-18] interface | Ask About Me Mock Page

- Source: 현재 프로젝트 작업 흐름
- Created:
  - `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`
  - `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`
  - `app/ask/page.tsx`
- Updated:
  - `app/layout.tsx`
  - `app/page.tsx`
  - `app/globals.css`
  - `content/projects/ask-about-me-chatbot.md`
  - `content/wiki/index.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `knowledge/ROADMAP.md`
- Notes:
  - 실제 LLM API를 붙이기 전, 예시 질문과 참고 문서를 보여주는 `/ask` mock 페이지를 만들었다.
  - 답변은 Wiki first, no guessing, source shown, safety 원칙을 따른다.
  - 다음 단계는 Local Wiki Lookup이다.
