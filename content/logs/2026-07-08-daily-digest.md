# 2026-07-08 - Daily Digest

## One-line Summary

Vercel mock-only Production 배포를 완료하고, 공개 URL에서 Ask About Me가 안전한 mock mode로 동작하는지 검증했다.

## What Changed

- Next 15 라인의 최신 패치인 `15.5.20`을 적용했다.
- `npm run verify`로 production build와 preview readiness check를 재확인했다.
- `npm audit --audit-level=moderate`를 다시 실행해 Next 내부 PostCSS moderate advisory가 남아 있음을 확인했다.
- 남은 advisory는 mock-only Production 범위에서 risk acceptance로 진행하기로 정리했다.
- 사용자가 Vercel Dashboard에서 `ai-product-studio` 프로젝트를 연결했다.
- 로컬 `main`에 쌓여 있던 커밋을 GitHub `main`으로 push했다.
- Vercel Production URL `https://ai-product-studio-psi.vercel.app/`에서 safe GET smoke test를 통과했다.
- `/api/ask` metadata가 `mode=mock`, `realModeReady=false`, `rateLimitStore=memory`임을 확인했다.
- Vercel CLI를 전역 설치하고 로컬 프로젝트를 `ai-vibe-project/ai-product-studio`에 연결했다.
- Production environment variable이 없음을 확인했다.
- `.vercel/`은 로컬 연결 정보로 보고 git ignore 처리했다.

## How AI Was Used

- Planning: 남은 배포 전 게이트를 `verify`, audit, smoke test, 기록 순서로 정렬했다.
- Building: Next patch, runbook, 배포 결과 로그, Wiki log, Next Actions를 현재 상태에 맞게 갱신했다.
- Reviewing: Vercel public URL과 로컬 dev URL을 safe GET smoke test로 확인했다.
- Reflecting: Vercel Dashboard 연결, CLI 연결, mock-only Production 검수 결과를 공개 가능한 Build Log로 정리했다.

## Human Decisions

- Vercel Dashboard 연결은 사용자가 직접 수행했다.
- Production은 mock-only로 유지한다.
- Production에는 `LLM_API_KEY`와 real mode secret을 넣지 않는다.
- real mode 검수는 Production이 아니라 Preview에서만 별도로 진행한다.
- Vercel CLI는 프로젝트 dev dependency가 아니라 전역 설치로 둔다.

## Important Prompts

### 1. 남은 진행 사항을 멈추지 않고 이어가는 패턴

> 남은 진행 사항을 계속 진행 해줘. 중간에 필요한게 있으면 물어봐줘.

Why it mattered:

큰 목표가 남아 있을 때, AI가 로컬에서 안전하게 할 수 있는 작업과 사용자 승인이 필요한 작업을 분리하게 만들었다. 이 요청 덕분에 배포 전 검증, audit triage, 문서화는 계속 진행하고, Vercel 계정 연결과 URL 확인은 사용자와 나눠서 처리할 수 있었다.

Reusable pattern:

```text
남은 진행 사항을 계속 진행해줘. 외부 계정, 결제, secret, 배포처럼 사용자 결정이 필요한 지점에서는 멈춰서 물어보고, 그 전까지 로컬 검증과 문서화는 진행해줘.
```

### 2. Dashboard와 CLI를 연결해 검증하는 패턴

> 일단 vercel 연결하고 싶은데 내가 직접 dashboard 에서 연결했어.

Why it mattered:

사용자가 Dashboard 연결을 맡고, AI가 GitHub push, Production URL smoke test, CLI 연결 확인, 배포 기록 정리를 맡는 협업 흐름이 만들어졌다.

Reusable pattern:

```text
배포 플랫폼의 Dashboard 연결은 내가 직접 했어. 이제 레포 push, CLI 연결 확인, 공개 URL smoke test, 배포 결과 기록을 이어서 처리해줘.
```

## Beginner Takeaways

- Production에 실제 LLM을 붙이기 전에도 mock-only 배포로 공개 URL과 운영 흐름을 먼저 검증할 수 있다.
- 배포 성공만 확인하지 말고 `/api/ask` 같은 metadata endpoint로 실제 mode를 확인해야 한다.
- CLI가 보여주는 URL과 실제 공유 URL이 다를 수 있으므로, 공유할 URL을 기준으로 smoke test를 해야 한다.
- Vercel CLI 같은 배포 도구는 프로젝트 dependency에 넣으면 audit noise가 커질 수 있어 전역 설치가 더 나을 때가 있다.
- `.vercel/` 같은 로컬 연결 정보는 git에 커밋하지 않는다.

## Verification

로컬 검증:

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

결과:

- `npm run build` 성공
- Next.js 15.5.20 build 성공
- 정적 페이지 109개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

Production smoke test:

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run check:ask-url -- https://ai-product-studio-psi.vercel.app/
```

결과:

- `GET /api/ask` 200
- `mode=mock`
- `realModeReady=false`
- `rateLimitStore=memory`
- `/ask/eval` 200
- `/wiki/vercel-preview-readiness-checklist` 200

## Related Build Logs

- `content/logs/2026-07-08-next15-patch-audit-refresh.md`
- `content/logs/2026-07-08-vercel-dashboard-connection.md`
- `content/logs/2026-07-08-vercel-mock-production-deploy.md`

## Next Step

- 공개 URL을 바로 공유할지 결정한다.
- 또는 Vercel Preview real mode 검수 준비로 넘어갈지 결정한다.
