# 2026-06-27 - Trading Bot Answer Guard

## What I Did

Ask About Me가 trading-bot 질문에 답할 때 적용할 공개 기준과 안전 가드레일을 보강했다.

이전에도 종목 추천, 매수/매도 권유, 수익 보장형 질문은 blocked 처리하고 있었다. 이번에는 cross-project 문서와 `content/projects/trading-bot.md`에 추가된 공개 기준에 맞춰, 구체적인 계좌 잔고, 손익 금액, 매매 시점/수량도 답변하지 않는 범위로 더 명확히 했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- trading-bot 답변은 개발 실험, API 연동 구조, 로그 분석, AI 활용 방식 중심으로 제한한다.
- 투자 권유처럼 읽힐 수 있는 질문은 provider를 호출하지 않는다.
- 구체적인 잔고, 손익 금액, 매매 시점/수량은 공개하지 않는다.
- 공개 작업 로그가 생기면 `content/logs/YYYY-MM-DD-trading-topic.md` 형식의 Build Log를 참고한다.

## Code Updated

- `lib/answer-draft.ts`
- `lib/ask-evaluation.ts`

## Documents Updated

- `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 89개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- trading-bot 공개 로그가 실제로 추가되면 Ask 답변 출처와 평가 샘플에 반영할지 검토한다.
