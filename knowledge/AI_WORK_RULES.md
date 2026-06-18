# AI Work Rules

## Purpose

이 문서는 Codex, Claude Code, Cursor Agent 등 AI 코딩 도구가 이 프로젝트를 작업할 때 반드시 따라야 하는 기준이다.

## Core Principle

이 프로젝트의 목적은 단순 구현이 아니라, AI 활용 과정을 보여주는 것이다.

코드는 결과물이고, 문서와 기록은 포트폴리오의 핵심 자산이다.

## Do Not Change Without Reason

다음 방향은 임의로 변경하지 않는다.

- 프로젝트 컨셉: Vibe Coding Lab
- 중심 구조: LLM Wiki + Chatbot + Projects + Prompt Library + Build Log
- 콘텐츠 관리 방식: Markdown 기반
- 사이트 목적: AI 활용 능력 증명
- 챗봇 목적: 조정민에 대한 질문 응답

## Development Style

작업할 때는 다음 순서를 따른다.

1. 요구사항을 먼저 정리한다.
2. 기존 문서와 구조를 확인한다.
3. 최소 구현 단위로 나눈다.
4. 기능을 구현한다.
5. 필요한 문서를 함께 업데이트한다.
6. AI가 어떤 작업을 했는지 Build Log에 기록할 수 있게 남긴다.

## Content First

이 프로젝트는 콘텐츠 기반 포트폴리오이다.

새 기능을 만들 때는 항상 다음을 고려한다.

- 이 기능이 조정민의 AI 활용 능력을 보여주는가?
- 이 기능이 챗봇의 지식으로 활용될 수 있는가?
- 이 기능이 Prompt Library나 Build Log와 연결되는가?

## Chatbot Rule

챗봇은 반드시 문서 기반으로 답변해야 한다.

모르는 내용은 추측하지 않는다.

답변할 수 없는 경우 다음처럼 말한다.

> 현재 위키 문서에는 해당 내용이 충분히 정리되어 있지 않습니다.

## LLM Wiki Rule

이 프로젝트는 RAG 인프라를 먼저 만드는 것이 아니라, LLM이 지속적으로 유지보수하는 Markdown Wiki를 먼저 만든다.

새로운 자료나 대화가 생기면 단순히 저장만 하지 않는다.

AI는 다음을 수행해야 한다.

1. 원본 자료에서 핵심 정보와 결정사항을 추린다.
2. 기존 Wiki 문서 중 갱신할 문서를 찾는다.
3. 필요한 경우 새 Wiki 문서를 만든다.
4. 관련 문서 사이의 연결을 보강한다.
5. 변경사항을 Build Log 또는 Wiki Log에 남긴다.

검색, embedding, vector database는 나중에 필요해지면 붙이는 보조 도구로 본다.

## Security Rule

다음 정보는 절대 공개하거나 저장하지 않는다.

- API Key
- Secret Key
- Access Token
- Refresh Token
- 개인 계좌번호
- 주민등록번호
- 회사 내부 기밀
- 운영 서버 접속 정보
- 실서비스 장애 대응 내부 정보 중 공개하면 안 되는 내용

## Trading Bot Rule

자동매매봇은 흥미 유발용 콘텐츠가 될 수 있지만, 투자 권유처럼 보이면 안 된다.

좋은 표현:

- 실험 기록
- 전략 테스트
- 운영 로그
- 수익률 공개
- 실패 사례

피해야 할 표현:

- 수익 보장
- 따라 하면 돈 번다
- 추천 종목
- 매수/매도 권유

## Prompt Saving Rule

모든 프롬프트를 저장하지 않는다.

다음 기준을 만족하는 것만 저장한다.

- 3개월 뒤 다시 봐도 유용한가?
- 다른 사람에게 공유해도 도움이 되는가?
- 실제 프로젝트 결과에 영향을 줬는가?
- 재사용 가능한 구조인가?

## Naming Rule

파일명은 영어 소문자와 하이픈을 사용한다.

예시:

- about-me.md
- ai-stack.md
- trading-bot.md
- spring-api-design.md
- 2026-06-18-portfolio-planning.md

## Language Rule

기본 콘텐츠는 한국어로 작성한다.

코드, 파일명, slug, route는 영어를 사용한다.

## Tone

문체는 과하게 멋있게 쓰지 않는다.

현실적인 개발자 기록처럼 쓴다.

좋은 톤:

- 담백함
- 실험 기록
- 배운 점 중심
- 실패 사례 포함

피해야 할 톤:

- 과장
- 성공만 강조
- 마케팅 문구 과다
