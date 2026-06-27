# Agent Sync

여러 AI 에이전트가 서로 다른 프로젝트를 담당할 때 컨텍스트를 공유하기 위한 문서.

새 작업을 시작하기 전에 이 파일을 먼저 읽는다. 작업을 마치면 자신의 섹션을 갱신한다.

> 전체 운영 방식(git 관리, secrets, 새 프로젝트 추가 절차)은 `WORKSPACE_GUIDE.md`를 참고한다.

## 프로젝트 담당 에이전트

| 프로젝트 | 담당 에이전트 | 위치 |
|---|---|---|
| 포트폴리오 사이트 (VIBE_PROJECT) | Codex | `/Users/jo/Desktop/VIBE_PROJECT` |
| 자동매매봇 (trading-bot) | Claude | `/Users/jo/Desktop/trading-bot` |

## 공유 지식 위치

모든 에이전트가 읽어야 하는 문서는 `VIBE_PROJECT/knowledge/`에 있다.

- `PROJECT_CONTEXT.md` — 전체 프로젝트 방향과 목적
- `CROSS_PROJECT.md` — 프로젝트 간 연결 지점과 데이터 흐름
- `AGENT_SYNC.md` — 이 파일, 에이전트 간 핸드오프

---

## Claude (trading-bot 담당)

### 현재 상태

`in_progress` — 프로젝트 초기 세팅 중

### 완료한 작업

- 토스 오픈 API 문서 분석
- `trading-bot/` 폴더 구조 생성
- `trading-bot/knowledge/` 초기 문서 작성

### 다음 작업

- 토스 API OAuth 클라이언트 구현
- 계좌/잔고 조회 모듈 구현
- 시세 조회 모듈 구현

### Codex에게 전달할 사항

없음 (현재는 trading-bot이 독립적으로 시작)

---

## Codex (포트폴리오 사이트 담당)

### 현재 상태

`in_progress` — 포트폴리오 사이트 품질 개선과 운영/온보딩 문서 정리 진행 중

### 완료한 작업

- Static Portfolio MVP 구현 완료
- Ask About Me mock 페이지, Local Wiki Lookup, draft answer 구현
- Deployment readiness 체크 시스템 구현
- 홈 최신 Build Log/대표 콘텐츠 노출 기준 정리
- README Repository Map, Local Development, Verification, Git Sync, Content Authoring 정리
- `npm run dev:local`, `npm run verify` 추가
- 2026-06-26 Daily Digest 보강

### 다음 작업

- Vercel 연결 Option A/B/C 중 사용자 결정 후 진행
- `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md` 참고
- 결정 전에는 콘텐츠/UI/LLM Wiki 품질 개선 지속

### Claude에게 전달할 사항

- trading-bot 공개 작업 로그는 현재 포트폴리오 구조에 맞춰 `VIBE_PROJECT/content/logs/YYYY-MM-DD-trading-topic.md` 형식으로 전달할 것
- 현재 포트폴리오 사이트는 `content/logs/*.md`만 자동 노출하며, `content/logs/trading/` 하위 폴더는 자동 노출하지 않음
- 공개 가능한 지표만 포함할 것 (API key, 계좌번호, 민감 정보 제외)

---

## 핸드오프 규칙

1. 작업을 시작하기 전: 이 파일의 상대방 섹션을 읽는다.
2. 작업을 마친 후: 자신의 섹션 상태와 다음 작업을 갱신한다.
3. 상대방에게 전달할 사항이 생기면: 해당 섹션 마지막에 추가한다.
4. 공유 파일을 수정할 때: `CROSS_PROJECT.md`의 연결 지점 기준을 따른다.
