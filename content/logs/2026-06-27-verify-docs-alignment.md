# 2026-06-27 - Verify Docs Alignment

## What I Did

운영 문서에 남아 있던 오래된 검증 기준을 `npm run verify` 중심으로 정리했다.

`npm run verify`는 `npm run build`와 `npm run check:preview-env`를 함께 실행한다. 따라서 콘텐츠 ingest, Wiki lint, Vercel mock-only Production pre-flight 같은 작업 마무리 기준은 이제 개별 `build`보다 `verify`를 기준으로 삼는 편이 더 안전하다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- LLM Wiki ingest checklist는 `npm run verify`로 웹 렌더링과 preview readiness를 함께 확인한다.
- LLM Wiki lint checklist도 `npm run verify` 성공 여부를 기준으로 삼는다.
- Vercel mock-only Production runbook의 pre-flight는 `git status --short --branch`와 `npm run verify`를 먼저 실행한다.
- Vercel의 실제 build command 안내는 배포 설정 맥락이므로 `npm run build` 표현을 유지한다.

## Documents Updated

- `knowledge/LLM_WIKI_INGEST_WORKFLOW.md`
- `knowledge/LLM_WIKI_LINT_CHECKLIST.md`
- `knowledge/VERCEL_MOCK_PRODUCTION_RUNBOOK.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 86개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- 새 운영 문서를 만들 때는 작업 마무리 검증 기준을 우선 `npm run verify`로 둔다.
