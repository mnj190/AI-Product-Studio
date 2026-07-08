# 2026-07-08 - Next 15 Patch and Audit Refresh

## What I Did

Vercel 배포 전 남은 로컬 검증 항목을 다시 확인하고, Next 15 라인의 최신 패치를 적용했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 남은 진행 사항을 계속 진행 해줘. 중간에 필요한게 있으면 물어봐줘.

## Findings

- 로컬 `main`은 `origin/main`보다 29커밋 앞서 있고, 시작 시점 작업트리는 깨끗했다.
- `next@15` 라인의 최신 패치는 `15.5.20`이었다.
- `next@15.5.20` 적용 후 `npm run verify`는 성공했다.
- production build는 Next.js 15.5.20 기준으로 성공했고 정적 페이지 107개를 생성했다.
- Preview environment check는 local mock mode 기준으로 통과했다.
- `npm audit --audit-level=moderate`는 여전히 Next 내부 `postcss <8.5.10` advisory를 보고한다.
- `npm audit fix --force`는 breaking change 경로를 제안하므로 자동 적용하지 않았다.

## Updates Made

- `next`를 `^15.5.20`으로 올렸다.
- `package-lock.json`의 Next 및 SWC 패키지를 15.5.20으로 갱신했다.
- `knowledge/NEXT_AUDIT_TRIAGE.md`에 2026-07-08 audit 결과와 패치 확인 결과를 반영했다.
- `knowledge/NEXT_ACTIONS.md`에 Next 15 최신 패치 재확인 항목을 완료 처리했다.

## Verification

다음 명령으로 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

결과:

- `npm run build` 성공
- Next.js 15.5.20 build 성공
- 정적 페이지 107개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

로컬 dev 서버 smoke test도 추가로 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run dev:local
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run check:ask-url -- http://127.0.0.1:3001
```

결과:

- `GET /api/ask` 200
- `mode=mock`
- `realModeReady=false`
- `rateLimitStore=memory`
- `/ask/eval` 200
- `/wiki/vercel-preview-readiness-checklist` 200

추가 확인:

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm audit --audit-level=moderate
```

결과:

- Next 내부 PostCSS moderate advisory 2건이 남아 있다.
- 배포 전 risk acceptance 여부는 사용자 결정이 필요하다.

## Next Step

- Vercel Option B로 진행할지 결정한다.
- 배포 전 남은 Next 내부 PostCSS advisory를 수용할지, upstream patch를 더 기다릴지 결정한다.
- 사용자가 승인하면 `git push origin main`으로 로컬 커밋을 원격에 올린다.
