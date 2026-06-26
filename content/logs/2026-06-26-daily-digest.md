# 2026-06-26 - Daily Digest

## One-line Summary

Ask About Me real mode를 실제 Vercel에 연결하기 전, readiness check, smoke test, decision brief, mock-only Production runbook, 배포 기록 템플릿까지 갖춘 안전한 배포 준비 흐름을 만들었다.

## What Changed

- Vercel Preview real mode 준비 상태를 로컬에서 확인하는 `npm run check:preview-env` 명령을 추가했다.
- Preview URL이 생긴 뒤 안전한 GET 요청만 보내는 `npm run check:ask-url` smoke test를 추가했다.
- Preview readiness checklist와 smoke test runbook을 `knowledge/`와 공개 Wiki 문서로 정리했다.
- `/ask/eval` 페이지에 Deployment Gates 섹션을 추가했다.
- `/ask/eval`에서 local readiness, preview smoke test, manual sample review 순서를 바로 볼 수 있게 했다.
- 홈에 Current Operating Mode 섹션을 추가해 Production, Preview, Verification 상태를 한눈에 보여준다.
- Ask 페이지의 Next Step을 Preview readiness와 smoke test 중심으로 갱신했다.
- Vercel 연결 여부를 Option A/B/C로 판단하는 Decision Brief를 작성했다.
- 홈과 `/ask/eval`에서 Vercel 선택지와 Connection decision을 바로 찾을 수 있게 했다.
- 현재 추천인 Option B를 위한 mock-only Production 배포 runbook을 만들었다.
- Option B 배포 후 결과를 기록할 deploy report template과 Prompt Library 항목을 추가했다.
- Production real mode는 여전히 켜지지 않았고, 실제 Vercel 계정이나 secret은 건드리지 않았다.

## How AI Was Used

- Planning: 실제 Vercel 연결로 바로 가지 않고, 연결 전 검수 체계와 의사결정 흐름을 먼저 만드는 순서로 작업을 쪼갰다.
- Building: 환경 변수 점검 스크립트, URL smoke test 스크립트, `/ask/eval` Deployment Gates UI, 홈/Ask 운영 상태 UI, Option B runbook, 배포 결과 기록 템플릿을 구현했다.
- Reviewing: `npm run build`, `npm run check:preview-env`, `npm run check:ask-url`, 로컬 HTML 확인으로 결과를 검증했다.
- Reflecting: 각 작업 단위 Build Log를 남기고 하루치 Daily Digest로 묶었다.

## Human Decisions

- 실제 Vercel project 연결, secret 입력, Preview Deployment 실행은 사용자 결정 전까지 하지 않는다.
- Preview readiness check는 secret 값을 출력하지 않고 설정 여부와 위험 상태만 보여준다.
- Preview smoke test는 질문 POST를 보내지 않고 safe GET endpoint만 확인한다.
- real mode인데 memory rate limit이면 실패로 본다.
- `/ask/eval`은 품질 평가 페이지이면서 배포 전 운영 대시보드 역할도 맡는다.
- 홈과 Ask 페이지에서도 Production mock, Preview gated real mode, script-ready verification 상태를 보여준다.
- Vercel 연결은 Option A/B/C 중 사용자가 선택한 뒤 진행한다.
- 현재 추천은 Option B, 즉 Vercel 연결 + Production mock-only 배포이다.
- Option B 배포 후에는 Production URL, `/api/ask` metadata, smoke test 결과를 별도 Build Log로 기록한다.

## Important Prompts

### 1. 계속 작은 단위로 진행하게 만든 요청

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

Why it mattered:

이 요청이 있었기 때문에 AI가 현재 상태를 읽고, 외부 계정을 건드리지 않는 안전한 다음 단계를 찾아 순차적으로 구현했다.

Reusable pattern:

```text
현재 프로젝트 상태를 기준으로 외부 서비스나 secret을 건드리지 않는 안전한 다음 작업을 찾아, 작은 단위로 구현·검증·기록해줘.
```

