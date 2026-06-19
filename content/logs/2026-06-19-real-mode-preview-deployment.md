# 2026-06-19 - Real Mode Preview Deployment Decision

## What I Did

Ask About Me의 real LLM mode를 처음 켤 배포 환경을 결정했다.

Production에서는 계속 mock mode를 유지하고, 첫 real mode는 Vercel Preview Deployment에서만 제한적으로 켜는 방향으로 정리했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Official References Checked

- Vercel Environments
- Vercel Environment Variables

## Decisions

- 첫 real mode는 Vercel Preview Deployment에서만 켠다.
- Production은 `ASK_API_MODE=mock`을 유지한다.
- Preview environment variable에만 `ASK_API_MODE=real`, `LLM_API_KEY`, `LLM_MODEL`, `RATE_LIMIT_STORE=upstash`를 설정한다.
- Preview에서 `/ask/eval` 샘플을 통과하기 전 Production real mode 전환은 보류한다.
- 배포 연결과 secret 설정은 별도 사용자 승인/작업이 필요한 단계로 남긴다.

## Documents Added

- `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`
- `content/wiki/real-mode-preview-deployment.md`

## Documents Updated

- `README.md`
- `.env.example`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/index.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 production build를 확인했다.

```bash
npm run build
```

결과:

- build 성공
- 정적 페이지 56개 생성
- `/wiki/real-mode-preview-deployment` 상세 페이지 생성

로컬 개발 서버에서 다음을 확인했다.

- `/wiki/real-mode-preview-deployment`: Wiki 상세 문서 렌더링
- `/wiki/index`: Real Mode Preview Deployment 링크 노출
- `GET /api/ask`: 여전히 `mode: "mock"`, `rateLimitStore: "memory"` 상태 유지

## Next Step

- Vercel Preview Deployment 연결 여부 결정
- 필요하면 Vercel 프로젝트 연결과 Preview environment variable 설정 진행
