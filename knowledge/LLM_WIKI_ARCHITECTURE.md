# LLM Wiki Architecture

## Background

기존 계획은 `content/` Markdown 문서를 나중에 RAG 데이터로 사용하고, 챗봇이 질문 시점에 관련 문서를 검색하는 방향이었다.

이제 목표를 수정한다.

우선순위는 RAG 인프라가 아니라 LLM Wiki이다.

이 방향은 Karpathy의 `llm-wiki` 패턴을 참고한다.

## Before

초기 방향:

```text
Markdown documents
→ chunks
→ embeddings
→ vector search
→ chatbot answer
```

이 방식은 나중에 사용할 수 있지만, 현재 단계의 핵심은 아니다.

## After

새 방향:

```text
raw sources
→ LLM ingest
→ maintained Markdown Wiki
→ index/log/schema
→ portfolio pages
→ later chatbot answers
```

핵심 차이는 지식이 매번 질문 시점에 새로 조립되는 것이 아니라, Wiki에 누적되고 갱신된다는 점이다.

## Why This Fits This Portfolio

이 포트폴리오의 핵심 자산은 코드만이 아니다.

핵심 자산은 다음이다.

- 프로젝트 아이디어
- 프롬프트
- AI와의 대화
- 의사결정
- 개발 로그
- 시행착오
- 개념 정리

이런 자료는 한 번 검색해서 답변하고 사라지는 것보다, 지속적으로 Wiki에 정리되는 편이 더 가치 있다.

## Implementation Direction

### Phase A. Wiki Foundation

- LLM Wiki Schema 작성
- Wiki index 작성
- Wiki log 작성
- 기존 RAG 문서를 LLM Wiki Pattern 문서로 변경
- raw source 관리 기준 정리

### Phase B. Wiki Maintenance Workflow

- 새 대화나 자료를 ingest하는 절차 만들기
- 문서 업데이트 규칙 정하기
- 문서 간 연결 규칙 정하기
- Wiki lint 체크리스트 만들기
- raw source 보존 정책 만들기

### Phase C. Web Integration

- Wiki index 페이지 개선
- 문서 간 관련 링크 표시
- 최근 업데이트된 Wiki 문서 표시
- Build Log와 Wiki 문서 연결

### Phase D. Ask About Me

- 처음부터 Vector DB를 붙이지 않는다.
- 우선 Wiki 문서와 index를 읽는 방식으로 답변한다.
- 규모가 커지면 검색 도구나 embedding 기반 검색을 검토한다.

## Search Policy

초기에는 `content/wiki/index.md`와 파일 기반 검색으로 충분하다.

검색 우선순위:

1. Wiki index
2. 관련 Wiki 문서
3. 관련 project/about/prompt/log 문서
4. raw source

Vector DB는 필수가 아니라 확장 옵션이다.

## Source Policy

Raw source와 Wiki 문서를 구분한다.

- Raw source: 가능한 수정하지 않는다.
- Wiki: LLM이 지속적으로 수정하고 관리한다.
- Log: 어떤 source가 어떤 Wiki 문서에 반영되었는지 기록한다.

## Success Criteria

LLM Wiki 전환이 성공한 상태:

- 프로젝트가 RAG 우선이 아니라 Wiki 우선 구조로 설명된다.
- `LLM_WIKI_SCHEMA.md`가 Wiki 관리 규칙 역할을 한다.
- `LLM_WIKI_INGEST_WORKFLOW.md`가 새 자료 반영 절차 역할을 한다.
- `LLM_WIKI_LINT_CHECKLIST.md`가 Wiki 건강 점검 기준 역할을 한다.
- `content/wiki`에 LLM Wiki 패턴 설명이 있다.
- `NEXT_ACTIONS.md`의 다음 작업이 Wiki 기반 Ask About Me 인터페이스 설계로 이어진다.
- Ask About Me Chatbot은 Wiki를 기반으로 하는 후속 기능으로 남는다.
