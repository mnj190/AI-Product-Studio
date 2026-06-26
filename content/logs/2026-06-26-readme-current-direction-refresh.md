# 2026-06-26 - README Current Direction Refresh

## What I Did

README의 Next Direction이 현재 운영 판단과 조금 어긋나 있던 부분을 정리했다.

기존 README는 다음 단계가 Ask About Me real mode를 위한 Vercel Preview Deployment 준비 여부 결정이라고 설명했다. 하지만 현재 프로젝트 문서의 추천 흐름은 먼저 `Option B: Vercel 연결 + Production mock-only 배포`로 공개 URL을 확보하고, real mode는 이후 Preview에서 제한적으로 검수하는 것이다.

이 차이를 줄이기 위해 README의 Next Direction을 Vercel 연결 선택지 중심으로 갱신했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- Production은 계속 mock mode를 유지한다.
- 현재 추천은 Option B로 둔다.
- Vercel 계정 연결, secret 설정, 배포 실행은 사용자의 명시적 선택 전까지 진행하지 않는다.
- GitHub와 로컬 main 동기화 상태처럼 자주 바뀌는 정보는 고정 문장 대신 확인 명령 기준으로 쓴다.

## Documents Updated

- `README.md`
- `knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 문서 변경 범위와 정적 페이지 생성을 확인했다.

```bash
git diff -- README.md knowledge/VERCEL_CONNECTION_DECISION_BRIEF.md
npm run build
```

`npm run build`는 성공했고, 정적 페이지 74개가 생성되었다.

## Next Step

- 사용자가 Vercel Option A/B/C 중 하나를 선택하면 해당 runbook에 따라 진행한다.
- 선택 전에는 콘텐츠/UI/LLM Wiki 품질 개선을 계속한다.
