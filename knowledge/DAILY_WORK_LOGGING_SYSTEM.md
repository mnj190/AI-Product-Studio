# Daily Work Logging System

이 문서는 매일 아침 AI와 함께 한 작업을 공유 가능한 기록으로 정리하기 위한 운영 규칙이다.

목적은 단순한 작업 일지가 아니다.

AI를 활용하면 어떤 방식으로 기획하고, 구현하고, 검증하고, 방향을 바꾸는지 보여주는 공개 학습 기록을 만든다.

## 기록 목적

매일 기록은 세 가지 질문에 답해야 한다.

1. 어제 무엇을 만들었나?
2. AI를 어떤 방식으로 사용했나?
3. 바이브 코딩을 처음 하는 사람이 무엇을 배울 수 있나?

기록의 최종 독자는 미래의 나와 바이브 코딩을 처음 접하는 사람이다.

따라서 “열심히 했다”보다 “어떤 요청을 했고, AI가 무엇을 처리했으며, 사람은 어디에서 판단했는지”가 더 중요하다.

## 기록 대상

매일 아침 사용자가 요청하면 다음 범위를 확인한다.

- 어제 날짜의 `content/logs/` 작업 로그
- 아직 커밋되지 않은 변경 사항
- 최근 커밋 중 아직 daily digest에 묶이지 않은 작업
- 중요한 사용자 요청, 방향 전환, 의사결정
- 재사용 가치가 있는 프롬프트
- 빌드/검증 결과
- 다음 작업으로 이어질 미해결 항목

## 아침 요청 트리거

사용자가 아래와 비슷하게 요청하면 Daily Work Logging Routine을 실행한다.

```text
어제 한 작업 기록해줘.
```

```text
기록되지 않은 작업 전부 모아서 Daily Digest 만들어줘.
```

```text
AI로 어떻게 작업했는지 공유할 수 있게 어제 작업 정리해줘.
```

요청이 짧아도 다음 의도를 포함한 것으로 해석한다.

- 최근 작업 상태를 확인한다.
- 빠진 Build Log가 있는지 찾는다.
- 하루 단위로 공유 가능한 Daily Digest를 만든다.
- 중요한 프롬프트를 초보자도 재사용할 수 있는 패턴으로 정리한다.
- 민감 정보는 공개 로그에서 제외한다.

## 미기록 작업 판별 기준

“기록되지 않은 작업”은 단순히 커밋되지 않은 파일만 의미하지 않는다.

아래 중 하나라도 해당하면 미기록 후보로 본다.

- 커밋은 되었지만 같은 날짜의 Build Log가 없는 작업
- Build Log는 있지만 Daily Digest에 묶이지 않은 작업
- 사용자 요청으로 방향이 바뀌었지만 `knowledge/`에 의사결정이 남지 않은 작업
- 공개 페이지에는 반영되었지만 `content/wiki/log.md`에 시간순 변경 기록이 없는 작업
- 중요한 프롬프트가 있었지만 `content/prompts/` 또는 Daily Digest에 남지 않은 작업
- 검증 결과가 구두로만 확인되고 로그에 남지 않은 작업

미기록 여부는 완벽한 자동 판정이 아니라, git 상태와 로그 문서를 함께 읽어 판단한다.

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

### 3. Prompt Note

재사용 가치가 높은 요청을 따로 저장하는 프롬프트 기록이다.

파일 위치:

- `content/prompts/topic.md`

포함 내용:

- Prompt
- When To Use
- Why It Works
- Reusable Pattern

Prompt Note는 모든 대화의 아카이브가 아니라, 다른 사람이 자신의 프로젝트에 적용할 수 있는 요청 패턴 모음이다.

## 매일 아침 요청 처리 절차

사용자가 “어제 작업 기록해줘”, “기록되지 않은 작업 정리해줘”, “오늘 로그 만들어줘”처럼 요청하면 아래 순서로 진행한다.

