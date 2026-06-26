# 2026-06-26 - Ask Eval Deployment Gates

## What I Did

`/ask/eval` 페이지에 Preview Deployment Gates 섹션을 추가했다.

이제 real mode 검수 기준 페이지에서 로컬 readiness, Preview smoke test, manual sample review 순서를 바로 볼 수 있다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 실제 Vercel 연결은 사용자 결정 전까지 진행하지 않는다.
- 대신 연결 직전까지 필요한 검수 절차를 웹 UI에 노출한다.
- `/ask/eval`은 품질 샘플뿐 아니라 배포 전 실행 명령까지 확인하는 운영 대시보드 역할을 한다.
- Preview smoke test는 safe GET 요청만 사용하며 질문 POST는 보내지 않는다는 점을 유지한다.

## Code Updated

- `app/ask/eval/page.tsx`
- `lib/ask-evaluation.ts`
- `app/globals.css`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run build
npm run check:preview-env
```

결과:

- `npm run build` 성공
- 정적 페이지 63개 생성
- `npm run check:preview-env` 성공

로컬 서버에서는 `/ask/eval` HTML에서 다음 문구가 렌더링되는지 확인했다.

- `Deployment Gates`
- `npm run check:preview-env`
- `npm run check:ask-url -- https://your-preview-url.vercel.app`
- `Smoke test runbook`

## Next Step

- 실제 Vercel Preview Deployment 연결 여부를 사용자가 결정한다.
- Preview URL이 생기면 `/ask/eval`의 Deployment Gates 순서대로 검수한다.
