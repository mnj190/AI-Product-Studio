# 2026-06-27 - Project Related Links

## What I Did

대표 프로젝트 문서의 `Links` 섹션을 보강했다.

이전에는 Portfolio Site, LLM Wiki, Trading Bot 문서의 링크가 `추후 추가 예정`으로 남아 있었다. 방문자가 프로젝트 설명을 읽은 뒤 실제 작업 로그, 관련 프롬프트, Wiki 문서, 운영 문서로 이동하기 어려웠다.

이번 작업에서는 각 프로젝트가 어떤 로그와 기준 문서에 연결되는지 명시했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

직전 사용자 요청:

> 다음 작업은 나중에 할 수 있도록 일단 하던 작업만 마무리 해줘.

## Decisions

- 프로젝트 문서 자체에 관련 로그/프롬프트/Wiki 링크를 먼저 추가한다.
- 별도 UI 컴포넌트 자동 추천 기능은 나중으로 미룬다.
- 지금 단계에서는 Markdown 링크 보강이 가장 안전하고 유지보수하기 쉽다.
- Trading Bot은 투자 성과보다 공개 가능한 개발 기록, 답변 가드레일, 멀티 프로젝트 운영 기준 중심으로 연결한다.

## Documents Updated

- `content/projects/portfolio-site.md`
- `content/projects/ask-about-me-chatbot.md`
- `content/projects/llm-wiki.md`
- `content/projects/trading-bot.md`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 93개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- 이후 Safe Local Backlog의 다음 후보인 LLM Wiki 품질 점검으로 넘어간다.
