# Content Structure

## Root Content Structure

\`\`\`text
content/
├── about/
├── projects/
├── prompts/
├── logs/
├── ai-stack/
└── wiki/
\`\`\`

## About

조정민에 대한 기본 정보를 저장한다.

\`\`\`text
content/about/
├── about-me.md
├── career.md
├── skills.md
└── interests.md
\`\`\`

### about-me.md

개인 소개 문서.

포함 내용:

- 한 줄 소개
- 현재 역할
- 개발 경력
- 주요 관심사
- AI 포트폴리오를 만드는 이유

### career.md

경력 요약 문서.

포함 내용:

- 회사/역할
- 주요 프로젝트
- 맡은 역할
- 문제 해결 경험

### skills.md

기술 스택 문서.

포함 내용:

- Java
- Spring
- MySQL
- PostgreSQL
- 외부 API 연동
- 배치 처리
- AI 도구 활용

### interests.md

현재 관심사 문서.

포함 내용:

- AI 활용 개발
- Vibe Coding
- LLM
- LLM Wiki
- 자동매매봇
- WebGPU Game

## Projects

프로젝트별 문서를 저장한다.

\`\`\`text
content/projects/
├── portfolio-site.md
├── ask-about-me-chatbot.md
├── trading-bot.md
├── llm-wiki.md
└── webgpu-game.md
\`\`\`

각 프로젝트 문서는 다음 구조를 따른다.

\`\`\`md
# 프로젝트명

## Summary

## Why I Built This

## AI Usage

## Main Features

## Tech Stack

## Prompt Examples

## Build Process

## Result

## Lessons Learned

## Links
\`\`\`

## Prompts

공유 가치가 있는 프롬프트를 저장한다.

\`\`\`text
content/prompts/
├── project-planning.md
├── code-review.md
├── refactoring.md
├── debugging.md
└── documentation.md
\`\`\`

각 프롬프트 문서는 다음 구조를 따른다.

\`\`\`md
# Prompt Title

## Purpose

## Used In

## AI Tool

## Prompt

## Result

## Improved Version

## Notes
\`\`\`

## Logs

AI를 활용한 개발 과정을 날짜별로 저장한다.

\`\`\`text
content/logs/
├── 2026-06-18-portfolio-planning.md
├── 2026-06-19-initial-setup.md
└── 2026-06-20-chatbot-design.md
\`\`\`

각 로그 문서는 다음 구조를 따른다.

\`\`\`md
# 날짜 - 작업 제목

## What I Did

## AI Used

## Prompts Used

## Decisions

## Problems

## Next Step
\`\`\`

## AI Stack

AI 도구별 사용법을 정리한다.

\`\`\`text
content/ai-stack/
├── chatgpt.md
├── claude.md
├── codex.md
├── cursor.md
└── gemini.md
\`\`\`

각 문서는 다음 구조를 따른다.

\`\`\`md
# AI Tool Name

## When I Use It

## Strengths

## Weaknesses

## Best Use Cases

## Example Prompts

## Related Projects
\`\`\`

## Wiki

기술 개념, 실험, 학습 내용을 저장한다.

\`\`\`text
content/wiki/
├── llm-wiki-pattern.md
├── mcp.md
├── ai-agent.md
├── vibe-coding.md
├── context-engineering.md
└── webgpu.md
\`\`\`

## LLM Wiki Knowledge Rule

LLM Wiki와 향후 챗봇은 기본적으로 아래 문서를 우선 지식 계층으로 사용한다.

- content/about
- content/projects
- content/prompts
- content/logs
- content/ai-stack
- content/wiki

단, 공개하면 안 되는 정보는 \`content/private\`, \`raw/private\` 또는 별도 비공개 저장소에 둔다.

## First Documents To Create

가장 먼저 작성할 문서:

- content/about/about-me.md
- content/about/career.md
- content/projects/portfolio-site.md
- content/projects/ask-about-me-chatbot.md
- content/projects/trading-bot.md
- content/logs/2026-06-18-portfolio-planning.md
