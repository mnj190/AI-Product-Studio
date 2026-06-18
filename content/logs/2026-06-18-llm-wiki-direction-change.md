# 2026-06-18 - LLM Wiki Direction Change

## What I Did

프로젝트의 지식 관리 방향을 RAG 우선에서 LLM Wiki 우선으로 변경했다.

Karpathy의 `llm-wiki` 패턴을 참고하여, raw 문서를 질문 시점에 매번 검색하는 구조보다 LLM이 지속적으로 유지보수하는 Markdown Wiki를 먼저 구축하는 방향으로 정리했다.

## AI Used

- Codex

## Prompts Used

사용자 요청:

> rag 대신 karpathy의 llm-wiki 문서를 참고해서 llm wiki를 구현하는 걸로 목표를 바꿔줘.

## Decisions

- RAG, embedding, vector search는 초기 핵심 아키텍처에서 제외한다.
- LLM Wiki를 먼저 구축한다.
- `knowledge/LLM_WIKI_SCHEMA.md`를 Wiki 관리 규칙 문서로 둔다.
- `content/wiki/index.md`를 콘텐츠 중심 색인으로 둔다.
- `content/wiki/log.md`를 시간순 변경 기록으로 둔다.
- Ask About Me 인터페이스는 LLM Wiki가 정리된 뒤 그 위에 얹는다.

## Documents Added

- `knowledge/LLM_WIKI_SCHEMA.md`
- `knowledge/LLM_WIKI_ARCHITECTURE.md`
- `content/wiki/llm-wiki-pattern.md`
- `content/wiki/index.md`
- `content/wiki/log.md`

## Documents Changed

- `content/wiki/rag.md`를 제거하고 `content/wiki/llm-wiki-pattern.md`로 대체했다.
- Roadmap, Tech Decisions, MVP Scope, Next Actions를 LLM Wiki 중심으로 수정했다.
- 프로젝트 문서와 프롬프트 문서의 RAG 중심 표현을 LLM Wiki 중심 표현으로 정리했다.

## Problems

기존 문서 곳곳에 RAG, embedding, vector search 표현이 흩어져 있었다.

프로젝트 방향이 혼동되지 않도록 기준 문서와 콘텐츠 문서를 함께 수정했다.

## Verification

다음 단계에서 `npm run build`로 Wiki 라우트가 새 파일명 기준으로 정상 생성되는지 확인한다.

## Next Step

- Wiki ingest workflow를 더 구체화한다.
- Wiki lint checklist를 만든다.
- Ask About Me 인터페이스가 Wiki index를 먼저 읽는 방식으로 설계한다.

