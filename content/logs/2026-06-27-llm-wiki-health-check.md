# 2026-06-27 - LLM Wiki Health Check

## What I Did

`knowledge/LLM_WIKI_LINT_CHECKLIST.md` 기준으로 LLM Wiki와 관련 프로젝트 문서의 건강 상태를 점검했다.

주요 확인 범위는 다음과 같다.

- `content/wiki/index.md`와 실제 `content/wiki/*.md` 문서 목록 일치 여부
- RAG 우선 전략이 현재 목표처럼 남아 있는지 여부
- `추후 추가 예정`처럼 비어 있는 Links 섹션
- Trading Bot 공개 범위와 Ask About Me 답변 정책의 충돌 여부
- 공개 저장소에 민감 정보가 직접 들어가 있는지 여부

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

이번 작업에서 재사용 가능한 프롬프트 패턴:

> 현재 Wiki index와 실제 Wiki 파일 목록을 비교해서 orphan page, stale claim, weak source 후보를 찾아줘. 단순 검색 결과를 그대로 고치지 말고, 현재 프로젝트 목표와 충돌하는 것만 수정해줘.

## Findings

- Critical:
  - 없음.
- Important:
  - `knowledge/PROJECT_CONTEXT.md`의 Trading Bot 설명이 “실시간 계좌 정보, 수익률, 거래 내역 공개”처럼 현재 공개/답변 가드레일보다 넓게 쓰여 있었다.
  - `content/projects/webgpu-game.md`의 Links 섹션이 비어 있어 Project Archive에서 WebGPU Wiki와 관련 프롬프트로 이어지기 어려웠다.
- Nice to Have:
  - `현재`, `나중에`, `추후` 표현은 여러 문서에 남아 있지만, 대부분 의사결정 단계나 장기 계획을 설명하는 맥락이라 즉시 수정 대상은 아니었다.
  - RAG 관련 표현은 남아 있지만 “RAG 우선에서 LLM Wiki 우선으로 전환했다”는 변화 기록으로 쓰이고 있어 삭제 대상은 아니었다.

## Updates Made

- `knowledge/PROJECT_CONTEXT.md`: Trading Bot 공개 범위를 공개 가능한 개발 과정, 기술적 의사결정, 요약 수준의 운영 회고로 제한했다.
- `content/projects/trading-bot.md`: 프로젝트 요약의 공개 범위 표현을 같은 기준으로 조정했다.
- `content/projects/webgpu-game.md`: 구현 전 공개 상태와 관련 Wiki/프롬프트/향후 로그 위치를 추가했다.
- `knowledge/NEXT_ACTIONS.md`: Home/Project Archive 품질 개선 중 공개 상태 설명 보강 항목을 완료 처리했다.
- `content/wiki/log.md`: 이번 lint 작업을 Wiki 변경 기록에 추가했다.

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 94개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Follow-up

- 다음 LLM Wiki 품질 점검에서는 Prompt Library와 AI Stack 문서가 Wiki index에서 충분히 발견 가능한지 확인한다.
- Ask About Me 품질 개선 단계에서 blocked/unknown/answered 샘플을 더 추가한다.
