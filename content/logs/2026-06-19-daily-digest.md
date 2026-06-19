# 2026-06-19 - Daily Digest

## One-line Summary

AI Product Studio를 “읽을 수 있는 포트폴리오”에서 “검증 가능한 AI 협업 기록과 안전한 Ask About Me 전환 계획을 가진 포트폴리오”로 발전시켰다.

## What Changed

- 프로젝트, Wiki, Build Log, Prompt Library, AI Stack 상세 페이지의 읽기 경험을 공통 `DocumentPage` 컴포넌트로 개선했다.
- Ask About Me API를 실제 LLM provider로 전환할 수 있는 adapter-ready 구조로 정리했다.
- real mode 전환 전 품질, 비용, 안전 기준을 `/ask/eval`과 Wiki 문서로 만들었다.
- production persistent rate limit store로 Upstash Redis via Vercel Marketplace를 선택했다.
- 첫 real mode 실행 환경을 Production이 아니라 Vercel Preview Deployment로 제한하기로 결정했다.
- 매일 아침 AI 작업 과정을 공유용 기록으로 남기는 Daily Work Logging System을 보강했다.
- Daily Work Logging System을 공개 Wiki 페이지와 Prompt Library 항목으로 연결했다.

## How AI Was Used

- Planning: 다음 작업을 한 번에 크게 만들지 않고, 읽기 경험 → real mode 준비 → 배포 환경 → 기록 시스템 순서로 쪼갰다.
- Building: Next.js 상세 페이지 공통 컴포넌트, Ask provider adapter, rate limit metadata, eval 페이지, Wiki/Log 콘텐츠를 구현했다.
- Reviewing: `npm run build`, API 응답, 로컬 서버 HTML 응답, Wiki 링크 노출 여부를 확인했다.
- Reflecting: 작업 단위 Build Log를 읽고 하루치 Daily Digest로 묶었다.

## Human Decisions

- Ask About Me는 API key가 준비되었다는 이유만으로 real mode를 켜지 않는다.
- Production은 계속 mock mode로 유지하고, 첫 real mode는 Vercel Preview Deployment에서만 제한적으로 검수한다.
- rate limit은 local/mock에서는 memory store를 유지하고, 공개 real mode에서는 Upstash Redis로 전환한다.
- 매일 작업 기록은 단순 일지가 아니라 AI 활용 과정을 보여주는 포트폴리오 콘텐츠로 다룬다.
- 중요한 프롬프트는 모든 대화를 저장하는 방식이 아니라, 초보자가 바꿔 쓸 수 있는 요청 패턴으로 선별한다.

## Important Prompts

### 1. 연속 실행 모드를 만든 요청

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

Why it mattered:

이 요청 덕분에 AI가 단발성 답변 대신 현재 상태를 보고 다음 작업을 선택하고, 구현하고, 검증하고, 커밋하는 흐름으로 움직였다.

Reusable pattern:

```text
현재 프로젝트 상태를 기준으로 다음 작업 계획을 세우고, 가장 안전하고 가치 있는 순서로 하나씩 구현·검증·기록해줘.
```

### 2. 매일 기록 시스템을 구체화한 요청

> 매일매일 한 작업을 기록하고 싶어. 목적은 AI 로 어떤 식으로 어떻게 얼마나 공유하기 위한거야.

Why it mattered:

작업 로그가 내부 메모에서 공개 가능한 학습 콘텐츠로 바뀌었다. 결과뿐 아니라 AI 사용 방식, 사람의 판단, 프롬프트 패턴을 함께 남기는 운영 기준이 생겼다.

Reusable pattern:

```text
매일 작업을 기록하고 싶어. 목적은 [공유 대상]에게 AI를 어떤 방식으로 사용했는지 보여주는 거야. 어제 한 작업과 기록되지 않은 작업을 모아서 요약하고, 중요한 요청/프롬프트는 초보자도 참고할 수 있게 정리해줘.
```

### 3. real mode를 바로 켜지 않게 만든 운영 패턴

> 실제 API를 붙이기 전에 비용, 품질, 안전 기준을 먼저 만들고 제한된 환경에서만 검수할 수 있게 정리해줘.

Why it mattered:

LLM 기능을 “되는지”가 아니라 “안전하게 공개할 수 있는지” 기준으로 판단하게 만들었다.

Reusable pattern:

```text
실제 외부 API를 바로 켜지 말고, 먼저 mock mode, 평가 샘플, rate limit, 배포 환경, rollback 기준을 정리한 뒤 제한된 preview 환경에서만 검수할 수 있게 해줘.
```

## Decisions

- 공통 상세 페이지 구조는 `components/document-page.tsx`로 유지한다.
- `/api/ask`는 기본값에서 계속 mock mode로 동작한다.
- real LLM provider 호출은 `ASK_API_MODE=real`, `LLM_API_KEY`, `LLM_MODEL`이 모두 준비된 경우에만 가능하다.
- real mode 전환 판단은 `/ask/eval` 샘플과 readiness checklist를 기준으로 한다.
- production persistent rate limit store는 Upstash Redis via Vercel Marketplace를 1순위로 둔다.
- Vercel Production은 mock mode, Vercel Preview는 제한적 real mode 검수 환경으로 분리한다.
- Daily Digest는 작업 결과, AI 사용 방식, 사람의 결정, 검증 결과, 재사용 가능한 프롬프트를 함께 담는다.

## Lessons for Vibe Coding Beginners

- AI에게 “계속 하나씩 진행해줘”라고 맡기더라도, 매 작업마다 빌드와 로그를 남기면 흐름이 흩어지지 않는다.
- 실제 LLM API 연동은 코드보다 운영 기준이 먼저다. 비용, rate limit, 평가 샘플, 배포 환경을 먼저 정해야 한다.
- mock mode는 가짜 기능이 아니라 안전한 설계 단계다.
- 좋은 포트폴리오는 결과물뿐 아니라 왜 그 결정을 했는지 보여준다.
- 프롬프트를 남길 때는 원문보다 “왜 효과 있었는지”와 “어떻게 재사용할 수 있는지”가 더 중요하다.

## Verification

오늘 각 작업 단위에서 다음 검증을 수행했다.

- `npm run build` 여러 차례 성공
- 상세 페이지 공통 UI가 production build에 포함되는지 확인
- `/api/ask`가 기본값에서 `mode: "mock"`과 `rateLimitStore: "memory"`를 유지하는지 확인
- `/ask/eval` 페이지와 관련 Wiki 문서가 정적 페이지로 생성되는지 확인
- `/wiki/real-mode-preview-deployment`, `/wiki/production-rate-limit-store`, `/wiki/daily-work-logging-system` 문서가 Wiki index에 연결되는지 확인

## Related Build Logs

- `content/logs/2026-06-19-document-reading-experience.md`
- `content/logs/2026-06-19-llm-provider-adapter-rate-limit.md`
- `content/logs/2026-06-19-ask-real-mode-evaluation.md`
- `content/logs/2026-06-19-production-rate-limit-store.md`
- `content/logs/2026-06-19-real-mode-preview-deployment.md`
- `content/logs/2026-06-19-daily-work-logging-system.md`

## Next Step

- Vercel Preview Deployment 연결과 Preview environment variable 설정을 실제로 진행할지 결정한다.
- 또는 먼저 로컬에서 Preview 환경 변수 readiness를 점검하는 스크립트와 체크리스트를 만든다.
