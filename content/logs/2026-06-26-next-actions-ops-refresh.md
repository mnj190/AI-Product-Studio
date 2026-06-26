# 2026-06-26 - Next Actions Ops Refresh

## What I Did

`knowledge/NEXT_ACTIONS.md`에 최근 완료한 운영/온보딩 루틴을 반영했다.

README에 Repository Map, Local Development, Verification, Git Sync, Content Authoring 섹션이 추가되었고, `npm run dev:local`, `npm run verify` script도 생겼다. 하지만 Next Actions에는 이 완료 상태가 아직 드러나지 않았다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- `운영/온보딩 루틴 정리` 섹션을 새로 추가했다.
- 최근 README와 script 정리 작업을 완료 항목으로 기록했다.
- Vercel 연결 전 로컬 확인 기준을 `npm run check:preview-env`에서 `npm run verify`로 상향했다.
- Preview URL이 생긴 뒤의 safe GET smoke test는 별도 명령으로 유지했다.

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 84개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- Vercel 연결 여부를 결정하기 전까지는 콘텐츠/UI/LLM Wiki 품질 개선을 계속한다.
