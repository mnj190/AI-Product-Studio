# Workspace Guide

새 세션을 시작하거나 새 에이전트가 투입될 때 가장 먼저 읽는 문서.

이 문서는 전체 멀티 프로젝트/멀티 에이전트 운영 방식을 정의한다.

---

## 1. 전체 구조

```
~/Desktop/
  VIBE_PROJECT/          ← 포트폴리오 사이트 + 공유 허브 (HQ)
  trading-bot/           ← 자동매매봇
  (미래 프로젝트들...)
```

**VIBE_PROJECT가 HQ다.** 모든 에이전트가 공유하는 지식, 에이전트 간 핸드오프 상태, 프로젝트 간 연결 규칙이 여기에 있다.

---

## 2. GitHub 레포 구조

| 프로젝트 | 로컬 경로 | GitHub | 공개 여부 |
|---|---|---|---|
| VIBE_PROJECT | `~/Desktop/VIBE_PROJECT` | 별도 레포 | **공개** |
| trading-bot | `~/Desktop/trading-bot` | 별도 레포 | **비공개** |

### 규칙

- 프로젝트마다 독립적인 git 레포를 가진다.
- 프로젝트 간 공유 지식은 코드가 아니라 `VIBE_PROJECT/knowledge/`의 문서로 관리한다.
- 레포를 하나로 합치지 않는다. 에이전트 충돌, 공개/비공개 혼용 문제가 생긴다.

---

## 3. 에이전트 담당 프로젝트

| 에이전트 | 담당 프로젝트 | 접근 레포 |
|---|---|---|
| Codex | VIBE_PROJECT (포트폴리오 사이트) | VIBE_PROJECT |
| Claude | trading-bot (자동매매봇) | trading-bot |

### 규칙

- 각 에이전트는 자신이 담당하지 않는 프로젝트의 코드를 수정하지 않는다.
- 공유 지식 문서(`VIBE_PROJECT/knowledge/`)는 양쪽 에이전트 모두 읽고 쓸 수 있다.
- 작업 시작 전: `AGENT_SYNC.md` 상대방 섹션 읽기.
- 작업 종료 후: `AGENT_SYNC.md` 자신의 섹션 갱신.

---

## 4. 비밀 정보 관리 (Secrets)

### 절대 git에 올리면 안 되는 것

- API Key, Secret Key
- 계좌번호
- 개인 식별 정보
- `.env` 파일 자체

### 관리 방법

각 프로젝트 루트에 두 파일이 있다:

| 파일 | 용도 | git 추적 |
|---|---|---|
| `.env` | 실제 키 값 (로컬에만 존재) | ❌ 추적 안 함 |
| `.env.example` | 어떤 키가 필요한지 목록 (값 없음) | ✅ 추적 |

새 키를 발급받으면 `.env` 파일만 수정한다.

**trading-bot `.env` 경로:**
```
~/Desktop/trading-bot/.env
```

수정할 필드:
```
TOSS_CLIENT_ID=여기에_새_Client_ID
TOSS_CLIENT_SECRET=여기에_새_Secret_Key
```

### .gitignore 확인

각 프로젝트의 `.gitignore`에 반드시 포함되어야 하는 항목:

```
.env
logs/private/
```

새 프로젝트를 시작할 때 .gitignore부터 확인한다.

---

## 5. 프로젝트 간 데이터 흐름

```text
trading-bot/logs/public/   →   VIBE_PROJECT/content/logs/YYYY-MM-DD-trading-topic.md
```

trading-bot이 생성한 공개용 로그만 포트폴리오 사이트에 노출한다.

공개 기준은 `CROSS_PROJECT.md` 참고.

---

## 6. 새 세션 시작 체크리스트

새 에이전트가 투입되거나 세션을 새로 시작할 때:

1. [ ] 이 문서(`WORKSPACE_GUIDE.md`) 읽기
2. [ ] `PROJECT_CONTEXT.md` 읽기 (전체 방향)
3. [ ] `AGENT_SYNC.md` 읽기 (현재 에이전트 상태, 상대방 전달 사항)
4. [ ] `CROSS_PROJECT.md` 읽기 (프로젝트 간 연결 규칙)
5. [ ] 담당 프로젝트의 `knowledge/NEXT_ACTIONS.md` 읽기
6. [ ] `.env` 파일이 있고 git에 올라가지 않는지 확인

---

## 7. 새 프로젝트 추가 시 체크리스트

새 프로젝트를 시작할 때:

1. [ ] `~/Desktop/새프로젝트명/` 폴더 생성
2. [ ] `knowledge/PROJECT_CONTEXT.md` 작성 (이 가이드 참조 명시)
3. [ ] `knowledge/NEXT_ACTIONS.md` 작성
4. [ ] `.env.example` 작성 (필요한 키 목록)
5. [ ] `.gitignore` 작성 (`.env` 반드시 포함)
6. [ ] `WORKSPACE_GUIDE.md` 2번 테이블에 프로젝트 추가
7. [ ] `AGENT_SYNC.md` 담당 에이전트 추가
8. [ ] `CROSS_PROJECT.md` 데이터 흐름 추가
9. [ ] GitHub 비공개 레포 생성 (코드 포함 시)
10. [ ] `git init` → 첫 커밋 전 `git status`로 `.env` 미포함 확인

---

## 8. 커밋 전 필수 확인

```bash
git status
```

`.env`가 목록에 보이면 즉시 중단하고 `.gitignore`를 확인한다.

---

## 9. 공유 지식 문서 목록

`VIBE_PROJECT/knowledge/`에 있는 주요 문서:

| 문서 | 내용 |
|---|---|
| `WORKSPACE_GUIDE.md` | 이 문서. 전체 운영 방식 |
| `PROJECT_CONTEXT.md` | 전체 프로젝트 목적과 방향 |
| `AGENT_SYNC.md` | 에이전트 간 핸드오프 상태 |
| `CROSS_PROJECT.md` | 프로젝트 간 데이터 흐름 |
| `ROADMAP.md` | 전체 로드맵 |
| `NEXT_ACTIONS.md` | 포트폴리오 사이트 다음 작업 |
| `AI_WORK_RULES.md` | AI 작업 규칙 |
| `CONTENT_STRUCTURE.md` | content/ Markdown 구조 규칙 |
| `CODE_STRUCTURE.md` | app/components/lib 코드 파일 구조 규칙 |
