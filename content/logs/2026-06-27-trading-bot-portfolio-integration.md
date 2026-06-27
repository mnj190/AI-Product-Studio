# 2026-06-27 - Trading Bot Portfolio Integration

## What I Did

`content/projects/trading-bot.md`에 포트폴리오 반영 기준을 추가했다.

멀티 프로젝트 운영 문서가 정리되면서 trading-bot은 별도 비공개 레포에서 운영하고, 포트폴리오에는 공개 가능한 작업 로그와 기술적 의사결정만 반영한다는 기준이 명확해졌다. 이 기준을 방문자가 보는 프로젝트 문서에도 연결했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- trading-bot 코드는 별도 비공개 레포에서 관리한다.
- 포트폴리오에는 공개 가능한 작업 로그와 기술적 의사결정만 반영한다.
- 공개 로그는 `content/logs/YYYY-MM-DD-trading-topic.md` 형식을 사용한다.
- 구체적인 계좌 잔고, 수익/손실 금액, 매매 시점/수량, secret, 투자 권유성 표현은 공개하지 않는다.

## Documents Updated

- `content/projects/trading-bot.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 88개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- trading-bot에서 공개 가능한 첫 작업 로그가 생기면 `content/logs/YYYY-MM-DD-trading-topic.md`로 반영한다.
