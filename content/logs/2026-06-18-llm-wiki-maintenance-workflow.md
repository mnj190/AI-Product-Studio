# 2026-06-18 - LLM Wiki Maintenance Workflow

## What I Did

LLM Wiki를 실제로 운영하기 위한 유지보수 흐름을 추가했다.

이번 작업에서는 raw source 보관 구조, raw source 정책, ingest workflow, Wiki lint checklist를 만들었다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

이전 결정:

> RAG 대신 Karpathy의 LLM Wiki 문서를 참고해서 LLM Wiki를 구현하는 것으로 목표를 변경한다.

## Decisions

- `raw/` 폴더는 원본 자료 보존 레이어로 사용한다.
- `content/` 폴더는 웹에 공개되는 Wiki/포트폴리오 콘텐츠 레이어로 사용한다.
- raw source는 의미가 바뀌도록 수정하지 않는다.
- LLM은 raw source를 읽고 기존 Wiki 문서에 통합한다.
- Wiki lint는 stale claim, contradiction, orphan page, weak source, duplicate content, security 문제를 점검한다.

## Documents Added

- `raw/README.md`
- `raw/conversations/README.md`
- `raw/articles/README.md`
- `raw/notes/README.md`
- `raw/assets/README.md`
- `knowledge/RAW_SOURCE_POLICY.md`
- `knowledge/LLM_WIKI_INGEST_WORKFLOW.md`
- `knowledge/LLM_WIKI_LINT_CHECKLIST.md`

## Documents Updated

- `README.md`
- `knowledge/LLM_WIKI_SCHEMA.md`
- `knowledge/LLM_WIKI_ARCHITECTURE.md`
- `knowledge/NEXT_ACTIONS.md`
- `knowledge/ROADMAP.md`
- `content/wiki/index.md`
- `content/wiki/log.md`

## Problems

아직 Ask About Me 답변 기준과 실제 질문형 인터페이스는 만들지 않았다.

이제 Wiki 유지보수 구조가 생겼으므로 다음 단계에서 답변 기준과 UI/API 설계를 진행할 수 있다.

## Verification

다음 단계에서 `npm run build`로 새 문서와 Wiki 페이지가 정상 렌더링되는지 확인한다.

## Next Step

- Ask About Me 답변 기준 문서 작성
- Wiki 기반 질문형 인터페이스 설계
- 필요하면 `/ask` 페이지 또는 mock Q&A 페이지 추가

