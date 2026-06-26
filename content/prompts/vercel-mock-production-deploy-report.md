# Vercel Mock-only Production Deploy Report Prompt

Vercel Production에 mock-only 모드로 배포한 뒤, 결과를 공개 가능한 Build Log로 정리하기 위한 프롬프트다.

## Prompt

```text
방금 Vercel mock-only Production 배포 결과를 기록해줘.

목적은 포트폴리오 방문자와 바이브 코딩 초보자가 “실제 배포는 했지만, real LLM mode는 안전하게 막아두었다”는 운영 방식을 이해할 수 있게 하는 거야.

다음 정보를 기준으로 `content/logs/YYYY-MM-DD-vercel-mock-production-deploy.md`를 작성해줘.

- Production URL:
- 연결된 branch:
- `/api/ask` metadata:
- `npm run check:ask-url -- <production-url>` 결과:
- 확인한 페이지:
- 발견한 문제:
- 다음 작업:

반드시 포함할 내용:

1. Production은 `ASK_API_MODE=mock`으로 유지했다.
2. Production에 `LLM_API_KEY`를 넣지 않았다.
3. 외부 LLM provider 호출은 활성화하지 않았다.
4. real mode 검수는 Preview에서만 별도로 진행한다.
5. secret, token, private account 정보는 공개 로그에 쓰지 않는다.
```

## When To Use

- Option B 배포를 완료했을 때
- Vercel Production URL을 만든 직후
- mock-only Production 안전 상태를 기록하고 싶을 때
- 배포 결과를 Daily Digest에 묶기 전 작업 단위 로그로 남기고 싶을 때

## Why It Works

이 프롬프트는 배포 성공 여부만 기록하지 않는다.

Production real mode를 켜지 않았다는 안전 결정, `/api/ask` metadata, smoke test 결과, 다음 작업을 함께 남긴다.

그래서 나중에 “웹은 공개했지만 LLM 비용/secret 리스크는 막아둔 상태”였다는 운영 판단을 추적할 수 있다.

## Reusable Pattern

```text
[배포 환경]에 [배포 방식]으로 배포한 결과를 기록해줘.

포함할 내용:
- 배포 URL
- 연결 branch
- API metadata
- smoke test 결과
- 직접 확인한 페이지
- 안전 제약
- 발견한 문제
- 다음 작업

민감한 secret 값은 절대 쓰지 말고, 설정 여부만 기록해줘.
```
