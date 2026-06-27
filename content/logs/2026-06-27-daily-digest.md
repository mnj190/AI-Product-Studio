# 2026-06-27 - Daily Digest

## One-line Summary

2026-06-26 작업 기록을 보강하고, 포트폴리오를 멀티 프로젝트 허브로 운영하기 위한 문서 기준과 trading-bot 공개/답변 가드레일을 정리했다.

## What Changed

- `2026-06-26-daily-digest.md`에 누락된 후반 작업을 보강했다.
- 운영 문서의 검증 기준을 `npm run verify` 중심으로 통일했다.
- `WORKSPACE_GUIDE`, `AGENT_SYNC`, `CROSS_PROJECT`를 공유 지식 문서로 편입했다.
- trading-bot 공개 로그 전달 경로를 현재 포트폴리오 구조에 맞게 정리했다.
- trading-bot 프로젝트 문서에 Portfolio Integration 섹션을 추가했다.
- Ask About Me의 trading-bot 답변 가드레일을 강화했다.
- 계좌 잔고, 손익 금액, 매매 시점/수량처럼 민감하거나 투자 권유로 읽힐 수 있는 내용은 답변하지 않도록 정책과 코드 기준을 맞췄다.

## How AI Was Used

- Planning: 전날 작업 로그와 최근 커밋을 읽고, 기록되지 않은 후반 작업을 Daily Digest에 다시 묶었다.
- Building: README/knowledge/content 문서들을 현재 구현 구조에 맞게 갱신하고, answer guard와 eval 기준을 보강했다.
- Reviewing: `npm run verify`로 정적 빌드와 preview readiness를 반복 확인했다.
- Reflecting: 멀티 프로젝트 운영, 공개/비공개 경계, 투자 권유 방지 기준을 작업 로그와 Wiki Log에 남겼다.

## Human Decisions

- Vercel 연결은 여전히 사용자가 Option A/B/C 중 하나를 선택하기 전까지 진행하지 않는다.
- 작업 마무리 검증 기준은 `npm run verify`로 둔다.
- trading-bot 코드는 별도 비공개 레포에서 관리한다.
- 포트폴리오에는 공개 가능한 작업 로그와 기술적 의사결정만 반영한다.
- trading-bot 공개 로그는 현재 자동 노출 구조에 맞춰 `content/logs/YYYY-MM-DD-trading-topic.md` 형식으로 둔다.
- `content/logs/trading/` 하위 폴더를 쓰려면 먼저 콘텐츠 로더를 확장해야 한다.
- Ask About Me는 trading-bot 관련 투자 조언성 질문에서 provider를 호출하지 않는다.

## Important Prompts

### 1. 기록되지 않은 작업까지 Daily Digest에 반영하는 패턴

> 어제 한 작업 또는 기록되지 않은 모든 작업을 모아서 요약해서 기록해줘.

Why it mattered:

이미 Daily Digest가 있더라도 그 뒤에 추가 작업이 생길 수 있다. 이 요청 패턴은 기존 요약을 그대로 두지 않고, 최근 커밋과 Build Log를 다시 읽어 누락된 작업을 보강하게 만든다.

Reusable pattern:

```text
기존 Daily Digest가 있더라도 최근 커밋과 content/logs, content/wiki/log를 다시 확인해서 누락된 작업을 보강해줘. 새 Digest가 나은지 기존 Digest 보강이 나은지도 판단해줘.
```

### 2. 운영 문서의 기준을 최신 명령으로 통일하는 패턴

> 새 검증 명령이 생겼으니 오래된 운영 문서에 남아 있는 build/check 명령을 찾아 최신 기준으로 맞춰줘.

Why it mattered:

프로젝트가 커지면 문서마다 다른 명령을 안내하게 된다. 검증 기준을 `npm run verify`로 맞추면서 작업 전후 루틴이 단순해졌다.

Reusable pattern:

```text
현재 레포에서 반복 운영 기준이 바뀐 항목을 검색하고, 오래된 문서 표현을 최신 명령과 정책 기준으로 정렬해줘. 단, 배포 플랫폼 설정처럼 의도적으로 남겨야 하는 표현은 유지해줘.
```

### 3. 멀티 프로젝트 연결을 현재 구현 기준으로 점검하는 패턴

