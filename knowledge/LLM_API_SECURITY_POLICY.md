# LLM API Security Policy

이 문서는 Ask About Me에 실제 LLM API를 연동할 때 지켜야 할 보안 기준이다.

현재 프로젝트는 기본적으로 외부 LLM API를 호출하지 않는다.

먼저 mock API route와 deterministic draft answer를 사용한다.

단, adapter-ready 구조는 준비되어 있으며 `ASK_API_MODE=real`, `LLM_API_KEY`, `LLM_MODEL`이 모두 설정된 경우에만 server route에서 provider 호출이 가능하다.

## Decision

실제 LLM API의 공개 운영은 아직 보류한다.

이유:

- API Key 관리 정책이 먼저 필요하다.
- 비용 제한이 필요하다.
- 답변 출처 강제 정책이 필요하다.
- 공개 포트폴리오에서 사용자 입력을 외부 API로 보내기 전 안전 기준이 필요하다.

## Environment Variables

실제 API를 붙일 경우 후보 환경 변수:

```text
LLM_PROVIDER=openai
LLM_MODEL=
LLM_API_KEY=
LLM_MAX_INPUT_CHARS=12000
LLM_MAX_OUTPUT_TOKENS=600
LLM_TIMEOUT_MS=15000
ASK_API_MODE=mock
```

초기값은 `ASK_API_MODE=mock`으로 둔다.

`ASK_API_MODE=real`일 때만 외부 LLM API를 호출한다.

## Files

허용:

- `.env.local`
- Vercel/hosting provider의 encrypted environment variables

금지:

- `.env`
- `.env.production`
- 코드 안에 직접 API Key 작성
- Markdown 문서에 API Key 작성
- Build Log에 API Key 작성
- GitHub issue/comment에 API Key 작성

## Client Exposure Rule

API Key는 절대 client component, browser JavaScript, HTML, Markdown에 노출하지 않는다.

LLM 호출은 반드시 server route에서만 수행한다.

허용 경로:

```text
browser
→ /api/ask
→ server-side LLM client
→ provider
```

금지 경로:

```text
browser
→ provider directly
```

## Request Safety

외부 LLM API로 보내기 전 다음을 확인한다.

- 질문 길이 제한
- source context 길이 제한
- 민감 정보 요청 차단
- 투자 권유성 질문 차단
- 관련 문서가 없는 경우 외부 API 호출 생략

## Source Boundaries

LLM에 전달하는 context는 Local Wiki Lookup 결과로 제한한다.

초기 제한:

- 최대 source 5개
- source당 excerpt 800자 이하
- 전체 input 12,000자 이하

## Response Safety

응답은 다음 조건을 만족해야 한다.

- 문서 기반 답변
- 출처 표시
- 모르는 내용은 unknown 처리
- 민감 정보 비공개
- 투자 권유 금지
- 과장된 자기소개 금지

## Cost Control

초기 비용 제한:

- 캐싱 전까지는 짧은 답변만 생성
- source 수 제한
- output token 제한
- persistent rate limit 도입 전까지 공개 배포에서 real mode 비활성화

현재 개발 단계 rate limit:

- 20 requests / 10 minutes / client key
- in-memory store
- production에서는 Redis/KV 등 persistent store 필요

## Deployment Rule

공개 배포 전에는 다음 중 하나를 선택한다.

### Option A. Mock Mode

`ASK_API_MODE=mock`

외부 API 호출 없음.

가장 안전한 초기 배포 방식.

### Option B. Real Mode with Protection

`ASK_API_MODE=real`

필수 조건:

- API Key는 hosting provider secret에 저장
- rate limit 적용
- source context 제한
- answer guard 적용
- 비용 모니터링

## Current Recommendation

현재는 mock mode를 유지한다.

`/api/ask`는 provider adapter-ready 구조까지 준비되었다.

다음 단계는 real mode를 실제로 켤지 결정하기 전 비용/품질 샘플 기준과 production persistent rate limit store를 정하는 것이다.
