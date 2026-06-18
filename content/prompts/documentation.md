# Documentation Prompt

## Purpose

AI와 함께 만든 결정, 작업 과정, 문제, 다음 단계를 문서로 남기기 위한 프롬프트이다.

## Used In

- Build Log 작성
- 프로젝트 문서 정리
- 작업 후 회고
- 다음 작업자에게 컨텍스트 전달

## AI Tool

- ChatGPT
- Codex
- Claude

## Prompt

```text
지금까지의 작업 내용을 바탕으로 Build Log를 작성해줘.

다음 구조를 지켜줘.

# YYYY-MM-DD - 작업 제목

## What I Did

## AI Used

## Prompts Used

## Decisions

## Problems

## Verification

## Next Step

문체는 과장하지 말고, 나중에 다시 봤을 때 작업 맥락이 이해되도록 담백하게 작성해줘.
```

## Result

작업 기록을 단순 커밋 메시지가 아니라 포트폴리오 콘텐츠로 남길 수 있다.

나중에 챗봇이 “이 프로젝트는 어떻게 만들어졌나요?” 같은 질문에 답할 수 있는 원본 데이터가 된다.

## Improved Version

```text
이번 작업을 포트폴리오 Build Log로 정리해줘.

단순히 성공한 결과만 쓰지 말고, 다음을 포함해줘.

- 왜 이 작업을 했는지
- 어떤 결정을 했는지
- 어떤 문제가 있었는지
- 어떻게 검증했는지
- 다음 작업은 무엇인지

문서는 Markdown으로 작성하고, 챗봇 RAG 데이터로도 쓰일 수 있게 구체적으로 남겨줘.
```

## Notes

AI 활용 포트폴리오에서는 결과물만큼 과정 기록이 중요하다.

작업 로그는 “나중에 보기 좋은 기록”이 아니라 “다음 작업을 빠르게 이어가기 위한 컨텍스트”로 작성한다.

