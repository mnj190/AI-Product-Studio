# 2026-07-08 - Vercel Mock-only Production Deploy

## What I Did

AI Product Studio를 Vercel Production에 mock-only 모드로 연결하고 검수했다.

Production에서는 Ask About Me real mode를 켜지 않았고, 외부 LLM provider 호출도 활성화하지 않았다.

## Deployment Target

- Provider: Vercel
- Team: ai-vibe-project
- Project: ai-product-studio
- Environment: Production
- Branch: main
- URL: https://ai-product-studio-psi.vercel.app
- Mode: mock-only

## Safety Constraints

- Production에 `ASK_API_MODE=real` 없음
- Production에 `LLM_API_KEY` 없음
- Production environment variable 없음
- Production real mode 전환 없음
- `/ask` 질문 POST로 provider 호출 테스트하지 않음
- 남은 Next 내부 PostCSS moderate advisory는 mock-only Production 연결 범위에서 risk acceptance로 진행함

## Smoke Test

실행한 명령:

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run check:ask-url -- https://ai-product-studio-psi.vercel.app/
```

결과:

- `GET /api/ask`: pass, HTTP 200
- `mode`: mock
- `realModeReady`: false
- `rateLimitStore`: memory
- `rateLimitProductionReady`: false
- `/ask/eval`: pass, HTTP 200
- `/wiki/vercel-preview-readiness-checklist`: pass, HTTP 200

`rateLimitProductionReady=false`는 mock-only Production에서는 허용한다.

## Vercel CLI

Vercel CLI를 전역 설치하고 로컬 프로젝트를 기존 Vercel 프로젝트에 연결했다.

```text
Vercel CLI 54.21.1
```

연결 확인:

```text
ai-vibe-project/ai-product-studio
```

프로젝트 조회 결과:

```text
Project Name: ai-product-studio
Latest Production URL: https://ai-product-studio-psi.vercel.app
```

Production environment variable 조회 결과:

```text
No Environment Variables found
```

## Manual Page Check

공개 URL의 주요 페이지가 HTTP 200으로 응답하는지 확인했다.

- `/`: pass, HTTP 200
- `/ask`: pass, HTTP 200
- `/ask/eval`: pass, HTTP 200
- `/wiki/vercel-connection-decision-brief`: pass, HTTP 200
- `/logs`: pass, HTTP 200

## Decisions

- Production은 mock mode로 유지한다.
- real mode 검수는 Preview에서만 별도로 진행한다.
- Vercel CLI 연결 정보는 `.vercel/`에 로컬 전용으로 둔다.
- `.vercel/`은 git에 커밋하지 않는다.

## Issues

- Vercel CLI를 프로젝트 dev dependency로 설치하면 audit 항목이 크게 늘어나므로 적용하지 않았다.
- 전역 Vercel CLI 설치로 전환했다.
- Next 내부 PostCSS moderate advisory는 여전히 남아 있으며, mock-only Production 범위에서만 수용한다.

## Next Step

- 공개 URL 공유 여부를 결정한다.
- Preview real mode 검수 여부를 별도로 결정한다.
