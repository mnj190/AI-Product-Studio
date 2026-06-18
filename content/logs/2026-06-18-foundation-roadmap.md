# 2026-06-18 - Foundation Roadmap

## What I Did

포트폴리오 웹 레포의 다음 작업 계획을 문서화하고, 1차 웹 MVP를 만들기 전 필요한 핵심 문서를 보강했다.

## AI Used

- Codex

## Prompts Used

사용자 요청:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- `AI-Product-Studio`는 메인 포트폴리오 웹 레포로 유지한다.
- 실행 가능한 프로젝트가 되는 시점에 별도 레포로 분리한다.
- 첫 번째 웹 MVP는 챗봇보다 Markdown 콘텐츠 탐색에 집중한다.
- Next.js App Router, TypeScript, Tailwind CSS를 기본 후보로 둔다.
- shadcn/ui는 필요한 컴포넌트가 생기는 시점에 도입한다.
- MDX는 처음부터 강제하지 않고 Markdown으로 시작한다.

## Documents Added

- `knowledge/ROADMAP.md`
- `knowledge/NEXT_ACTIONS.md`
- `knowledge/MVP_SCOPE.md`
- `knowledge/TECH_DECISIONS.md`
- `content/about/skills.md`
- `content/about/interests.md`
- `content/projects/llm-wiki.md`
- `content/wiki/vibe-coding.md`
- `content/wiki/llm-wiki-pattern.md`

## Problems

아직 웹 프레임워크는 생성하지 않았다.

다음 단계에서는 네트워크와 패키지 설치가 필요할 수 있으므로, Next.js 생성 시 의존성 설치 권한이 필요할 수 있다.

## Next Step

Next.js 프로젝트를 생성하고, `content/`의 Markdown 문서를 페이지로 보여주는 구조를 만든다.
