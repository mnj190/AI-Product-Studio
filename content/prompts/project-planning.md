# Project Planning Prompt

## Purpose

프로젝트를 바로 구현하기 전에 방향, 범위, 정보 구조, 작업 순서를 정리하기 위한 프롬프트이다.

이 포트폴리오에서는 ChatGPT를 PM 및 기획자처럼 사용하고, Codex나 Claude Code를 구현 파트너처럼 사용하는 흐름을 선호한다.

## Used In

- AI Product Studio 초기 기획
- Vibe Coding Lab 정보 구조 설계
- LLM Wiki 문서 구조 설계
- Static Portfolio MVP 작업 순서 정리

## AI Tool

- ChatGPT
- Codex

## Prompt

```text
지금은 구현보다 기획 단계야.

내가 만들려는 프로젝트의 목적, 핵심 사용자, 주요 기능, 콘텐츠 구조, MVP 범위, 장기 로드맵을 먼저 정리해줘.

이후 Codex나 Claude Code가 이어서 구현할 수 있도록 다음 항목을 포함해줘.

1. 프로젝트 목표
2. 핵심 컨셉
3. 첫 버전 범위
4. 콘텐츠 구조
5. 작업 우선순위
6. 구현 전에 결정해야 할 것
7. 나중에 챗봇/RAG 데이터로 쓸 수 있는 문서 구조
```

## Result

이 프롬프트를 통해 프로젝트가 단순 포트폴리오가 아니라 AI 활용 과정 자체를 보여주는 포트폴리오라는 방향을 잡았다.

또한 `knowledge/`, `content/` 구조와 Roadmap, MVP Scope, Tech Decisions 문서로 이어졌다.

## Improved Version

```text
너는 PM이자 정보 구조 설계자야.

나는 AI 활용 능력을 보여주는 개인 포트폴리오를 만들고 있어.
코드 구현보다 먼저, 이후 AI 코딩 도구가 방향을 잃지 않도록 프로젝트 기준 문서를 만들고 싶어.

다음 산출물을 Markdown 문서 기준으로 설계해줘.

- PROJECT_CONTEXT
- AI_WORK_RULES
- CONTENT_STRUCTURE
- ROADMAP
- MVP_SCOPE
- NEXT_ACTIONS

각 문서는 나중에 Codex, Claude Code, Cursor가 구현할 때 참고할 수 있어야 해.
문체는 과장하지 말고, 현실적인 개발자 기록처럼 담백하게 작성해줘.
```

## Notes

좋은 기획 프롬프트는 “무엇을 만들지”뿐 아니라 “나중에 누가 이어서 작업할지”까지 고려해야 한다.

이 프로젝트에서는 프롬프트도 포트폴리오의 일부이므로, 결과에 영향을 준 프롬프트만 선별해서 저장한다.

