# 2026-07-09 - Preview Real Mode Readiness Refresh

## What I Did

mock-only Production 배포가 완료된 이후 상태에 맞춰 Preview real mode 준비 문서와 `/ask/eval` 기준을 갱신했다.

실제 Preview secret, Upstash Redis, real mode 배포는 설정하지 않았다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 남은 진행 사항을 계속 진행 해줘. 중간에 필요한게 있으면 물어봐줘.

## Updates Made

- `knowledge/VERCEL_PREVIEW_READINESS_CHECKLIST.md`를 Vercel project 연결 완료 상태에 맞게 갱신했다.
- `knowledge/VERCEL_PREVIEW_SMOKE_TEST_RUNBOOK.md`에 mock-only Production 완료 상태와 secret 기록 금지 기준을 보강했다.
- `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`의 activation checklist를 현재 Vercel 연결 상태에 맞게 갱신했다.
- `knowledge/ASK_REAL_MODE_EVALUATION.md`와 공개 Wiki 문서를 Preview-only real mode 기준으로 정리했다.
- `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`에서 Preview URL 답변 기준을 현재 상태에 맞게 수정했다.
- `/ask/eval`의 deployment gate와 Vercel Preview sample 기준에서 오래된 "Vercel 연결 전" 표현을 제거했다.
- `knowledge/NEXT_ACTIONS.md`에 Preview readiness 문서 갱신과 Vercel Preview env 상태 확인을 완료 처리했다.
- `npm run check:vercel` 스크립트를 추가해 Vercel CLI 연결, env 목록, 공개 URL smoke test를 한 번에 확인할 수 있게 했다.

## Verification

Preview environment variable 이름 목록을 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin vercel env ls preview
```

결과:

```text
No Environment Variables found for ai-vibe-project/ai-product-studio
```

즉, 현재 Preview real mode secret은 아직 설정되지 않았다.

추가로 Vercel safety check를 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run check:vercel
```

결과:

- Vercel CLI authenticated: pass
- Local Vercel link points to `ai-product-studio`: pass
- Production env does not expose real mode markers: pass
- Preview env list is readable: pass
- Production public URL passes Ask smoke test: pass

## Safety Notes

- Production real mode는 켜지 않았다.
- Preview `LLM_API_KEY`를 설정하지 않았다.
- Upstash Redis credentials를 설정하지 않았다.
- secret 값은 문서, 로그, GitHub에 기록하지 않았다.

## Next Step

- Preview real mode 검수를 진행할지 결정한다.
- 진행한다면 Preview에만 `ASK_API_MODE=real`, `LLM_MODEL`, `LLM_API_KEY`, `RATE_LIMIT_STORE=upstash`, Upstash credentials를 설정한다.
- Preview URL이 생기면 `npm run check:ask-url -- <preview-url>`로 safe GET smoke test를 실행한다.
