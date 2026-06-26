# Vercel Mock-only Production Deploy Report Template

이 문서는 Option B 배포 후 결과를 기록하기 위한 템플릿이다.

파일 위치:

- `content/logs/YYYY-MM-DD-vercel-mock-production-deploy.md`

## Template

```md
# YYYY-MM-DD - Vercel Mock-only Production Deploy

## What I Did

AI Product Studio를 Vercel Production에 mock-only 모드로 배포했다.

Production에서는 Ask About Me real mode를 켜지 않았고, 외부 LLM provider 호출도 활성화하지 않았다.

## Deployment Target

- Provider: Vercel
- Environment: Production
- Branch: main
- URL: <production-url>
- Mode: mock-only

## Safety Constraints

- `ASK_API_MODE=mock`
- Production에 `LLM_API_KEY` 없음
- Production에 `ASK_API_MODE=real` 없음
- Production real mode 전환 없음
- `/ask` 질문 POST로 provider 호출 테스트하지 않음

## Smoke Test

실행한 명령:

```bash
npm run check:ask-url -- <production-url>
```

결과:

- `GET /api/ask`: <pass/fail>
- `mode`: <mock/other>
- `realModeReady`: <true/false>
- `rateLimitStore`: <memory/upstash/other>
- `rateLimitProductionReady`: <true/false>
- `/ask/eval`: <pass/fail>
- `/wiki/vercel-preview-readiness-checklist`: <pass/fail>

## Manual Page Check

- `/`: <pass/fail>
- `/ask`: <pass/fail>
- `/ask/eval`: <pass/fail>
- `/wiki/vercel-connection-decision-brief`: <pass/fail>
- `/logs`: <pass/fail>

## Decisions

- Production은 mock mode로 유지한다.
- real mode 검수는 Preview에서만 별도로 진행한다.
- 다음 단계에서 Option C로 갈지, 콘텐츠/UI를 더 다듬을지 결정한다.

## Issues

- 없음
- 또는 발견된 문제:

## Next Step

- 공개 URL 공유 여부 결정
- Preview real mode 검수 여부 결정
- Daily Digest에 배포 결과 반영
```

## Prompt

배포 후에는 아래처럼 요청한다.

```text
방금 Vercel mock-only Production 배포 결과를 기록해줘.

다음 정보를 기준으로 `content/logs/YYYY-MM-DD-vercel-mock-production-deploy.md`를 작성해줘.

- Production URL:
- `/api/ask` metadata:
- smoke test 결과:
- 확인한 페이지:
- 발견한 문제:

Production real mode는 켜지 않았고, API key나 secret 값은 공개 로그에 쓰지 마.
```

## Do Not Record

- API key
- Vercel access token
- account email
- private project settings
- secret value

민감한 정보는 “설정됨/설정 안 됨” 정도로만 기록한다.
