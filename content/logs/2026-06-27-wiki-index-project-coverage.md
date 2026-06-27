# 2026-06-27 - Wiki Index Project Coverage

## What I Did

`content/wiki/index.md`와 실제 Wiki/Project 문서 연결 상태를 점검하고, Project Pages에 빠져 있던 Trading Bot 링크를 추가했다.

`content/wiki/*.md` 문서 자체는 Wiki Index에 모두 연결되어 있었지만, 최근 멀티 프로젝트 운영 문서와 trading-bot 공개 기준을 정리했음에도 Project Pages에는 `content/projects/trading-bot.md`가 없었다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- Trading Bot은 Project Pages에서 바로 찾을 수 있어야 한다.
- Trading Bot 설명은 투자 성과가 아니라 별도 비공개 레포, 공개 가능한 작업 로그, 기술적 의사결정 중심으로 쓴다.
- Wiki Index 점검은 `knowledge/LLM_WIKI_LINT_CHECKLIST.md`의 orphan page 기준을 따른다.

## Documents Updated

- `content/wiki/index.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 92개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- LLM Wiki lint를 계속할 때는 Project Pages뿐 아니라 Prompt Library와 AI Stack 연결성도 확인한다.
