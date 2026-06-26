# 2026-06-26 - Featured Content Guard

## What I Did

홈 대표 콘텐츠 helper가 누락된 slug를 조용히 숨기지 않도록 바꿨다.

홈에 노출할 대표 프로젝트와 프롬프트는 의도적으로 고른 콘텐츠다. 따라서 파일명이 바뀌거나 문서가 삭제되었을 때 카드가 하나 사라진 채로 넘어가는 것보다, 빌드 시점에 바로 실패하는 편이 더 안전하다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- `getEntriesBySlugs()`는 strict helper로 취급한다.
- 요청한 slug가 없으면 `Missing content entry: section/slug.md` 에러를 던진다.
- 홈 대표 콘텐츠 누락은 조용히 fallback하지 않고 빌드에서 발견한다.

## Code Updated

- `lib/content.ts`

## Documents Updated

- `content/logs/2026-06-26-featured-home-content.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run build
```

`npm run build`는 성공했고, 정적 페이지 77개가 생성되었다.

## Next Step

- 대표 콘텐츠 slug를 바꿀 때는 실제 Markdown 파일이 있는지 함께 확인한다.
