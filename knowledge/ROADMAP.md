# Roadmap

이 문서는 Vibe Coding Lab / AI Product Studio의 작업 순서를 정의한다.

목표는 한 번에 거대한 사이트를 만드는 것이 아니라, 작은 단위로 완성 가능한 결과물을 쌓는 것이다.

## Working Principle

1. 콘텐츠를 먼저 만든다.
2. 콘텐츠를 보여주는 최소 웹사이트를 만든다.
3. 문서를 검색 가능한 지식 베이스로 만든다.
4. LLM Wiki index/log/schema를 정비한다.
5. Wiki 기반 질문형 인터페이스를 붙인다.
6. 프로젝트와 로그를 계속 추가한다.

## Phase 0. Foundation

### Goal

프로젝트의 방향, 작업 규칙, 콘텐츠 구조를 고정한다.

### Deliverables

- `README.md`
- `knowledge/PROJECT_CONTEXT.md`
- `knowledge/AI_WORK_RULES.md`
- `knowledge/CONTENT_STRUCTURE.md`
- `knowledge/ROADMAP.md`
- 초기 `content/` 문서

### Completion Criteria

- 새 AI 코딩 도구가 들어와도 프로젝트 목적을 이해할 수 있다.
- 어떤 파일에 어떤 내용을 저장해야 하는지 알 수 있다.
- 첫 버전에서 무엇을 만들지 범위가 명확하다.

### Status

진행 중.

## Phase 1. Static Portfolio MVP

### Goal

Markdown 콘텐츠를 읽어서 보여주는 최소 포트폴리오 웹사이트를 만든다.

### Deliverables

- Next.js 프로젝트 구조
- 홈 페이지
- About 페이지
- Projects 목록 페이지
- Project 상세 페이지
- Build Log 목록 페이지
- 기본 레이아웃과 내비게이션

### Recommended Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Markdown 또는 MDX

### Completion Criteria

- `content/about` 문서를 웹에서 볼 수 있다.
- `content/projects` 문서를 웹에서 볼 수 있다.
- `content/logs` 문서를 웹에서 볼 수 있다.
- `content/prompts` 문서를 웹에서 볼 수 있다.
- `content/ai-stack` 문서를 웹에서 볼 수 있다.
- 새 Markdown 문서를 추가하면 페이지에 반영할 수 있다.

### Current Status

기본 MVP 구현 완료.

홈, About, Projects, Prompt Library, Build Log, AI Stack, Wiki 페이지가 Markdown 문서를 읽어 렌더링한다.

## Phase 2. Content Expansion

### Goal

챗봇과 포트폴리오가 참조할 수 있는 개인 지식 베이스를 확장한다.

### Deliverables

- `content/about/skills.md`
- `content/about/interests.md`
- `content/projects/llm-wiki.md`
- `content/projects/webgpu-game.md`
- `content/prompts/project-planning.md`
- `content/wiki/llm-wiki-pattern.md`
- `content/wiki/vibe-coding.md`
- `content/ai-stack/chatgpt.md`
- `content/ai-stack/codex.md`

### Completion Criteria

- 방문자가 조정민의 경력, 기술, 프로젝트, AI 활용 방식을 문서로 이해할 수 있다.
- 챗봇이 답변에 사용할 수 있는 기본 문서가 충분히 존재한다.

## Phase 3. Prompt Library & Build Log

### Goal

AI 활용 과정 자체를 포트폴리오 콘텐츠로 만든다.

### Deliverables

- Prompt Library 목록 페이지
- Prompt 상세 페이지
- Build Log 목록 페이지
- Build Log 상세 페이지
- 좋은 프롬프트 저장 기준 적용

### Completion Criteria

- 프로젝트에 사용한 프롬프트를 선별해 저장할 수 있다.
- 날짜별 작업 기록을 누적할 수 있다.
- 결과뿐 아니라 과정이 포트폴리오에 드러난다.

