# 2026-06-26 - Home Recent Build Logs

## What I Did

홈 Build Log 섹션이 오래된 작업 로그를 보여주던 문제를 수정했다.

Build Log 목록 페이지는 최신순으로 보여주고 있었지만, 홈은 `getEntries("logs").slice(0, 2)`를 사용하고 있어 파일명 정렬 기준상 오래된 로그가 먼저 노출될 수 있었다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 홈에서는 최신 작업 흐름이 보여야 한다.
- Build Log 페이지와 일관되게 홈도 최신순을 사용한다.
- 홈에는 최근 로그 3개를 보여준다.

## Code Updated

- `app/page.tsx`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run build
npm run check:preview-env
```

로컬 서버 `http://127.0.0.1:3001`에서 `200 OK` 응답을 확인했다.

홈 HTML에서 다음 문구가 렌더링되는 것도 확인했다.

- `AI Product Studio`
- `LLM Wiki`
- `Build Log`
- `가장 최근에 AI와 함께 만든 기록`

## Next Step

- 홈의 다른 섹션도 최신성/발견성 기준으로 점검한다.
