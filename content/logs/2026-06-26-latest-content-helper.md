# 2026-06-26 - Latest Content Entries Helper

## What I Did

홈과 Build Log 목록에서 최신 로그를 보여주는 방식을 공통 helper로 정리했다.

기존에는 각 페이지가 `getEntries("logs").reverse()`를 직접 호출했다. 동작은 가능하지만, “최신순 콘텐츠를 가져온다”는 의도가 페이지마다 흩어져 있었다.

이제 `lib/content.ts`의 `getLatestEntries()`를 통해 최신순 목록을 가져온다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 최신순 정렬 의도는 콘텐츠 유틸에 둔다.
- 홈은 `getLatestEntries("logs", 3)`로 최근 로그 3개를 보여준다.
- Build Log 목록은 `getLatestEntries("logs")`로 전체 로그를 최신순으로 보여준다.
- 상세 페이지의 이전/다음 탐색은 기존 전체 정렬을 유지한다.

## Code Updated

- `lib/content.ts`
- `app/page.tsx`
- `app/logs/page.tsx`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `content/logs/2026-06-26-home-recent-build-logs.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run build
```

`npm run build`는 성공했고, 정적 페이지 75개가 생성되었다.

## Next Step

- 홈의 프로젝트/프롬프트 섹션은 다음 작업에서 “대표 콘텐츠” 기준으로 정리했다.
