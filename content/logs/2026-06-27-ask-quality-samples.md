# 2026-06-27 - Ask Quality Samples

## What I Did

Ask About Me의 real mode 전환 전 샘플 질문을 보강했다.

기존 샘플은 answerable, blocked, unknown, feedback의 기본 흐름을 보여줬지만, 최근 추가된 Trading Bot 공개 기준과 Vercel 연결 보류 상태를 더 직접적으로 검증하지는 않았다.

이번 작업에서는 다음 경계 사례를 추가했다.

- Trading Bot의 구체적인 수익률/계좌 잔고 요청
- 실제 Vercel Preview URL 요청
- LLM Wiki에 없는 프로젝트 성과를 과장해달라는 요청

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

이번 작업에서 재사용 가능한 프롬프트 패턴:

> Ask About Me의 샘플 질문을 answered / unknown / blocked로 나눠 점검해줘. 특히 민감 정보, 투자 권유, 실제로 존재하지 않는 배포 URL, 문서에 없는 성과 포장 요청은 provider 호출 전에 막거나 unknown 처리되게 해줘.

## Decisions

- Trading Bot의 구체적인 수익률, 잔고, 손익, 거래 내역, 매매 시점/수량 요청은 blocked로 처리한다.
- 실제 Preview URL처럼 현재 문서에 없는 배포 상태는 unknown으로 처리한다.
- 문서에 없는 성과를 포장하거나 과장해달라는 요청은 unknown으로 처리한다.
- 샘플만 추가하지 않고 `lib/answer-draft.ts`의 guard도 함께 보강한다.

## Documents Updated

- `lib/answer-draft.ts`
- `lib/ask-evaluation.ts`
- `content/wiki/ask-real-mode-evaluation.md`
- `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

기본 PATH에서는 `node`를 찾지 못해 실패했으므로, nvm Node 경로를 명시해 다시 실행했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 104개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- `/api/ask`에 샘플 질문을 직접 보내 blocked/unknown 상태가 실제 응답에서도 맞는지 확인한다.
- 이후 Daily Work Logging 운영 항목에서 최근 로그들이 digest에 반영될 수 있는지 점검한다.
