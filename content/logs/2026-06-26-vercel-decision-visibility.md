# 2026-06-26 - Vercel Decision Visibility

## What I Did

Vercel 연결 여부를 결정하는 Decision Brief가 실제 화면에서 더 잘 보이도록 연결했다.

홈 Current Operating Mode 섹션에는 Vercel 선택지 링크를 추가했고, `/ask/eval` Deployment Gates의 첫 단계로 Connection decision을 추가했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 실제 Vercel 연결은 여전히 사용자 결정 전까지 진행하지 않는다.
- Decision Brief는 문서로만 두지 않고, 홈과 `/ask/eval`에서 접근 가능해야 한다.
- Deployment Gates는 검증 명령을 실행하기 전에 연결 전략부터 선택하도록 순서를 바꾼다.

## Code Updated

- `app/page.tsx`
- `lib/ask-evaluation.ts`

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
- 정적 페이지 68개 생성
- `npm run check:preview-env` 성공

로컬 서버에서는 다음 문구가 렌더링되는지 확인했다.

- `Vercel 선택지 보기`
- `Connection decision`
- `Vercel 연결을 보류할지`

## Next Step

사용자가 Option A/B/C 중 하나를 선택한다.