### 2. 실제 연결 전 검수 체계를 먼저 만든 패턴

> 실제 배포 연결 전에 readiness checklist, smoke test, 수동 검수 순서를 먼저 준비해줘.

Why it mattered:

LLM 기능은 연결 자체보다 운영 안전성이 중요하다. 이 패턴은 API key를 넣기 전 비용, 보안, 품질 기준을 먼저 정리하게 만든다.

Reusable pattern:

```text
[외부 서비스]를 실제로 연결하기 전에, 로컬 readiness check, 배포 URL smoke test, 수동 검수 runbook을 먼저 만들어줘. secret 값은 출력하지 말고, 실패 조건과 stop condition도 명확히 정리해줘.
```

### 3. UI에 운영 절차를 노출한 패턴

> 문서에만 두지 말고, 실제 검수 화면에서 다음 실행 명령과 관련 문서를 바로 볼 수 있게 해줘.

Why it mattered:

검수 절차가 문서 어딘가에만 있으면 실제 운영 때 놓치기 쉽다. `/ask/eval` 안에 Deployment Gates를 노출하면서 품질 평가와 배포 전 확인 절차가 한 화면에 모였다.

Reusable pattern:

```text
운영 체크리스트를 별도 문서에만 두지 말고, 실제 검수 화면에도 다음 실행 명령, 관련 문서 링크, stop condition이 보이도록 연결해줘.
```

### 4. 현재 운영 상태를 방문자에게 보이게 만든 패턴

> 현재는 mock인지, Preview에서만 real mode를 검수하는지, 어떤 검증 스크립트가 준비됐는지 홈과 Ask 페이지에서 바로 보이게 해줘.

Why it mattered:

내부적으로 안전장치를 만들어도 방문자가 볼 수 없으면 포트폴리오의 설계 의도가 약해진다. 이 요청 패턴은 운영 상태 자체를 제품 경험의 일부로 보여주게 만든다.

Reusable pattern:

```text
내부 운영 상태를 문서에만 두지 말고, 사용자가 보는 주요 화면에도 [현재 mode], [검수 환경], [다음 확인 명령]이 보이도록 정리해줘.
```

### 5. 배포 선택지를 결정 가능한 형태로 만든 패턴

> 실제 외부 배포를 하기 전에 선택지를 Option A/B/C로 나누고, 추천안과 각 선택의 조건을 문서와 화면에 연결해줘.

Why it mattered:

Vercel 연결은 외부 계정과 공개 URL을 다루는 결정이다. 선택지를 나누면서 “지금 바로 real mode”가 아니라 “mock-only Production”이라는 안전한 중간 경로가 분명해졌다.

Reusable pattern:

```text
[외부 서비스 연결] 전에 선택지를 A/B/C로 나누고, 각 선택의 조건, 리스크, 추천안을 Decision Brief로 정리해줘. 추천 선택지는 실제 실행 runbook으로 이어지게 해줘.
```

### 6. 배포 후 기록까지 미리 준비한 패턴

> 배포 runbook만 만들지 말고, 배포 후 URL, API metadata, smoke test 결과를 기록할 템플릿과 프롬프트도 만들어줘.

Why it mattered:

배포는 완료 순간보다 사후 기록이 중요하다. 결과 기록 템플릿을 미리 만들면 공개 URL, mock mode 상태, 안전 제약, 발견한 문제를 빠뜨리지 않는다.

Reusable pattern:

```text
[배포 작업] 이후 사용할 report template을 만들어줘. 배포 URL, API metadata, smoke test 결과, manual check, 안전 제약, 다음 작업을 포함하고 secret은 기록하지 않게 해줘.
```

## Decisions

