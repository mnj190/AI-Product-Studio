# 2026-06-30 - Ask Stale Design Refresh

## What I Did

Ask About Me 관련 설계 문서와 LLM Wiki Pattern 문서에서 오래된 현재 상태 설명을 갱신했다.

초기 문서에는 `/ask`가 예시 질문과 참고 문서 mapping만 보여주는 mock page로 설명되어 있었다. 현재 구현은 Local Wiki Lookup, deterministic draft answer, feedback candidate, `/api/ask` mock route, `/ask/eval` 평가 페이지까지 확장되어 있으므로 문서 설명을 현재 상태에 맞췄다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 나머지 작업들 계획 세워서 계속 진행해줘.

## Findings

- `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`의 Phase 2 설명이 여전히 “답변 생성은 하지 않는다”라고 되어 있었다.
- `knowledge/ROADMAP.md`의 Phase 5 Current Status가 예시 질문과 source mapping 수준에 머물러 있었다.
- `content/wiki/llm-wiki-pattern.md`의 First Implementation Direction이 Ask About Me를 아직 미래 단계처럼 표현했다.

## Updates Made

- `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`: 현재 구현 상태, 공개 운영 non-goals, success criteria를 갱신했다.
- `knowledge/ROADMAP.md`: `/ask` mock flow와 `/api/ask` mock route 구현 상태를 반영했다.
- `content/wiki/llm-wiki-pattern.md`: Ask About Me mock flow가 Wiki를 읽는 현재 상태와 provider adapter-ready 운영 방향을 반영했다.

## Verification

다음 명령으로 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 103개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- 남은 lint 항목 중 보안/민감 정보 검색 결과가 정책 문구인지 실제 노출인지 분류한다.