### Current Status

초기 Prompt Library와 Build Log 페이지 구현 완료.

이후에는 실제 프로젝트 진행에 맞춰 프롬프트와 로그를 계속 추가한다.

## Phase 4. LLM Wiki Maintenance MVP

### Goal

LLM이 지속적으로 유지보수할 수 있는 Markdown Wiki 운영 구조를 만든다.

### Deliverables

- `knowledge/LLM_WIKI_SCHEMA.md`
- `knowledge/LLM_WIKI_ARCHITECTURE.md`
- `knowledge/LLM_WIKI_INGEST_WORKFLOW.md`
- `knowledge/LLM_WIKI_LINT_CHECKLIST.md`
- `knowledge/RAW_SOURCE_POLICY.md`
- `content/wiki/index.md`
- `content/wiki/log.md`
- `raw/` source folder structure

### Completion Criteria

- 새 자료를 기존 Wiki에 통합하는 절차가 있다.
- Wiki index를 통해 주요 문서를 찾을 수 있다.
- Wiki log를 통해 변경 이력을 추적할 수 있다.
- RAG/vector DB 없이도 중간 규모의 Markdown Wiki를 운영할 수 있다.

### Current Status

초기 운영 구조 구현 완료.

Raw source 보관 구조, ingest workflow, lint checklist, wiki index/log가 준비되었다.

## Phase 5. Ask About Me Interface

### Goal

LLM Wiki를 기반으로 조정민에 대해 질문하고 답변할 수 있는 인터페이스를 만든다.

### Deliverables

- 질문 UI
- Wiki 기반 답변 API
- 답변 출처 표시
- 답변 불가 처리
- 필요 시 검색 도구 연동

### Current Status

`/ask` mock flow와 `/api/ask` mock route 구현 완료.

현재는 예시 질문, Local Wiki Lookup 결과, deterministic draft answer, feedback candidate, 운영 모드 정보를 보여준다.

실제 외부 LLM API 호출은 Production에서 켜지 않으며, Preview real mode 검수 전 gate와 runbook을 먼저 통과해야 한다.

### Completion Criteria

- 답변은 LLM Wiki 문서 기반으로 생성된다.
- Wiki에 없는 내용은 추측하지 않는다.
- 좋은 질문과 답변은 다시 Wiki에 반영할 수 있다.

## Phase 6. Project Archive

### Goal

포트폴리오가 여러 프로젝트의 허브 역할을 하도록 만든다.

### Deliverables

- 프로젝트별 상태 표시
- GitHub 링크
- 데모 링크
- 관련 로그 연결
- 관련 프롬프트 연결

### Completion Criteria

- 각 프로젝트가 독립 레포로 분리되어도 메인 포트폴리오에서 탐색할 수 있다.
- 프로젝트의 결과물, 과정, AI 활용 방식이 함께 보인다.

## Phase 7. Advanced Experiments

### Goal

AI 활용 포트폴리오의 차별화 요소를 추가한다.

### Candidate Projects

- AI Trading Bot 운영 로그
- MCP 실험
- AI Agent 실험
- WebGPU Game
- 개인 지식 베이스 기반 자동 문서화

### Completion Criteria

- 단순 소개 사이트가 아니라, 계속 진화하는 AI 실험실처럼 보인다.

## Repository Strategy

`AI-Product-Studio`는 메인 포트폴리오 웹 레포지토리로 유지한다.

별도 레포로 분리할 후보:

- `ai-trading-bot`: 실제 자동매매봇 코드와 운영 구조
- `webgpu-game-lab`: WebGPU 게임 실험
- `mcp-experiments`: MCP 관련 실험
- `agent-experiments`: AI Agent 워크플로우 실험

초기에는 메인 레포 안에서 소개 문서와 로그를 먼저 관리하고, 실행 가능한 앱이나 서비스가 되는 시점에 별도 레포로 분리한다.
