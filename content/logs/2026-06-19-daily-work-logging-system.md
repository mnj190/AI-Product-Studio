# 2026-06-19 - Daily Work Logging System

## What I Did

매일 아침 AI와 함께 한 작업을 기록하기 위한 Daily Work Logging System을 설계했다.

기존 `content/logs/`는 작업 단위 Build Log로 유지하고, 하루 전체를 공유용으로 묶는 Daily Digest를 추가하는 방식으로 정리했다.

이후 사용자의 추가 요청에 맞춰, “어제 작업”뿐 아니라 “기록되지 않은 모든 작업”을 찾는 기준과 아침 요청 루틴을 더 구체화했다.

## AI Used

- Codex

## Prompts Used

사용자 요청:

> 매일매일 한 작업을 기록하고 싶어. 목적은 AI 로 어떤 식으로 어떻게 얼마나 공유하기 위한거야. 내가 매일 아침에 요청할 떄니까 어제 한 작업. 또는 기록되지 않은 모든 작업을 모아서 요약해서 기록해주고 중요했던 요청이나 프롬프트도 바이브 코딩을 처음하는 사람들이 참고할 수 있도록 해줘.

## Decisions

- Build Log와 Daily Digest를 분리한다.
- Build Log는 작업 단위 원장으로 유지한다.
- Daily Digest는 하루치 공유용 콘텐츠로 만든다.
- 중요한 프롬프트는 원문, 의미, 재사용 패턴을 함께 기록한다.
- Prompt Note는 모든 대화 저장소가 아니라 재사용 가능한 요청 패턴 모음으로 유지한다.
- AI 사용량은 토큰 수 추정보다 Planning, Building, Reviewing, Reflecting 역할로 설명한다.
- 민감한 정보는 공개 로그에 넣지 않는다.

## Documents Added

- `knowledge/DAILY_WORK_LOGGING_SYSTEM.md`
- `content/prompts/daily-work-log.md`
- `content/logs/2026-06-18-daily-digest.md`
- `content/wiki/daily-work-logging-system.md`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`
- `content/wiki/index.md`
- `content/prompts/daily-work-log.md`

## Verification

`npm run build`로 새 문서와 Prompt Library 항목이 정상 렌더링되는지 확인한다.

## Next Step

- 프로젝트/위키 상세 페이지 읽기 경험 개선
- 이후 real LLM provider adapter와 rate limit 정책 설계 여부 결정