1. `git status --short --branch`로 미기록/미커밋 변경을 확인한다.
2. `git log --oneline --decorate -n 20`으로 최근 커밋 흐름을 확인한다.
3. `content/logs/`에서 어제 날짜 로그와 daily digest 존재 여부를 확인한다.
4. `content/wiki/log.md`에서 같은 작업이 Wiki 변경 기록에 남았는지 확인한다.
5. `content/prompts/`에서 중요한 프롬프트가 이미 보관되어 있는지 확인한다.
6. 빠진 작업이 있으면 Build Log를 먼저 추가한다.
7. 하루 전체를 묶는 Daily Digest를 작성한다.
8. 중요한 요청과 프롬프트를 “그대로 따라 해볼 수 있는 형태”로 정리한다.
9. `knowledge/NEXT_ACTIONS.md`에 다음 작업을 반영한다.
10. 가능하면 `npm run verify`로 웹에 노출되는 문서와 preview readiness가 정상인지 확인한다.

## Daily Digest 작성 방식

Daily Digest는 시간순 나열보다 “작업의 의미”가 먼저 보여야 한다.

권장 구조:

1. One-line Summary: 하루의 결과를 한 문장으로 말한다.
2. What Changed: 실제로 바뀐 결과물과 사용자에게 보이는 변화.
3. How AI Was Used: 기획, 구현, 검증, 기록에서 AI가 맡은 역할.
4. Human Decisions: 사용자가 방향을 잡은 순간과 의사결정.
5. Important Prompts: 결과를 바꾼 요청과 재사용 패턴.
6. Beginner Takeaways: 처음 하는 사람이 배울 수 있는 점.
7. Verification: 어떤 명령과 화면으로 확인했는지.
8. Next Step: 다음 아침에 이어갈 수 있는 가장 작은 작업.

## 프롬프트 선별 원칙

중요한 프롬프트는 “멋진 문장”이 아니라 “일을 바꾼 요청”이다.

선별할 때 다음 질문을 사용한다.

- 이 요청이 작업 방향을 바꿨나?
- AI에게 역할, 제약, 평가 기준을 명확히 줬나?
- 초보자가 그대로 바꿔 써도 효과가 있나?
- 구현보다 기획/판단/검증 방식을 보여주나?
- 결과물이 좋아진 이유를 설명할 수 있나?

기록할 때는 가능하면 원문을 남기되, 개인정보나 비공개 맥락은 제거한다.

## AI 사용량 표현 방식

“얼마나 AI를 썼는지”는 시간이나 토큰 수를 억지로 추정하지 않는다.

대신 아래 네 단계로 표현한다.

- Planning: 방향, 범위, 순서 설계에 AI를 사용했다.
- Building: 코드, 문서, 콘텐츠 생성에 AI를 사용했다.
- Reviewing: 빌드, 화면, git 상태, 누락 항목 검증에 AI를 사용했다.
- Reflecting: 결과를 공유 가능한 기록과 다음 작업으로 정리하는 데 AI를 사용했다.

필요하면 Daily Digest에 “AI Involvement” 섹션을 추가해 각 단계의 비중을 짧게 설명한다.

## 좋은 Daily Digest 기준

좋은 기록은 자랑보다 재현 가능성에 가깝다.

- 무엇을 만들었는지 결과 중심으로 쓴다.
- 왜 그렇게 결정했는지 남긴다.
- AI가 잘한 일과 사람이 방향을 잡은 일을 구분한다.
- 프롬프트는 짧더라도 맥락과 효과를 함께 적는다.
- 실패, 보류, mock 상태도 숨기지 않는다.
- 다음 사람이 같은 과정을 따라 할 수 있게 쓴다.
- “사용자 판단”과 “AI 실행”을 구분한다.
- 링크와 파일명을 남겨 결과물을 바로 확인할 수 있게 한다.

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

## 공개용 톤

공개 로그는 과장된 성공담보다 작업실 노트처럼 쓴다.

- 좋았던 점은 구체적으로 말한다.
- 막힌 점은 숨기지 않는다.
- 아직 mock인 것은 mock이라고 말한다.
- AI가 한 일을 마법처럼 표현하지 않는다.
- 사람이 왜 그 결정을 했는지 남긴다.

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
