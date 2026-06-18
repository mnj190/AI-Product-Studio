# Ask About Me Chatbot

## Summary

방문자가 조정민에 대해 질문할 수 있는 포트폴리오 챗봇이다.

챗봇은 Markdown으로 정리된 개인 위키와 프로젝트 문서를 기반으로 답변한다.

## Why I Built This

일반적인 포트폴리오는 방문자가 정해진 메뉴를 따라 읽어야 한다.

이 프로젝트에서는 방문자가 궁금한 내용을 직접 질문하고, 필요한 정보를 대화형으로 탐색할 수 있게 만들고자 한다.

## AI Usage

챗봇은 다음 문서를 검색 대상으로 사용한다.

- content/about
- content/projects
- content/prompts
- content/logs
- content/ai-stack
- content/wiki

답변은 문서 기반으로만 생성한다.

문서에 없는 내용은 추측하지 않고, 현재 위키 문서에 충분히 정리되어 있지 않다고 안내한다.

## Main Features

- 조정민 소개 질의응답
- 경력 및 프로젝트 질의응답
- AI 활용 방식 질의응답
- 프롬프트 및 개발 로그 탐색
- 문서 기반 답변
- 답변 불가 시 명확한 한계 고지

## Tech Stack

초기 구현 후보:

- Next.js
- TypeScript
- Markdown 또는 MDX
- Embedding
- Vector Store
- OpenAI API 또는 호환 LLM API
- RAG Pipeline

## Prompt Examples

예상 질문:

- 조정민은 어떤 개발자인가요?
- 어떤 프로젝트를 했나요?
- ORIS 프로젝트는 무엇인가요?
- AI를 어떻게 활용하나요?
- 자동매매봇은 어떻게 만들었나요?

## Build Process

1. 포트폴리오 지식 문서를 Markdown으로 정리한다.
2. 문서를 청크 단위로 분리한다.
3. Embedding을 생성한다.
4. 검색 결과를 기반으로 답변을 생성한다.
5. 답변에 사용된 문서 출처를 함께 보여준다.
6. 모르는 내용은 추측하지 않도록 제한한다.

## Result

아직 구현 전 단계이다.

현재는 챗봇이 참조할 원본 문서를 먼저 구축하고 있다.

## Lessons Learned

챗봇의 품질은 모델보다 원본 문서의 품질에 크게 의존한다.

먼저 좋은 문서 구조와 명확한 기준을 만드는 것이 중요하다.

## Links

추후 추가 예정.

