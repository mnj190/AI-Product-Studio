# RAG

## Summary

RAG는 Retrieval-Augmented Generation의 약자이다.

LLM이 답변을 생성하기 전에 관련 문서를 검색하고, 그 검색 결과를 바탕으로 답변하도록 만드는 방식이다.

## Why It Matters

일반 LLM은 조정민의 경력, 프로젝트, 프롬프트, 개발 로그를 기본적으로 알지 못한다.

따라서 Ask About Me Chatbot이 정확하게 답변하려면 포트폴리오 내부 문서를 검색해서 답변해야 한다.

## Planned Use in This Project

이 프로젝트에서는 `content/` 아래의 Markdown 문서를 RAG 데이터로 사용한다.

검색 대상:

- `content/about`
- `content/projects`
- `content/prompts`
- `content/logs`
- `content/ai-stack`
- `content/wiki`

## Basic Flow

1. Markdown 문서를 읽는다.
2. 문서를 적절한 크기로 나눈다.
3. 각 조각의 embedding을 만든다.
4. 질문이 들어오면 관련 문서 조각을 검색한다.
5. 검색 결과를 근거로 답변을 생성한다.
6. 답변에 사용한 출처를 표시한다.

## Answering Rule

챗봇은 문서에 있는 내용만 기반으로 답변한다.

문서에 없는 내용은 다음처럼 답변한다.

> 현재 위키 문서에는 해당 내용이 충분히 정리되어 있지 않습니다.

## Risks

- 원본 문서가 부정확하면 답변도 부정확해진다.
- 너무 긴 문서는 검색 품질을 떨어뜨릴 수 있다.
- 문서에 없는 내용을 모델이 추측할 수 있다.
- 민감한 정보가 문서에 들어가면 안 된다.

## First MVP Direction

처음부터 복잡한 RAG 시스템을 만들지 않는다.

먼저 Markdown 문서를 웹에서 탐색 가능하게 만들고, 이후 문서 로딩과 검색 구조를 붙인다.

