# 2026-06-26 - Operating Mode Visibility

## What I Did

홈과 Ask 페이지에서 현재 운영 상태와 Preview 검수 흐름이 더 잘 보이도록 개선했다.

기존에는 Ask API mode가 mock이라는 점은 보였지만, Preview readiness check와 smoke test까지 준비된 상태가 방문자에게 충분히 드러나지 않았다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 홈에 Current Operating Mode 섹션을 추가한다.
- Production은 `mock mode`, Preview는 `gated real mode`, 검증은 `script-ready`로 표현한다.
- Ask 페이지의 Next Step은 real mode 일반 설명이 아니라 Preview 검수 흐름 중심으로 갱신한다.
- 실제 Vercel 연결은 여전히 사용자 결정 전까지 진행하지 않는다.

## Code Updated

- `app/page.tsx`
- `app/ask/page.tsx`

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
- 정적 페이지 65개 생성
- `npm run check:preview-env` 성공

로컬 서버에서는 홈과 `/ask` 페이지에서 다음 문구가 렌더링되는지 확인했다.

- `Current Operating Mode`
- `Production`
- `Preview`
- `script-ready`
- `Deployment Gates`
- `Smoke test runbook`

## Next Step

- 실제 Vercel Preview Deployment 연결 여부를 사용자가 결정한다.
- 연결 전까지는 홈, Ask, `/ask/eval`에서 현재 운영 상태와 검수 순서를 확인할 수 있다.
