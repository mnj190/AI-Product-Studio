# LLM Wiki Schema

이 문서는 AI Product Studio에서 LLM Wiki를 유지보수할 때 따르는 작업 규칙이다.

이 방향은 Andrej Karpathy의 `llm-wiki` 아이디어를 참고한다.

참고 문서:

- https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

## Core Idea

이 프로젝트는 RAG 시스템을 먼저 구축하는 대신, LLM이 지속적으로 관리하는 Markdown Wiki를 먼저 만든다.

기존 RAG 방식은 질문이 들어올 때마다 raw 문서에서 관련 조각을 검색하고 답변을 만든다.

LLM Wiki 방식은 다르다.

새로운 자료나 대화가 생기면 LLM이 그것을 읽고, 기존 Wiki 문서에 통합한다.

즉, 지식은 매번 새로 조립되는 것이 아니라, Markdown Wiki 안에 누적되고 갱신된다.

## Three Layers

### 1. Raw Sources

원본 자료이다.

예시:

- 대화 원문
- 기사
- 문서
- 프로젝트 메모
- 회의 기록
- 외부 참고 자료

Raw Sources는 가능한 한 수정하지 않는다.

이 레이어는 출처와 원본성을 보존하기 위한 공간이다.

### 2. LLM Wiki

LLM이 유지보수하는 Markdown Wiki이다.

예시:

- 인물 페이지
- 프로젝트 페이지
- 개념 페이지
- 비교 문서
- 요약 문서
- 결정사항 문서
- 연결 관계 문서

이 레이어는 포트폴리오 웹사이트와 향후 챗봇의 핵심 지식 계층이다.

### 3. Schema

LLM이 Wiki를 어떻게 관리해야 하는지 알려주는 규칙이다.

이 문서가 그 역할을 한다.

Schema는 다음을 정의한다.

- 문서 구조
- 파일명 규칙
- 업데이트 방식
- 출처 기록 방식
- index/log 관리 방식
- 모순 처리 방식
- 질문 답변 방식

## Directory Direction

현재 프로젝트에서는 다음 구조를 사용한다.

```text
content/
├── about/
├── projects/
├── prompts/
├── logs/
├── ai-stack/
└── wiki/

knowledge/
├── LLM_WIKI_SCHEMA.md
├── LLM_WIKI_ARCHITECTURE.md
└── conversations/
```

초기에는 기존 `content/` 문서가 Wiki 역할을 한다.

나중에 raw source 관리가 필요해지면 다음 구조를 추가한다.

```text
raw/
├── conversations/
├── articles/
├── notes/
└── assets/
```

## Required Wiki Files

LLM Wiki가 커지면 다음 파일을 추가한다.

```text
content/wiki/index.md
content/wiki/log.md
```

### index.md

콘텐츠 중심 색인이다.

각 Wiki 문서를 다음 정보와 함께 정리한다.

- 문서 링크
- 한 줄 요약
- 카테고리
- 관련 문서
- 마지막 업데이트 날짜

질문에 답할 때는 먼저 `index.md`를 읽고, 관련 문서로 이동한다.

### log.md

시간순 변경 기록이다.

새 자료 ingest, 문서 업데이트, 질문 답변, lint 결과를 기록한다.

권장 포맷:

```md
## [2026-06-18] ingest | AI Portfolio Planning

- Source: `knowledge/conversations/2026-06-18-ai-portfolio-planning.md`
- Updated:
  - `content/projects/llm-wiki.md`
  - `content/wiki/llm-wiki-pattern.md`
- Notes: RAG 우선 전략에서 LLM Wiki 우선 전략으로 변경.
```

## Operations

### Ingest

새로운 source가 들어왔을 때 실행한다.

작업 순서:

1. source를 읽는다.
2. 핵심 정보와 결정사항을 추린다.
3. 기존 Wiki 문서 중 업데이트할 문서를 찾는다.
4. 필요한 새 Wiki 문서를 만든다.
5. 관련 문서 사이의 링크와 참조를 보강한다.
6. `index.md`가 있다면 갱신한다.
7. `log.md`가 있다면 변경 기록을 추가한다.

### Query

사용자가 질문했을 때 실행한다.

작업 순서:

1. `index.md`가 있으면 먼저 읽는다.
2. 관련 Wiki 문서를 찾는다.
3. 필요한 문서를 읽고 답변한다.
4. 문서에 없는 내용은 추측하지 않는다.
5. 답변 과정에서 유용한 새 정리가 생기면 Wiki 문서로 남길지 제안한다.

### Lint

주기적으로 Wiki 상태를 점검한다.

확인할 것:

- 오래된 주장
- 서로 충돌하는 설명
- 출처가 약한 설명
- 고립된 문서
- 중요한데 별도 문서가 없는 개념
- 연결이 부족한 문서
- 중복 문서

## Answering Rule

질문에 답할 때는 Wiki 문서를 우선한다.

Wiki에 없는 내용은 raw source를 확인하거나, 사용자에게 추가 자료가 필요하다고 말한다.

답변할 수 없는 경우:

> 현재 LLM Wiki에는 해당 내용이 충분히 정리되어 있지 않습니다.

## Maintenance Rule

LLM은 단순히 새 문서를 계속 추가하지 않는다.

새 정보가 들어오면 기존 문서를 갱신하고, 관련 문서와 연결하고, 필요한 경우 이전 설명을 수정한다.

목표는 문서 수를 늘리는 것이 아니라, 시간이 지날수록 더 쓸모 있는 Wiki를 만드는 것이다.

