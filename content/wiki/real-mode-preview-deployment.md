# Real Mode Preview Deployment

## Summary

Ask About Me의 첫 real LLM mode는 Vercel Preview Deployment에서만 켠다.

Production은 계속 mock mode를 유지한다.

이 결정은 실제 LLM provider 호출이 비용, 보안, 품질에 영향을 주기 때문이다.

## Decision

첫 real mode 환경:

- Vercel Preview Deployment

Production 상태:

- `ASK_API_MODE=mock`

Preview real mode 후보:

- `ASK_API_MODE=real`
- `RATE_LIMIT_STORE=upstash`
- OpenAI API key는 Preview environment variable로만 설정

## Why Preview

Preview Deployment는 production site에 영향을 주지 않고 live setting에서 변경을 테스트하기 위한 환경이다.

Vercel은 production branch가 아닌 branch push, pull request, `vercel` CLI 배포를 통해 preview deployment를 만든다.

따라서 real mode를 처음 켜기에 적합하다.

## Preview Checklist

- Vercel project 연결
- preview branch 생성
- Preview environment variables 설정
- Upstash Redis 연결
- `/api/ask` metadata 확인
- `/ask/eval` 샘플 질문 검수
- blocked 질문 차단 확인
- unknown 질문 unknown 처리 확인
- answerable 질문 source 기반 답변 확인

## Do Not

- Production에서 바로 `ASK_API_MODE=real`을 켜지 않는다.
- API key를 GitHub, Markdown, README, Build Log에 쓰지 않는다.
- persistent rate limit 없이 공개 real mode를 켜지 않는다.
- 샘플 답변 검수 없이 Production으로 승격하지 않는다.

## Current Status

현재 코드는 preview real mode를 위한 adapter-ready 상태이다.

실제 배포 연결과 secret 설정은 아직 하지 않는다.

다음 단계는 Vercel Preview Deployment 설정 체크리스트를 기준으로 배포 준비를 진행하는 것이다.