> 새로 발견된 공유 운영 문서를 읽고, 현재 포트폴리오 구현과 맞지 않는 경로나 자동화 설명이 있으면 정리해줘.

Why it mattered:

문서가 미래 구조를 먼저 말하면 실제 동작과 어긋날 수 있다. `content/logs/trading/` 자동 노출 설명을 현재 구현 기준인 `content/logs/*.md`로 고치면서 문서와 코드의 거리를 줄였다.

Reusable pattern:

```text
새 운영 문서가 생기면 현재 코드가 실제로 지원하는 경로, 자동화, 공개 기준과 비교해줘. 아직 구현되지 않은 동작은 “필요하면 별도 구현”으로 명시하고, 현재 가능한 경로를 우선 안내해줘.
```

### 4. 민감한 프로젝트를 포트폴리오에 안전하게 노출하는 패턴

> trading-bot 같은 민감한 프로젝트는 공개 가능한 내용과 공개하면 안 되는 내용을 프로젝트 문서와 답변 정책에 함께 정리해줘.

Why it mattered:

자동매매 프로젝트는 흥미롭지만 투자 권유나 민감 정보 노출 위험이 있다. 프로젝트 문서, Ask 답변 정책, 코드 가드레일, eval 기준을 함께 맞추면서 공개 가능한 개발 실험으로 다룰 수 있게 됐다.

Reusable pattern:

```text
[민감한 프로젝트]를 포트폴리오에 노출할 때 공개 가능한 내용, 제외할 민감 정보, 답변 가드레일, 평가 기준을 한 번에 맞춰줘. 사용자 질문에 답할 때도 같은 기준을 쓰게 해줘.
```

## Decisions

- `npm run verify`는 운영 문서의 기본 검증 기준이다.
- Vercel build command 안내처럼 배포 플랫폼 설정 맥락의 `npm run build` 표현은 유지한다.
- trading-bot 공개 로그는 `content/logs/YYYY-MM-DD-trading-topic.md`로 반영한다.
- trading-bot 관련 답변은 개발 실험, API 연동 구조, 로그 분석, AI 활용 방식 중심으로 제한한다.
- 종목 추천, 매수/매도 권유, 수익 보장, 구체적인 잔고/손익/매매 시점/수량은 답변하지 않는다.

## Lessons for Vibe Coding Beginners

- Daily Digest는 한 번 만들고 끝나는 문서가 아니라, 이후 누락 작업이 생기면 보강할 수 있는 공유 기록이다.
- 새 npm script를 만들었다면 README만 고치지 말고 runbook, lint checklist, ingest workflow 같은 운영 문서도 같이 맞춰야 한다.
- 여러 프로젝트를 연결할 때는 “원하는 구조”보다 “현재 코드가 실제 지원하는 구조”를 먼저 문서화해야 한다.
- 민감한 프로젝트는 기능보다 공개 기준을 먼저 세우는 편이 안전하다.
- AI에게 계속 진행을 맡기더라도, 외부 배포와 민감 정보는 명확한 가드레일로 제한해야 한다.

## Verification

오늘 각 작업 단위에서 다음 검증을 수행했다.

- `npm run verify` 여러 차례 성공
- 정적 페이지 85개 생성 확인
- 정적 페이지 86개 생성 확인
- 정적 페이지 87개 생성 확인
- 정적 페이지 88개 생성 확인
- 정적 페이지 89개 생성 확인
- 정적 페이지 90개 생성 확인
- preview env check 통과

## Related Build Logs

- `content/logs/2026-06-27-daily-digest-refresh.md`
- `content/logs/2026-06-27-verify-docs-alignment.md`
- `content/logs/2026-06-27-workspace-coordination-docs.md`
- `content/logs/2026-06-27-trading-bot-portfolio-integration.md`
- `content/logs/2026-06-27-trading-bot-answer-guard.md`

## Next Step

- GitHub에 올릴 준비가 되면 `npm run verify` 후 `git push origin main`을 실행한다.
- Vercel 연결 여부는 Option A/B/C 중 사용자 결정 후 진행한다.
- trading-bot에서 공개 가능한 첫 로그가 생기면 `content/logs/YYYY-MM-DD-trading-topic.md`로 반영한다.
