# 2026-06-30 - Next Audit Triage

## What I Did

Tailwind 설치 후 `npm audit`에서 보고된 Next.js 관련 advisory를 배포 전 판단 문서로 정리했다.

`npm audit fix --force`는 Next 16 설치를 제안했지만, 현재 프로젝트는 Next 14 App Router 기반으로 구성되어 있어 major upgrade를 자동 적용하지 않았다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 나머지 작업들 계획 세워서 계속 진행해줘.

## Findings

- `npm audit --audit-level=moderate`는 Next.js high advisory와 Next 내부 PostCSS moderate advisory를 보고했다.
- 자동 수정 경로는 `next@16.2.9` 설치를 포함하므로 breaking change 가능성이 있다.
- 현재 앱은 `next/image`, `images.remotePatterns`, middleware/proxy, rewrites, `beforeInteractive` script, WebSocket upgrade route를 사용하지 않는다.
- `next.config.mjs`는 빈 설정이다.

## Updates Made

- `knowledge/NEXT_AUDIT_TRIAGE.md`를 추가했다.
- `knowledge/NEXT_ACTIONS.md`의 audit 검토 항목을 완료 처리하고, 배포 전 보안 패치 경로 확인을 남겼다.
- `content/wiki/log.md`에 triage 기록을 추가했다.

## Verification

다음 명령으로 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 105개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- Vercel Option B/C를 선택하기 전에 Next.js 보안 패치 경로를 확인한다.
