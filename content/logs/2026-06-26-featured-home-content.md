# 2026-06-26 - Featured Home Content

## What I Did

홈의 Projects와 Prompt Library 섹션이 파일명 알파벳순 앞 3개를 보여주던 방식을 대표 콘텐츠 기준으로 바꿨다.

포트폴리오 첫 화면에서는 “있는 콘텐츠 중 앞에 있는 것”보다 “이 프로젝트의 방향을 가장 잘 설명하는 것”이 먼저 보여야 한다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

홈 대표 프로젝트는 다음 3개로 정했다.

- `portfolio-site`
- `ask-about-me-chatbot`
- `llm-wiki`

홈 대표 프롬프트는 다음 3개로 정했다.

- `project-planning`
- `daily-work-log`
- `code-review`

## Code Updated

- `lib/content.ts`
- `app/page.tsx`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run build
```

`npm run build`는 성공했고, 정적 페이지 76개가 생성되었다.

## Next Step

- 홈 대표 콘텐츠가 늘어나면 slug 목록을 조정한다.
- 대표 콘텐츠 slug가 누락되면 빌드에서 바로 실패하도록 다음 작업에서 guard를 추가했다.
- 필요해지면 대표 콘텐츠 기준을 frontmatter로 옮긴다.