- `npm run check:preview-env`는 로컬 환경 변수 상태를 점검하되 secret 값을 출력하지 않는다.
- `npm run check:ask-url`은 safe GET 요청만 사용한다.
- smoke test 대상은 `/api/ask`, `/ask/eval`, `/wiki/vercel-preview-readiness-checklist`이다.
- Preview real mode에서 `rateLimitStore=memory` 또는 `rateLimitProductionReady=false`이면 실패로 본다.
- `/ask/eval`에 Deployment Gates를 추가해 readiness → smoke test → manual review 순서를 노출한다.
- 홈에 Current Operating Mode를 추가해 Production mock mode, Preview gated real mode, script-ready 상태를 보여준다.
- Ask 페이지의 Next Step은 real mode 일반 설명이 아니라 Preview 검수 흐름으로 유지한다.
- Vercel 연결 결정은 Option A/B/C로 나눈다.
- 현재 추천은 Option B: Vercel 연결 + Production mock-only 배포이다.
- Option B에는 별도 mock-only Production runbook을 둔다.
- Option B 배포 후 결과는 deploy report template으로 기록한다.
- 실제 Vercel 연결 여부는 여전히 별도 사용자 결정이 필요한 단계로 남긴다.

## Lessons for Vibe Coding Beginners

- 외부 API 연결 전에는 “연결 방법”보다 “연결해도 되는 상태인지 확인하는 방법”을 먼저 만들면 좋다.
- secret을 다루는 스크립트는 값을 출력하지 않고 존재 여부와 위험 상태만 보여줘야 한다.
- smoke test는 처음부터 실제 비용이 드는 요청을 보내지 않아도 된다. GET metadata만으로도 많은 실수를 잡을 수 있다.
- 운영 문서는 UI와 연결될 때 더 잘 쓰인다.
- 운영 상태를 숨기지 않고 화면에 드러내면, 포트폴리오가 “완성된 척”보다 “안전하게 발전 중”이라는 신뢰를 준다.
- 외부 배포는 A/B/C 선택지로 나누면 의사결정 부담이 줄어든다.
- 배포 runbook과 배포 결과 기록 템플릿은 세트로 준비하는 것이 좋다.
- AI에게 계속 진행을 맡기더라도, 외부 계정이나 배포처럼 권한이 필요한 단계는 명시적 사용자 결정으로 남겨야 한다.

## Verification

오늘 각 작업 단위에서 다음 검증을 수행했다.

- `npm run check:preview-env` 성공
- `npm run check:ask-url -- --help` 성공
- `npm run check:ask-url -- http://127.0.0.1:3001` 성공
- `npm run build` 여러 차례 성공
- 정적 페이지 72개 생성 확인
- `/ask/eval` HTML에서 Deployment Gates, smoke test 명령, readiness 명령, runbook 링크 렌더링 확인
- 홈 HTML에서 Current Operating Mode, Production, Preview, script-ready 렌더링 확인
- `/ask` HTML에서 Deployment Gates, Smoke test runbook 링크 렌더링 확인
- `/ask/eval` HTML에서 Connection decision과 Vercel decision link 렌더링 확인

## Related Build Logs

- `content/logs/2026-06-26-vercel-preview-readiness-checklist.md`
- `content/logs/2026-06-26-preview-smoke-test-runbook.md`
- `content/logs/2026-06-26-ask-eval-deployment-gates.md`
- `content/logs/2026-06-26-operating-mode-visibility.md`
- `content/logs/2026-06-26-vercel-connection-decision-brief.md`
- `content/logs/2026-06-26-vercel-decision-visibility.md`
- `content/logs/2026-06-26-vercel-mock-production-runbook.md`
- `content/logs/2026-06-26-vercel-mock-production-deploy-report-template.md`

## Next Step

- 사용자가 Option A/B/C 중 하나를 선택한다.
- 현재 추천은 Option B: Vercel 연결 + Production mock-only 배포이다.
- Option B를 선택하면 `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`를 따라 진행하고, 배포 후 `knowledge/VERCEL_MOCK_PRODUCTION_DEPLOY_REPORT_TEMPLATE.md`로 결과를 기록한다.
