# Ask About Me Interface Design

이 문서는 Ask About Me 인터페이스의 초기 설계를 정의한다.

## Goal

방문자가 조정민의 경력, 프로젝트, AI 활용 방식, 프롬프트, 개발 로그에 대해 질문할 수 있는 인터페이스를 만든다.

초기에는 실제 LLM API를 붙이지 않고, LLM Wiki 기반 답변 기준과 예시 질문을 보여주는 mock 인터페이스부터 만든다.

## Design Principle

Ask About Me는 단순 챗봇 UI가 아니다.

이 인터페이스는 LLM Wiki의 가치를 보여주는 입구이다.

사용자는 정해진 메뉴를 읽는 대신, 궁금한 질문에서 출발해 관련 문서로 이동할 수 있어야 한다.

## Phased Implementation

### Phase 1. Static Ask Page

목표:

- `/ask` 페이지를 만든다.
- 예시 질문을 보여준다.
- 각 질문이 어떤 Wiki 문서를 참고하는지 보여준다.
- 아직 실제 답변 생성은 하지 않는다.

완료 기준:

- 방문자가 어떤 질문을 할 수 있는지 이해한다.
- LLM Wiki 기반 답변 구조가 드러난다.
- 관련 문서 링크로 이동할 수 있다.

### Phase 2. Local Wiki Lookup

목표:

- 질문을 입력하면 로컬 Markdown 문서에서 관련 문서를 찾는다.
- 간단한 키워드 검색 또는 index 기반 검색으로 시작한다.
- 답변 생성 없이 관련 문서 후보를 보여준다.

완료 기준:

- 질문에 대해 관련 Wiki/About/Project 문서를 추천한다.
- 검색 결과가 출처와 함께 표시된다.

현재 상태:

- 구현 완료.
- `/ask?q=...` 형태로 질문을 입력하면 관련 문서 후보를 보여준다.
- 아직 답변 생성은 하지 않는다.

### Phase 3. LLM Answer API

목표:

- LLM API를 붙여 Wiki 기반 답변을 생성한다.
- `ASK_ABOUT_ME_ANSWER_POLICY.md`를 시스템 지침으로 사용한다.
- 답변 출처를 함께 표시한다.

완료 기준:

- 답변은 Wiki 문서 기반으로 생성된다.
- 모르는 내용은 추측하지 않는다.
- 답변에 사용한 문서를 표시한다.

현재 상태:

- API 호출 전 단계의 설계와 deterministic draft answer 구현 완료.
- `/ask` 페이지에서 source context 후보와 답변 초안을 보여준다.
- 실제 외부 LLM API 호출은 아직 하지 않는다.

### Phase 4. Wiki Feedback Loop

목표:

- 좋은 질문과 답변을 Wiki에 반영할 수 있게 한다.
- 반복 질문을 통해 Wiki가 더 풍부해지도록 만든다.

완료 기준:

- 유용한 답변은 Build Log 또는 Wiki 문서로 남길 수 있다.
- 질문이 새로운 문서 작성 후보로 이어진다.

현재 상태:

- 설계 완료.
- `/ask` 페이지에서 feedback candidate를 보여준다.
- 아직 자동 파일 수정이나 저장은 하지 않는다.

## Page Layout

`/ask` 페이지의 초기 구성:

1. Hero
   - “조정민에 대해 질문해보세요”
   - 현재는 LLM Wiki 기반 mock 인터페이스라는 설명

2. Example Questions
   - 조정민은 어떤 개발자인가요?
   - 어떤 프로젝트를 했나요?
   - ORIS 프로젝트는 무엇인가요?
   - AI를 어떻게 활용하나요?
   - LLM Wiki는 무엇인가요?
   - 자동매매봇은 어떻게 만들었나요?

3. Answer Policy
   - 문서 기반 답변
   - 모르면 모른다고 답변
   - 출처 표시
   - 민감 정보 비공개

4. Source Map
   - 질문별 참고 문서 목록

5. Next Step
   - 로컬 Wiki 검색
   - LLM API 연동
   - 답변을 Wiki에 반영하는 workflow

## Source Map

| Question | Primary Sources |
| --- | --- |
| 조정민은 어떤 개발자인가요? | `content/about/about-me.md`, `content/about/career.md`, `content/about/skills.md` |
| 어떤 프로젝트를 했나요? | `content/projects/*.md`, `content/wiki/index.md` |
| ORIS 프로젝트는 무엇인가요? | `content/about/career.md` |
| AI를 어떻게 활용하나요? | `content/about/interests.md`, `content/ai-stack/*.md`, `content/prompts/*.md` |
| LLM Wiki는 무엇인가요? | `content/wiki/llm-wiki-pattern.md`, `knowledge/LLM_WIKI_SCHEMA.md` |
| 자동매매봇은 어떻게 만들었나요? | `content/projects/trading-bot.md` |

## Non-Goals For Now

초기 `/ask` 페이지에서는 하지 않는다.

- 실제 LLM API 호출
- 사용자 질문 저장
- 로그인
- Vector DB
- 외부 검색
- 개인정보 입력

## Success Criteria

초기 설계가 성공한 상태:

- `/ask` 페이지가 존재한다.
- 사용자가 질문 가능한 주제를 이해한다.
- 답변 기준과 출처 정책이 드러난다.
- 다음 구현 단계가 명확하다.
