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
- [x] Tailwind CSS 적용
- [x] 기본 레이아웃 설계
- [x] Markdown 로딩 방식 결정
- [x] 콘텐츠 목록/상세 라우팅 설계
- [x] 홈 Build Log 최신순 노출
- [x] Build Log 최신순 helper 정리
- [x] 홈 대표 프로젝트/프롬프트 노출 기준 정리
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
- [x] Daily Work Logging System 운영 기준 보강
- [x] 2026-06-18 Daily Digest 작성
- [x] 2026-06-19 Daily Digest 작성
- [x] 2026-06-26 Daily Digest 작성
- [x] 2026-06-27 Daily Digest 작성
- [x] 2026-06-30 Daily Digest 작성

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
- [x] real LLM provider adapter 설계
- [x] rate limit 정책 정리
- [x] real mode 비용/품질 샘플 기준 작성
- [x] production persistent rate limit store 결정
- [x] real mode 제한 배포 환경 결정
- [x] Vercel Preview readiness 체크리스트 작성
- [x] Preview 환경 변수 로컬 점검 스크립트 작성
- [x] Preview URL smoke test 스크립트 작성
- [x] Vercel Preview smoke test runbook 작성
- [x] `/ask/eval`에 Preview deployment gates 노출
- [x] 홈/Ask 페이지에 현재 운영 모드와 Preview 검수 흐름 노출
- [x] Vercel 연결 여부 Decision Brief 작성
- [x] 홈/Ask Eval에 Vercel 선택지 노출
- [x] Option B mock-only Production runbook 작성
- [x] Vercel mock-only 배포 결과 기록 템플릿 작성
- [ ] Vercel Preview Deployment 연결 여부 결정
- [ ] Preview environment variable 설정

### 6. 운영/온보딩 루틴 정리

- [x] README Repository Map 추가
- [x] README Local Development 섹션 추가
- [x] `npm run dev:local` 추가
- [x] `npm run verify` 추가
- [x] README Git Sync 섹션 추가
- [x] README Content Authoring 섹션 추가
- [x] Daily Work Logging System 검증 기준을 `npm run verify`로 갱신
- [x] 멀티 프로젝트/에이전트 공유 문서 정리

## Next Recommended Step

다음 작업은 Vercel 연결 방향을 Option A/B/C 중 하나로 결정하는 것이다.

외부 Vercel 계정/프로젝트를 건드리기 전에는 `npm run verify`로 로컬 build와 readiness를 먼저 확인한다.

Preview URL이 생기면 `npm run check:ask-url -- <preview-url>`로 safe GET smoke test를 실행한다.

현재 추천은 Option B이다.

- Option A: Vercel 연결 보류
- Option B: Vercel 연결 + Production mock-only 배포
- Option C: Vercel 연결 + Preview real mode 검수 준비

## Safe Local Backlog Before Vercel Decision

Vercel 선택이 아직 없을 때는 외부 계정, secret, 배포를 건드리지 않고 아래 작업을 진행한다.

1. Home/Project Archive 품질 개선
   - [x] 대표 프로젝트 문서에 관련 로그/프롬프트/기준 문서 연결 추가
   - [x] 프로젝트 카드에 관련 로그/프롬프트 연결 기준 추가
   - [x] trading-bot, WebGPU Game, LLM Wiki의 공개 상태 설명 보강

2. LLM Wiki 품질 점검
   - [x] Prompt Library와 AI Stack 문서가 Wiki index에서 발견 가능한지 확인
   - [x] `content/wiki/index.md`와 실제 Wiki 문서 목록 일치 여부 확인
   - [x] 기본 프로젝트 문서의 stale claim 일부 정리
   - [x] `knowledge/LLM_WIKI_LINT_CHECKLIST.md` 기준 1차 stale/orphan/security 점검

3. Ask About Me 품질 개선
   - [x] blocked/unknown/answered 샘플 추가
   - [x] trading-bot, Vercel, LLM Wiki 관련 질문의 출처와 답변 기준 보강

4. Daily Work Logging 운영
   - [x] 최근 커밋과 Build Log가 Daily Digest에 반영되었는지 확인
   - [x] 중요한 프롬프트를 Prompt Library에 추가할지 판단

5. GitHub 동기화 준비
   - [x] `npm run verify` 통과 확인
   - [x] Vercel 배포 전 Next.js audit 결과 검토
   - [x] Vercel 배포 전 Next.js 보안 패치 경로 확인
   - [x] Vercel 배포 전 Next 15/16 업그레이드 여부 결정
   - [x] Next 15 최신 패치(`15.5.20`) 적용 및 `npm run verify` 재확인
   - [x] Vercel Dashboard에서 프로젝트 연결 완료
   - [x] `git push origin main` 완료
   - [ ] Vercel 배포 전 남은 Next 내부 PostCSS advisory risk acceptance 여부 결정
   - [ ] Vercel Production URL 확인
   - [ ] `npm run check:ask-url -- <production-url>` smoke test 실행
   - [ ] Vercel mock-only Production 배포 결과 로그 작성
