# Ask About Me Chatbot

## Summary

방문자가 조정민에 대해 질문할 수 있는 포트폴리오 챗봇이다.

챗봇은 LLM이 지속적으로 관리하는 Markdown Wiki를 기반으로 답변한다.

## Why I Built This

일반적인 포트폴리오는 방문자가 정해진 메뉴를 따라 읽어야 한다.

이 프로젝트에서는 방문자가 궁금한 내용을 직접 질문하고, 필요한 정보를 대화형으로 탐색할 수 있게 만들고자 한다.

## AI Usage

챗봇은 다음 문서를 우선 지식 계층으로 사용한다.

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
- LLM Wiki
- Wiki index
- Wiki log
- OpenAI API 또는 호환 LLM API
- 선택적 검색 도구

## Prompt Examples

예상 질문:

- 조정민은 어떤 개발자인가요?
- 어떤 프로젝트를 했나요?
- ORIS 프로젝트는 무엇인가요?
- AI를 어떻게 활용하나요?
- 자동매매봇은 어떻게 만들었나요?

## Build Process

1. 포트폴리오 지식 문서를 Markdown으로 정리한다.
2. LLM Wiki index와 log를 만든다.
3. 새 자료를 Wiki에 반영하는 ingest workflow를 만든다.
4. 질문이 들어오면 Wiki index와 관련 문서를 먼저 읽는다.
5. 답변에 사용된 문서 출처를 함께 보여준다.
6. 모르는 내용은 추측하지 않도록 제한한다.

## Result

초기 mock 인터페이스를 구현했다.

현재 `/ask` 페이지에서는 예시 질문과 참고 문서를 보여준다.

실제 LLM API 호출은 아직 붙이지 않았다.

다음 단계는 질문 입력을 받아 LLM Wiki 관련 문서를 찾아주는 Local Wiki Lookup이다.

## Lessons Learned

챗봇의 품질은 모델보다 Wiki 문서의 품질에 크게 의존한다.

먼저 좋은 문서 구조와 명확한 기준을 만드는 것이 중요하다.

## Links

- `/ask`
- `/wiki/index`
- `/wiki/llm-wiki-pattern`
