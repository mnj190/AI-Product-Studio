# 2026-06-18 - Daily Digest

## One-line Summary

AI Product Studio의 방향을 정하고, Next.js 기반 포트폴리오 MVP와 LLM Wiki 중심의 Ask About Me 구조를 하루 만에 세웠다.

## What Changed

- GitHub 레포지토리와 기본 프로젝트 문서 구조를 정리했다.
- Next.js 기반 정적 포트폴리오 MVP를 만들었다.
- About, Projects, Build Log, Wiki, Prompt Library, AI Stack 페이지를 추가했다.
- RAG 중심 계획을 Karpathy 스타일의 LLM Wiki 방향으로 전환했다.
- raw source, wiki schema, ingest workflow, lint checklist를 설계했다.
- Ask About Me mock 페이지를 만들고, local wiki lookup과 draft answer guard를 구현했다.
- 질문을 Wiki 개선 후보로 바꾸는 feedback loop를 추가했다.
- `/api/ask` mock route를 만들고 홈/Ask 화면 흐름을 다듬었다.

## How AI Was Used

- 기획: 포트폴리오의 목적, 정보 구조, 작업 순서를 문서로 정리했다.
- 구현: Next.js 라우트, Markdown 기반 콘텐츠 로딩, Ask mock UI/API를 만들었다.
- 방향 전환: RAG 대신 LLM Wiki를 중심으로 개인 지식베이스를 구축하는 쪽으로 설계를 바꿨다.
- 검증: `npm run build`, 로컬 서버, HTTP 응답 확인으로 웹이 정상 렌더링되는지 확인했다.
- 기록: 작업 단위 Build Log를 남기고, 하루치 Daily Digest로 묶었다.

## Important Prompts

### 1. 기초 작업을 시작하게 만든 요청

> 이 전체 내용을 토대로 기초작업을 해줘.

Why it mattered:

이 요청으로 단순 구현이 아니라 프로젝트 맥락, 문서, 로드맵, 작업 규칙부터 세우는 방향이 정해졌다.

Reusable pattern:

```text
이 전체 내용을 토대로 바로 구현하지 말고, 먼저 프로젝트의 목적, 구조, 로드맵, 작업 규칙을 기초 작업으로 정리해줘.
```

### 2. GitHub 레포지토리와 연결한 요청

> 이거 보고 깃도 연동 해줘. 일단 이건 포트폴리오 가장 기초 웹용 레파지토리야.

Why it mattered:

로컬 작업을 포트폴리오용 공개 레포지토리로 관리하는 기준이 생겼다.

Reusable pattern:

```text
이 프로젝트를 포트폴리오용 GitHub 레포지토리로 관리할 수 있게 git 상태와 remote 연결을 확인하고, 필요한 초기 커밋 흐름을 정리해줘.
```

### 3. 방향을 계속 진행하게 만든 요청

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

Why it mattered:

AI가 단발성 답변이 아니라 로드맵을 기준으로 작은 단위 작업을 계속 실행하게 만들었다.

Reusable pattern:

```text
현재 상태를 기준으로 다음 작업 계획을 세우고, 작은 단위로 하나씩 구현하고 검증하면서 진행해줘.
```

### 4. RAG에서 LLM Wiki로 방향을 바꾼 요청

> rag 대신 Karpathy 문서를 참고해서 llm wiki를 구현하는 걸로 목표를 바꿔줘.

Why it mattered:

프로젝트의 핵심 지식 전략이 retrieval-first RAG에서 사람이 읽고 관리할 수 있는 LLM Wiki로 바뀌었다.

Reusable pattern:

```text
기존 [A 방식] 대신 [참고 자료/철학]을 바탕으로 [B 방식]으로 목표를 바꿔줘. 관련 문서, 로드맵, 구현 계획도 함께 업데이트해줘.
```

### 5. 매일 기록 시스템을 요청한 프롬프트

> 매일매일 한 작업을 기록하고 싶어. 목적은 AI로 어떤 식으로 어떻게 얼마나 공유하기 위한거야.

Why it mattered:

작업 로그가 단순 내부 기록에서 AI 협업 과정을 보여주는 포트폴리오 콘텐츠로 확장됐다.

Reusable pattern:

```text
매일 한 작업을 기록하고 싶어. 목적은 [공유 대상]에게 AI로 어떤 방식으로 작업했는지 보여주는 거야. 어제 한 작업과 미기록 작업을 모아서 요약하고, 중요한 프롬프트도 초보자가 참고할 수 있게 정리해줘.
```

## Decisions

- 첫 단계에서는 화려한 디자인보다 정보 구조와 작업 기록을 우선한다.
- 프로젝트별 레포지토리는 나중에 분리할 수 있지만, 지금은 포트폴리오 웹 레포지토리를 중심 허브로 둔다.
- Ask About Me는 처음부터 실제 LLM을 붙이지 않고 mock, local lookup, answer guard 순서로 안정성을 만든다.
- RAG 구현보다 LLM Wiki를 먼저 만들고, 검색/답변은 Wiki를 기반으로 한다.
- 매일 작업은 Build Log와 Daily Digest로 나눠 기록한다.

## Lessons for Vibe Coding Beginners

- “바로 구현해줘”보다 “기초 작업을 해줘”라고 요청하면 AI가 문서, 구조, 로드맵을 먼저 잡아준다.
- 큰 목표는 “하나씩 진행해줘”처럼 연속 작업 모드로 바꾸면 작은 산출물로 쪼개기 쉽다.
- 방향이 바뀌어도 괜찮다. 중요한 것은 바뀐 이유와 영향을 문서에 남기는 것이다.
- 실제 API를 붙이기 전에 mock UI와 guard를 만들면 실패 비용이 줄어든다.
- 매일 기록은 포트폴리오의 부산물이 아니라, AI 활용 능력을 보여주는 핵심 콘텐츠가 될 수 있다.

## Verification

- Next.js production build를 여러 차례 실행해 주요 라우트가 빌드되는지 확인했다.
- 로컬 서버에서 홈, Ask 페이지, `/api/ask` mock endpoint 응답을 확인했다.
- 현재 홈/Ask UI polish 변경은 아직 커밋 전 상태이므로 다음 커밋에 포함해야 한다.

## Related Build Logs

- `content/logs/2026-06-18-portfolio-planning.md`
- `content/logs/2026-06-18-foundation-roadmap.md`
- `content/logs/2026-06-18-static-portfolio-mvp.md`
- `content/logs/2026-06-18-prompt-ai-stack-pages.md`
- `content/logs/2026-06-18-llm-wiki-direction-change.md`
- `content/logs/2026-06-18-llm-wiki-maintenance-workflow.md`
- `content/logs/2026-06-18-ask-about-me-mock-page.md`
- `content/logs/2026-06-18-local-wiki-lookup.md`
- `content/logs/2026-06-18-draft-answer-guard.md`
- `content/logs/2026-06-18-ask-feedback-loop.md`
- `content/logs/2026-06-18-mock-ask-api-route.md`
- `content/logs/2026-06-18-core-wiki-expansion.md`
- `content/logs/2026-06-18-home-ask-ui-polish.md`

## Next Step

- Daily Work Logging System을 웹에서 자연스럽게 보이도록 정리한다.
- 프로젝트/위키 상세 페이지의 읽기 경험을 개선한다.
- 이후 real LLM provider adapter와 rate limit 정책 설계를 결정한다.
