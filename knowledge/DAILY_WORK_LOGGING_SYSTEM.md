# Daily Work Logging System

이 문서는 매일 아침 AI와 함께 한 작업을 공유 가능한 기록으로 정리하기 위한 운영 규칙이다.

목적은 단순한 작업 일지가 아니다.

AI를 활용하면 어떤 방식으로 기획하고, 구현하고, 검증하고, 방향을 바꾸는지 보여주는 공개 학습 기록을 만든다.

## 기록 목적

매일 기록은 세 가지 질문에 답해야 한다.

1. 어제 무엇을 만들었나?
2. AI를 어떤 방식으로 사용했나?
3. 바이브 코딩을 처음 하는 사람이 무엇을 배울 수 있나?

## 기록 대상

매일 아침 사용자가 요청하면 다음 범위를 확인한다.

- 어제 날짜의 `content/logs/` 작업 로그
- 아직 커밋되지 않은 변경 사항
- 최근 커밋 중 아직 daily digest에 묶이지 않은 작업
- 중요한 사용자 요청, 방향 전환, 의사결정
- 재사용 가치가 있는 프롬프트
- 빌드/검증 결과
- 다음 작업으로 이어질 미해결 항목

## 로그 종류

### 1. Build Log

작업 단위 기록이다.

파일 위치:

- `content/logs/YYYY-MM-DD-topic.md`

포함 내용:

- What I Did
- AI Used
- Prompts Used
- Decisions
- Code Updated
- Documents Updated
- Verification
- Next Step

### 2. Daily Digest

하루치 공유용 요약이다.

파일 위치:

- `content/logs/YYYY-MM-DD-daily-digest.md`

포함 내용:

- 하루 요약
- 만든 것
- AI를 쓴 방식
- 중요한 프롬프트
- 의사결정
- 초보자가 배울 점
- 검증 결과
- 다음 작업

Daily Digest는 여러 Build Log를 읽고 사람이 한 번에 이해할 수 있게 묶는 문서다.

## 매일 아침 요청 처리 절차

사용자가 “어제 작업 기록해줘”, “기록되지 않은 작업 정리해줘”, “오늘 로그 만들어줘”처럼 요청하면 아래 순서로 진행한다.

1. `git status --short --branch`로 미기록/미커밋 변경을 확인한다.
2. `git log --oneline --decorate -n 20`으로 최근 커밋 흐름을 확인한다.
3. `content/logs/`에서 어제 날짜 로그와 daily digest 존재 여부를 확인한다.
4. 빠진 작업이 있으면 Build Log를 먼저 추가한다.
5. 하루 전체를 묶는 Daily Digest를 작성한다.
6. 중요한 요청과 프롬프트를 “그대로 따라 해볼 수 있는 형태”로 정리한다.
7. `knowledge/NEXT_ACTIONS.md`에 다음 작업을 반영한다.
8. 가능하면 `npm run build`로 웹에 노출되는 문서가 정상 빌드되는지 확인한다.

## 좋은 Daily Digest 기준

좋은 기록은 자랑보다 재현 가능성에 가깝다.

- 무엇을 만들었는지 결과 중심으로 쓴다.
- 왜 그렇게 결정했는지 남긴다.
- AI가 잘한 일과 사람이 방향을 잡은 일을 구분한다.
- 프롬프트는 짧더라도 맥락과 효과를 함께 적는다.
- 실패, 보류, mock 상태도 숨기지 않는다.
- 다음 사람이 같은 과정을 따라 할 수 있게 쓴다.

## 프롬프트 기록 기준

모든 대화를 저장하지 않는다.

다음 조건 중 하나를 만족하는 요청만 기록한다.

- 프로젝트 방향을 바꾼 요청
- AI에게 역할이나 작업 방식을 정한 요청
- 구현 순서를 결정한 요청
- 초보자가 그대로 참고할 수 있는 요청
- 결과물의 품질을 크게 바꾼 요청

기록할 때는 아래 형식을 사용한다.

```md
### Prompt

> 사용자 요청 원문 또는 정리된 요청

### Why It Mattered

이 요청이 작업 방향, 결과물, 의사결정에 준 영향.

### Reusable Pattern

다른 사람이 자기 프로젝트에서 바꿔 쓸 수 있는 형태.
```

## 공개 기준

공개 로그에는 다음을 넣지 않는다.

- API key, token, 비밀번호
- 비공개 계정 정보
- 개인 연락처
- 타인의 비공개 정보
- 아직 공개하면 안 되는 사업/투자/계약 정보
- 그대로 복사하면 보안상 위험한 운영 명령

민감한 내용은 요약하거나 “비공개 정보”로 대체한다.

## 추천 파일 흐름

새로운 하루 기록을 남길 때는 보통 아래 파일을 함께 본다.

- `content/logs/`
- `knowledge/NEXT_ACTIONS.md`
- `knowledge/ROADMAP.md`
- `knowledge/PROJECT_CONTEXT.md`
- `content/wiki/log.md`
- `content/prompts/`

## Daily Digest Template

```md
# YYYY-MM-DD - Daily Digest

## One-line Summary

하루 동안 만든 결과를 한 문장으로 요약한다.

## What Changed

- 주요 변경 1
- 주요 변경 2
- 주요 변경 3

## How AI Was Used

- 기획:
- 구현:
- 검증:
- 기록:

## Important Prompts

### Prompt 1

> 실제 요청 또는 재사용 가능한 형태

Why it mattered:

Reusable pattern:

## Decisions

- 결정 1
- 결정 2

## Lessons for Vibe Coding Beginners

- 배울 점 1
- 배울 점 2
- 배울 점 3

## Verification

- 확인한 명령/결과

## Related Build Logs

- `content/logs/...`

## Next Step

- 다음 작업
```
