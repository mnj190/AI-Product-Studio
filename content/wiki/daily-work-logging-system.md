# Daily Work Logging System

## Summary

Daily Work Logging System은 AI와 함께 한 작업을 매일 아침 공유 가능한 기록으로 정리하는 운영 방식이다.

목적은 단순한 작업 일지가 아니라, AI를 어떤 식으로 사용했고 사람이 어디에서 방향을 잡았는지 보여주는 포트폴리오 콘텐츠를 만드는 것이다.

## Why It Exists

AI로 만든 프로젝트는 결과물만 보면 과정이 잘 보이지 않는다.

하지만 바이브 코딩을 처음 접하는 사람에게 정말 도움이 되는 정보는 “무엇을 만들었나”보다 “어떤 요청을 했고, 어떤 순서로 판단했으며, AI를 어디까지 믿고 어디서 사람이 개입했나”에 가깝다.

그래서 이 프로젝트는 매일 작업을 세 층으로 기록한다.

1. Build Log: 작업 단위 원장
2. Daily Digest: 하루치 공유용 요약
3. Prompt Note: 재사용 가능한 요청 패턴

## Daily Morning Routine

매일 아침 사용자가 “어제 작업 기록해줘”라고 요청하면 다음을 확인한다.

- git 상태와 최근 커밋
- 어제 날짜의 Build Log
- 아직 Daily Digest에 묶이지 않은 작업
- 중요한 사용자 요청과 방향 전환
- 공개할 수 있는 프롬프트
- 빌드와 화면 검증 결과
- 다음 작업으로 이어질 미해결 항목

이 과정을 통해 기억에 의존한 회고가 아니라 실제 변경 사항에 근거한 기록을 만든다.

## What Gets Recorded

모든 대화를 저장하지 않는다.

대신 결과에 영향을 준 요청만 선별한다.

- 프로젝트 방향을 바꾼 요청
- AI에게 역할과 제약을 명확히 준 요청
- 구현 순서나 검증 기준을 결정한 요청
- 초보자가 자기 프로젝트에 바꿔 쓸 수 있는 요청
- mock, 보류, 실패처럼 과정을 이해하는 데 필요한 결정

## AI Involvement

AI 사용량은 토큰 수나 시간을 추정하기보다 역할로 설명한다.

- Planning: 방향, 범위, 우선순위 설계
- Building: 코드, 문서, 콘텐츠 작성
- Reviewing: 빌드, 화면, git 상태, 누락 항목 검증
- Reflecting: 작업 결과를 공개 기록과 다음 액션으로 정리

이 방식은 “AI가 많이 했다”보다 “AI를 어떻게 사용했는지”를 더 잘 보여준다.

## Public Writing Style

공개 로그는 과장된 성공담보다 작업실 노트처럼 쓴다.

- 만든 결과를 먼저 말한다.
- AI가 한 일과 사람이 판단한 일을 구분한다.
- 중요한 프롬프트는 원문 또는 재사용 가능한 형태로 남긴다.
- 검증 결과를 숨기지 않는다.
- 아직 mock인 기능은 mock이라고 말한다.
- 민감한 정보는 요약하거나 제외한다.

## Related Files

- `knowledge/DAILY_WORK_LOGGING_SYSTEM.md`
- `content/prompts/daily-work-log.md`
- `content/logs/`
- `content/wiki/log.md`
