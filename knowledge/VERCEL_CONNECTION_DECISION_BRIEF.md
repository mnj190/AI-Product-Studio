# Vercel Connection Decision Brief

이 문서는 AI Product Studio를 Vercel에 연결할지 결정하기 위한 의사결정 요약이다.

2026-07-08 기준 결정 결과는 Option B이다.

Vercel project 연결과 mock-only Production 배포는 완료되었다.

공개 URL은 `https://ai-product-studio-psi.vercel.app/`이다.

Production real mode와 LLM secret 설정은 하지 않았다.

이 문서의 Option A/B/C 내용은 당시 선택지를 남기는 의사결정 기록으로 유지한다.

## Current State

- GitHub `main`과 로컬 `main`은 배포 기록 커밋 기준으로 동기화되어 있다.
- Vercel project는 `ai-vibe-project/ai-product-studio`에 연결되어 있다.
- Production URL은 `https://ai-product-studio-psi.vercel.app/`이다.
- Production real mode는 켜지지 않았다.
- `/api/ask` 기본값은 mock mode이다.
- Production smoke test는 `mode=mock`, `realModeReady=false`, `rateLimitStore=memory`로 통과했다.
- Preview readiness check가 준비되어 있다.
- Preview URL smoke test가 준비되어 있다.
- `/ask/eval`에 Deployment Gates가 노출되어 있다.

## Official Vercel Model

Vercel은 기본적으로 Local, Preview, Production 세 환경을 제공한다.

- Local: 로컬 개발과 테스트
- Preview: live setting에서 QA/협업을 하되 production site에 영향을 주지 않는 환경
- Production: 사용자에게 공개되는 live site

Preview deployment는 일반적으로 production branch가 아닌 branch push, pull request, 또는 `vercel` CLI의 non-production 배포에서 만들어진다.

Environment variable은 환경별로 다르게 둘 수 있으며, Preview variable은 전체 preview branch 또는 특정 branch에 적용할 수 있다.

## Decision Options

### Option A. Defer Vercel connection

지금은 Vercel 연결을 하지 않는다.

추천 상황:

- 포트폴리오 콘텐츠를 더 채우고 싶다.
- 외부 계정/배포 설정을 오늘 다루고 싶지 않다.
- real mode보다 문서 품질과 화면 완성도를 먼저 높이고 싶다.

결과:

- 현재 로컬/GitHub 중심 흐름을 유지한다.
- Production real mode는 계속 꺼져 있다.
- 다음 작업은 콘텐츠, UI, LLM Wiki 품질 개선으로 간다.

### Option B. Connect Vercel for mock-only Production

Vercel project를 GitHub repo와 연결하되, Production은 mock mode로만 배포한다.

추천 상황:

- 실제 웹 URL을 먼저 갖고 싶다.
- 포트폴리오를 공유 가능한 상태로 만들고 싶다.
- real LLM mode는 나중에 Preview에서만 검수하고 싶다.

필수 조건:

- Production environment variable은 `ASK_API_MODE=mock` 유지
- LLM API key를 Production에 넣지 않음
- 배포 후 `/api/ask` metadata에서 `mode=mock` 확인

결과:

- 공개 웹 URL이 생긴다.
- Ask About Me는 mock/default 흐름으로 안전하게 동작한다.
- real mode 검수는 아직 하지 않는다.

### Option C. Connect Vercel and prepare Preview real mode

Vercel project를 연결하고, Preview 환경에만 real mode 준비값을 넣는다.

추천 상황:

- 실제 LLM provider 답변 품질을 제한적으로 검수하고 싶다.
- Upstash Redis와 Preview environment variable 설정까지 진행할 준비가 되어 있다.
- `/ask/eval` 샘플을 직접 확인할 시간이 있다.

필수 조건:

- Production은 `ASK_API_MODE=mock`
- Preview에만 `ASK_API_MODE=real`
- Preview에만 `LLM_API_KEY`, `LLM_MODEL` 설정
- Preview에 `RATE_LIMIT_STORE=upstash`
- Upstash Redis credentials 설정
- `npm run check:preview-env` 통과
- Preview URL 생성 후 `npm run check:ask-url -- <preview-url>` 통과
- `/ask/eval` 수동 샘플 검수

결과:

- Preview URL에서 real mode 후보를 검수할 수 있다.
- Production real mode 전환은 여전히 별도 결정으로 남는다.

## Recommended Choice

선택 결과는 Option B이다.

이유:

- 포트폴리오 웹은 이미 정적 페이지와 mock Ask 흐름이 준비되어 있다.
- Production을 mock mode로 유지하면 외부 LLM 비용과 secret 리스크가 없다.
- 실제 공개 URL이 생기면 포트폴리오 공유와 화면 검수 속도가 빨라진다.
- real mode는 이후 Preview에서 제한적으로 검수하면 된다.

다음 선택지는 공개 URL 공유 전 polish를 더 할지, Preview real mode 검수 준비로 갈지 결정하는 것이다.

## Decision Prompt

사용자가 다음 중 하나로 결정하면 된다.

```text
Option A로 가자. Vercel 연결은 보류하고 콘텐츠/UI를 더 다듬자.
```

```text
Option B로 가자. Vercel에 연결하되 Production은 mock mode로만 배포하자.
```

```text
Option C로 가자. Vercel Preview에서 real mode 검수까지 준비하자.
```

## If Option B Is Chosen

상세 절차는 `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`를 따른다.

진행 순서:

1. Vercel project와 GitHub repo 연결
2. Production branch가 `main`인지 확인
3. Production environment variable에서 `ASK_API_MODE=mock` 확인
4. LLM API key를 Production에 넣지 않음
5. Production deploy 확인
6. 공개 URL에서 `/api/ask` GET 확인
7. `mode=mock`, `rateLimitStore=memory` 확인
8. 홈, `/ask`, `/ask/eval`, `/logs` 화면 확인

## If Option C Is Chosen

진행 순서:

1. Option B를 먼저 완료
2. Preview branch 생성
3. Preview environment variable 설정
4. Upstash Redis 연결
5. Preview deploy 생성
6. `npm run check:ask-url -- <preview-url>` 실행
7. `/ask/eval` 샘플 수동 검수
8. 결과를 Build Log에 기록

## Do Not

- Production에 `ASK_API_MODE=real`을 넣지 않는다.
- Production에 `LLM_API_KEY`를 넣지 않는다.
- Preview smoke test 전에 질문 POST를 보내지 않는다.
- `/ask/eval` 검수 없이 Production real mode 전환을 결정하지 않는다.

## Next Step

Option B는 완료되었다.

다음 단계는 아래 둘 중 하나다.

- 공개 URL 공유 전 콘텐츠/UI polish
- Option C 범위의 Preview real mode 검수 준비
