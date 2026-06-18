# 2026-06-18 - Static Portfolio MVP

## What I Did

Next.js 기반의 첫 Static Portfolio MVP를 만들었다.

`content/` 아래 Markdown 문서를 읽어 홈, About, Projects, Build Log, Wiki 페이지에서 보여주는 구조를 만들었다.

## AI Used

- Codex

## Prompts Used

사용자 요청:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- Next.js App Router를 사용한다.
- Markdown은 우선 외부 렌더링 라이브러리 없이 직접 간단히 렌더링한다.
- `content/` 문서를 그대로 원본 데이터로 사용한다.
- Prompt Library와 AI Stack은 다음 단계에서 라우트를 추가한다.
- Tailwind CSS와 shadcn/ui는 현재 CSS 기반 MVP를 확인한 뒤 도입한다.

## Implemented Routes

- `/`
- `/about`
- `/projects`
- `/projects/[slug]`
- `/logs`
- `/logs/[slug]`
- `/wiki`
- `/wiki/[slug]`

## Problems

인앱 브라우저 연결은 현재 세션에서 사용할 수 없었다.

대신 로컬 개발 서버를 실행하고 HTTP 응답으로 홈, 프로젝트 상세, Wiki 상세 페이지가 렌더링되는지 확인했다.

## Verification

다음 명령으로 빌드를 확인했다.

```bash
npm run build
```

결과:

- production build 성공
- 정적 페이지 16개 생성
- 주요 상세 페이지 HTML 렌더링 확인

## Next Step

- Prompt Library 페이지 추가
- AI Stack 페이지 추가
- Tailwind CSS 도입 여부 결정
- 기본 UI를 더 포트폴리오답게 다듬기
- 챗봇 MVP를 위한 문서 검색 구조 설계

