# 2026-06-19 - Ask Real Mode Evaluation

## What I Did

Ask About Me를 실제 LLM provider와 연결하기 전 필요한 비용/품질 샘플 기준을 만들었다.

이제 real mode 전환 여부를 감으로 결정하지 않고, `/ask/eval` 페이지의 샘플 질문과 통과 기준을 기준으로 판단할 수 있다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- real mode는 API key가 있다는 이유만으로 켜지 않는다.
- answerable, blocked, unknown, feedback 샘플을 나눠 관리한다.
- blocked와 unknown 질문은 provider 호출 전에 처리되어야 한다.
- 비용 기준은 구체 가격 대신 호출 조건, token/output 제한, rate limit, 비용 알림 준비 여부로 판단한다.
- 평가 기준은 문서와 웹 페이지 양쪽에 남긴다.

## Code Added

- `lib/ask-evaluation.ts`
- `app/ask/eval/page.tsx`

## Code Updated

- `app/ask/page.tsx`
- `app/globals.css`

## Documents Added

- `knowledge/ASK_REAL_MODE_EVALUATION.md`
- `content/wiki/ask-real-mode-evaluation.md`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/index.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 production build를 확인했다.

```bash
npm run build
```

결과:

- build 성공
- 정적 페이지 52개 생성
- `/ask/eval` 정적 페이지 생성
- `/wiki/ask-real-mode-evaluation` 상세 페이지 생성

로컬 개발 서버에서 다음을 확인했다.

- `/ask/eval`: Quality Rubric, Cost Gates, Sample Set, Readiness Checklist 렌더링
- `/ask`: `Eval 기준`, `Eval sample set` 링크 노출
- `/wiki/ask-real-mode-evaluation`: Wiki 상세 문서 렌더링

## Next Step

- production persistent rate limit store 결정
- real mode를 제한적으로 켤 배포 환경 선택
