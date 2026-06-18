# Personal LLM Wiki

## Summary

조정민에 대한 정보를 Markdown 문서로 정리한 개인 지식 베이스이다.

이 문서들은 포트폴리오 페이지의 콘텐츠로 사용되고, 이후 Ask About Me Chatbot의 RAG 데이터로도 사용된다.

## Why I Built This

AI 챗봇이 좋은 답변을 하려면 먼저 좋은 원본 데이터가 필요하다.

개인 소개, 경력, 프로젝트, 프롬프트, 개발 로그를 한곳에 정리해두면 포트폴리오와 챗봇이 같은 지식을 공유할 수 있다.

## AI Usage

AI는 다음 작업에 활용된다.

- 문서 구조 설계
- 대화 요약
- 프로젝트 설명 초안 작성
- 프롬프트 정리
- 개발 로그 작성
- 누락된 정보 탐색

## Main Features

- About 문서
- Career 문서
- Project 문서
- Prompt Library
- Build Log
- AI Stack 문서
- Wiki 문서

## Tech Stack

초기에는 Markdown 파일과 Git을 사용한다.

웹사이트 구현 이후에는 Next.js에서 이 Markdown 문서를 읽어 페이지로 보여준다.

RAG 챗봇을 붙일 때는 문서를 청크 단위로 분리하고 검색 가능한 인덱스로 만든다.

## Prompt Examples

- 이 대화에서 3개월 뒤에도 가치 있는 내용을 추려줘.
- 이 프로젝트 문서를 RAG 데이터로 쓰기 좋게 정리해줘.
- 포트폴리오 방문자가 궁금해할 질문을 기준으로 문서를 보강해줘.

## Build Process

1. 저장할 정보의 기준을 정한다.
2. `knowledge/`와 `content/`를 분리한다.
3. 공개 가능한 콘텐츠를 `content/`에 작성한다.
4. 프로젝트 진행 중 생기는 대화와 결정을 로그로 남긴다.
5. 추후 챗봇이 참조할 수 있도록 문서를 계속 정리한다.

## Result

현재는 초기 문서 구조를 구축하는 단계이다.

## Lessons Learned

AI 프로젝트에서는 코드보다 컨텍스트 관리가 먼저 중요할 수 있다.

무엇을 만들지, 어떤 기준으로 만들지, 어떤 정보를 저장할지를 정리해야 이후 구현 속도가 빨라진다.

## Links

추후 추가 예정.

