# LLM Wiki Pattern

## Summary

LLM Wiki는 LLM이 지속적으로 관리하는 Markdown 기반 지식 베이스이다.

기존 RAG처럼 질문이 들어올 때마다 raw 문서 조각을 검색해 답변을 만드는 방식이 아니라, 새로운 자료가 들어올 때마다 LLM이 그 내용을 기존 Wiki에 통합한다.

이 프로젝트는 앞으로 RAG 인프라를 먼저 만드는 대신, LLM Wiki를 먼저 구축하는 방향으로 진행한다.

## Reference

이 방향은 Andrej Karpathy의 `llm-wiki` 아이디어를 참고한다.

- https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

## Core Idea

LLM Wiki의 핵심은 지식이 누적된다는 점이다.

일반적인 파일 업로드나 RAG 시스템에서는 질문할 때마다 관련 문서를 다시 찾고, 그때그때 답변을 조립한다.

LLM Wiki에서는 LLM이 자료를 읽고, 요약하고, 기존 문서에 반영하고, 관련 문서와 연결한다.

따라서 Wiki는 시간이 지날수록 더 정리되고, 더 연결되고, 더 유용해진다.

## Three Layers

### Raw Sources

원본 자료이다.

예시:

- 대화 원문
- 프로젝트 메모
- 외부 참고 문서
- 기사
- 회의 기록
- 실험 로그

Raw source는 가능한 수정하지 않는다.

### Wiki

LLM이 유지보수하는 Markdown 문서이다.

예시:

- 프로젝트 요약
- 개념 설명
- 인물/경력 문서
- 프롬프트 정리
- 결정사항
- 비교 문서

이 레이어가 포트폴리오 웹과 향후 챗봇의 중심 지식이 된다.

### Schema

LLM이 Wiki를 관리하는 규칙이다.

이 프로젝트에서는 `knowledge/LLM_WIKI_SCHEMA.md`가 그 역할을 한다.

## Operations

### Ingest

새로운 자료를 Wiki에 반영하는 작업이다.

예시:

1. 새로운 대화나 문서를 읽는다.
2. 핵심 정보와 결정사항을 추린다.
3. 관련 Wiki 문서를 찾는다.
4. 기존 문서를 업데이트한다.
5. 필요한 새 문서를 만든다.
6. 관련 링크와 요약을 갱신한다.
7. 변경 기록을 남긴다.

### Query

사용자의 질문에 답하는 작업이다.

질문이 들어오면 LLM은 raw source를 무작정 뒤지는 것이 아니라, 먼저 Wiki index와 관련 Wiki 문서를 읽는다.

문서에 없는 내용은 추측하지 않는다.

### Lint

Wiki의 건강 상태를 점검하는 작업이다.

확인할 것:

- 오래된 설명
- 서로 충돌하는 설명
- 출처가 약한 설명
- 연결되지 않은 문서
- 중복 문서
- 별도 문서가 필요한 중요한 개념

## Why This Project Uses It

AI Product Studio의 핵심 자산은 단순 코드가 아니다.

핵심 자산은 다음이다.

- AI와 나눈 대화
- 좋은 프롬프트
- 프로젝트 결정사항
- 개발 로그
- 실험 과정
- 개념 정리

이 자료들은 질문 시점에 검색해서 한 번 답하고 끝내기보다, Wiki에 계속 축적되는 편이 더 가치 있다.

## Difference From RAG

RAG는 여전히 나중에 사용할 수 있다.

하지만 이 프로젝트의 우선순위는 다르다.

먼저 LLM Wiki를 잘 만든다.

그 다음 필요해지면 Wiki를 더 잘 찾기 위한 검색 도구, embedding, vector search를 붙인다.

즉, RAG는 핵심 아키텍처가 아니라 선택 가능한 보조 도구이다.

## First Implementation Direction

초기 구현은 다음 흐름으로 진행했다.

1. LLM Wiki 관리 규칙을 만든다.
2. Wiki index와 log를 만든다.
3. 기존 문서를 LLM Wiki 구조에 맞게 정리한다.
4. 새 대화나 자료를 ingest하는 작업 흐름을 만든다.
5. Ask About Me mock flow가 Wiki를 읽고 관련 문서, draft answer, feedback candidate를 보여준다.

현재는 provider adapter-ready 상태이다.

Production은 mock mode를 유지하고, real LLM provider 검수는 Vercel Preview 같은 제한된 환경에서만 진행하는 방향으로 둔다.
