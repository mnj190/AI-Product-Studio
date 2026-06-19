# Next Actions

이 문서는 지금 당장 이어서 할 일을 작은 단위로 관리한다.

## Current Priority

Static Portfolio MVP의 화면 흐름, 콘텐츠 품질, 작업 기록 시스템을 다듬고, 이후 real LLM 연동 여부를 결정한다.

## Immediate Tasks

### 1. Foundation 문서 보강

- [x] 프로젝트 목적 정리
- [x] AI 작업 규칙 정리
- [x] 콘텐츠 구조 정리
- [x] 로드맵 작성
- [x] 기술 선택 기록 작성
- [x] 첫 구현 범위 정리

### 2. 콘텐츠 확장

- [x] `content/about/skills.md`
- [x] `content/about/interests.md`
- [x] `content/projects/llm-wiki.md`
- [x] `content/projects/webgpu-game.md`
- [x] `content/prompts/daily-work-log.md`
- [x] `content/wiki/llm-wiki-pattern.md`
- [x] `content/wiki/vibe-coding.md`
- [x] `content/wiki/mcp.md`
- [x] `content/wiki/ai-agent.md`
- [x] `content/wiki/context-engineering.md`
- [x] `content/wiki/webgpu.md`

### 3. 웹 MVP 준비

- [x] Next.js 생성
- [x] TypeScript 적용
- [ ] Tailwind CSS 적용
- [x] 기본 레이아웃 설계
- [x] Markdown 로딩 방식 결정
- [x] 콘텐츠 목록/상세 라우팅 설계
- [x] 상세 페이지 읽기 경험 개선
- [x] Prompt Library 페이지 추가
- [x] AI Stack 페이지 추가

### 4. LLM Wiki 준비

- [x] LLM Wiki 방향 전환 문서화
- [x] LLM Wiki schema 작성
- [x] Wiki index 작성
- [x] Wiki log 작성
- [x] raw source 관리 기준 확정
- [x] 공개/비공개 정보 기준 재확인
- [x] Ask About Me 답변 기준 확정
- [x] Wiki lint 체크리스트 작성
- [x] Wiki ingest workflow 작성
- [x] Daily Work Logging System 설계
- [x] 2026-06-18 Daily Digest 작성

### 5. Ask About Me 준비

- [x] Ask About Me mock 페이지 작성
- [x] Local Wiki Lookup 설계
- [x] Local Wiki Lookup 구현
- [x] LLM 답변 API 설계
- [x] 답변 출처 표시 UI 고도화
- [x] 문서 기반 draft answer 구현
- [x] 질문/답변을 Wiki에 반영하는 feedback loop 설계
- [x] Wiki 반영 후보 UI 추가
- [x] 실제 LLM API 연동 여부 결정
- [x] API 연동 시 환경 변수/보안 정책 정리
- [x] `/api/ask` mock route 구현
- [x] 홈/Ask UI 품질 개선
- [ ] real LLM provider adapter 설계
- [ ] rate limit 정책 정리

## Next Recommended Step

다음 작업은 real LLM provider adapter와 rate limit 정책을 설계하고, mock Ask API에서 실제 provider로 전환할지 결정하는 것이다.
