# 2026-07-09 - Post-deployment Status Refresh

## What I Did

Vercel mock-only Production 배포 이후, 공개 사이트와 문서가 여전히 “배포 전” 상태처럼 보이는 표현을 정리했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 남은 진행 사항을 계속 진행 해줘. 중간에 필요한게 있으면 물어봐줘.

## Updates Made

- README의 Current Status와 Next Direction을 mock-only Production 배포 완료 상태로 갱신했다.
- 홈의 운영 모드 CTA를 `Vercel 선택지 보기`에서 배포 기록으로 연결되게 바꿨다.
- Ask 페이지에서 “실제 Vercel 연결 전”이라고 보이던 stale 문구를 수정했다.
- Portfolio Site와 Ask About Me 프로젝트 문서에 공개 URL과 mock-only Production 상태를 반영했다.
- 공개 Wiki의 Vercel decision brief를 Option B 완료 상태로 갱신했다.
- `knowledge/NEXT_ACTIONS.md`의 공개 URL 공유 전 polish 항목을 완료 처리했다.

## Verification

다음 명령으로 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

결과:

- `npm run build` 성공
- 정적 페이지 109개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

Production URL도 다시 확인했다.

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

## Next Step

- 공개 URL 공유 여부를 결정한다.
- Preview real mode 검수를 진행할지 결정한다.
