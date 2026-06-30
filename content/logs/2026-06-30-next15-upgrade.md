# 2026-06-30 - Next 15 Upgrade

## What I Did

Vercel 배포 전 Next.js audit 대응 경로를 확인하기 위해 Next 15와 Next 16 업그레이드를 로컬에서 검증했다.

결론은 Next 15.5.19로 업그레이드하고, Next 16은 보류하는 것이다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 나머지 작업들 계획 세워서 계속 진행해줘.

## Findings

- Next 14.2.35는 14 라인의 최신 버전이라 추가 patch path가 없었다.
- Next 15.5.19는 React 18.3.1과 호환되고 `npm run verify`를 통과했다.
- Next 15에서는 App Router page props 타입이 바뀌어 dynamic route `params`와 `/ask`의 `searchParams`를 await하는 형태로 수정해야 했다.
- Next 16.2.9는 Turbopack build 중 CSS/PostCSS 처리에서 샌드박스 포트 바인딩 오류가 나며 실패했다.
- Next 15와 Next 16 모두 npm audit의 Next 내부 PostCSS moderate advisory는 남았다.

## Updates Made

- `next`를 `^15.5.19`로 올렸다.
- dynamic route 상세 페이지 5개를 Next 15 page props 타입에 맞췄다.
- `/ask` page의 `searchParams`를 Promise 기반 타입으로 맞췄다.
- `next.config.mjs`에 `outputFileTracingRoot`를 명시해 상위 lockfile로 인한 workspace root 경고를 막았다.
- `knowledge/NEXT_AUDIT_TRIAGE.md`와 `knowledge/NEXT_ACTIONS.md`에 결정 결과를 반영했다.
- Next audit triage 문서에서 과거 Next 14 lockfile 상태와 현재 Next 15 결정 상태가 섞이지 않도록 표현을 정리했다.

## Verification

다음 명령으로 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- Next.js 15.5.19 build 성공
- 정적 페이지 106개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

추가 확인:

```bash
npm audit --audit-level=moderate
```

- Next 내부 PostCSS moderate advisory는 남아 있다.
- `npm audit fix --force`는 안전한 patch가 아니라 breaking change 경로를 제안하므로 적용하지 않았다.

## Next Step

- Vercel Option B/C 선택 전 남은 moderate advisory를 risk acceptance할지 upstream patch를 기다릴지 결정한다.
