# Portfolio Site

## Summary

AI 활용 능력을 보여주기 위한 개인 포트폴리오 프로젝트.

## Goal

다음 질문에 답할 수 있는 사이트를 만든다.

- 조정민은 어떤 개발자인가?
- 어떤 프로젝트를 수행했는가?
- AI를 어떻게 활용하는가?
- 어떤 프롬프트를 사용하는가?
- 어떤 실험을 진행하고 있는가?

## Why I Built This

기존 포트폴리오는 결과물만 보여주는 경우가 많다.

하지만 AI 시대에는 결과물뿐 아니라 어떤 방식으로 AI를 활용해 문제를 해결했는지도 중요하다고 생각한다.

이 프로젝트는 그 과정을 기록하기 위해 시작되었다.

## AI Usage

이 프로젝트에서 AI는 단순한 코드 생성 도구가 아니라 기획, 정보 구조 설계, 문서화, 구현, 개선 과정에 함께 참여하는 개발 파트너로 사용된다.

AI 활용 기록 자체가 포트폴리오의 일부가 된다.

## Main Features

### Personal LLM Wiki

개인 정보를 문서 형태로 관리한다.

### Ask About Me Chatbot

방문자가 조정민에 대해 질문할 수 있다.

예시:

- 어떤 프로젝트를 했나요?
- ORIS 프로젝트가 무엇인가요?
- 최근 관심 기술은 무엇인가요?

### Project Archive

프로젝트 정보를 관리한다.

각 프로젝트는 다음 정보를 포함한다.

- 프로젝트 설명
- 사용 기술
- AI 활용 방식
- 개발 과정
- 결과

### Prompt Library

공유 가치가 있는 프롬프트를 정리한다.

### Build Log

AI를 활용한 개발 과정을 기록한다.

## Tech Stack

초기 구현 후보:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- MDX 또는 Markdown
- LLM Wiki 기반 질문형 인터페이스

## Prompt Examples

초기 기획 단계에서는 ChatGPT를 PM 및 기획자처럼 사용하고, 구현 단계에서는 Codex 또는 Claude Code를 개발자처럼 사용하는 흐름을 잡았다.

## Build Process

1. 프로젝트 방향과 정보 구조를 정리한다.
2. Markdown 기반 지식 베이스를 만든다.
3. 포트폴리오 웹사이트를 구현한다.
4. LLM Wiki index/log/schema를 정리한다.
5. Wiki 기반 질문형 인터페이스를 만든다.
6. 프로젝트, 프롬프트, 로그를 지속적으로 추가한다.

## Result

아직 초기 기초 작업 단계이다.

현재 목표는 코드보다 문서 구조와 원본 데이터를 먼저 만드는 것이다.

## Lessons Learned

구현 도구를 쓰기 전에, 무엇을 만들지와 어떤 기준으로 만들지를 먼저 정리하는 것이 중요하다.

## Links

- 웹 페이지: `/`, `/projects`, `/logs`, `/prompts`, `/wiki`
- 핵심 작업 로그:
  - `/logs/2026-06-18-static-portfolio-mvp`
  - `/logs/2026-06-26-featured-home-content`
  - `/logs/2026-06-26-home-recent-build-logs`
  - `/logs/2026-06-26-repository-map-docs`
  - `/logs/2026-06-27-safe-local-backlog`
- 관련 프롬프트:
  - `/prompts/project-planning`
  - `/prompts/documentation`
  - `/prompts/daily-work-log`
- 운영 문서:
  - `README.md`
  - `knowledge/NEXT_ACTIONS.md`
  - `knowledge/WORKSPACE_GUIDE.md`
