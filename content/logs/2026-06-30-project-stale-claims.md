# 2026-06-30 - Project Stale Claims

## What I Did

LLM Wiki lint checklist 기준으로 기본 프로젝트 문서의 오래된 상태 설명을 점검하고 일부 수정했다.

검색 결과 대부분의 `현재`, `아직`, `나중에`, `초기` 표현은 장기 계획, mock mode, 배포 보류 상태, 과거 Build Log 맥락에서 적절하게 쓰이고 있었다. 다만 Portfolio Site와 Personal LLM Wiki 프로젝트 문서의 Result 섹션은 현재 구현 상태보다 너무 초기 단계처럼 읽혔다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 나머지 작업들 계획 세워서 계속 진행해줘.

## Findings

- Critical:
  - 없음.
- Important:
  - `content/projects/portfolio-site.md`가 아직 “초기 기초 작업 단계”라고 설명해 현재 구현 상태를 덜 반영했다.
  - `content/projects/llm-wiki.md`가 아직 “초기 문서 구조를 구축하는 단계”라고 설명해 현재 운영 문서와 Ask mock flow 연결 상태를 덜 반영했다.
- Nice to Have:
  - 여러 문서의 `현재`, `아직`, `나중에` 표현은 대부분 배포 보류, real mode 보류, 장기 계획을 설명하는 맥락이라 유지했다.

## Updates Made

- `content/projects/portfolio-site.md`: Next.js MVP 구현, Markdown 콘텐츠 탐색, 주요 페이지 연결, Vercel/real mode 보류 상태를 반영했다.
- `content/projects/llm-wiki.md`: Wiki index/log/ingest/lint/Daily Work Logging과 Ask mock flow 연결 상태를 반영했다.
- `knowledge/NEXT_ACTIONS.md`: 기본 프로젝트 문서 stale claim 정리 항목을 완료 처리했다.

## Verification

다음 명령으로 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 104개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- 남은 LLM Wiki lint는 더 넓은 중복 설명과 security 후보를 다음 패스로 점검한다.
