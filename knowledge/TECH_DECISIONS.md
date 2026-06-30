# Tech Decisions

이 문서는 기술 선택과 그 이유를 기록한다.

## Frontend Framework

### Decision

Next.js App Router를 사용한다.

### Reason

- 포트폴리오 웹에 적합하다.
- 정적 페이지와 서버 기능을 함께 다루기 쉽다.
- Markdown 기반 콘텐츠 라우팅을 구성하기 좋다.
- 이후 LLM Wiki 기반 질문형 인터페이스를 같은 프로젝트 안에서 시작할 수 있다.

## Language

### Decision

TypeScript를 사용한다.

### Reason

- 콘텐츠 메타데이터와 라우팅 구조를 타입으로 관리하기 좋다.
- 장기적으로 프로젝트 규모가 커져도 유지보수하기 쉽다.

## Styling

### Decision

Tailwind CSS를 사용한다.

현재 프로젝트에는 Tailwind CSS v4를 PostCSS plugin으로 적용한다.

기존 전역 CSS 기반 디자인을 유지하기 위해 Tailwind preflight는 도입하지 않고, `theme`와 `utilities`만 import한다.

### Reason

- 빠르게 MVP UI를 만들 수 있다.
- shadcn/ui와 함께 쓰기 좋다.
- 포트폴리오 특성상 커스텀 디자인을 점진적으로 다듬기 좋다.
- 기존 CSS를 유지하면서 필요한 화면부터 utility class를 점진적으로 적용할 수 있다.

## UI Components

### Decision

shadcn/ui를 후보로 둔다.

### Reason

- 복잡한 디자인 시스템을 처음부터 만들 필요가 없다.
- 필요한 컴포넌트만 가져와 수정할 수 있다.
- 챗봇 UI, 카드, 버튼, 탭 등을 빠르게 구성할 수 있다.

## Content Format

### Decision

초기 콘텐츠는 Markdown으로 관리한다.

### Reason

- 작성과 수정이 쉽다.
- Git으로 변경 이력을 관리하기 좋다.
- 추후 LLM Wiki 문서로 축적하고 관리하기 쉽다.
- MDX는 필요해지는 시점에 도입한다.

## LLM Wiki

### Decision

초기 MVP 이후 RAG 인프라보다 LLM Wiki를 먼저 구축한다.

### Reason

- 이 프로젝트의 핵심 자산은 대화, 프롬프트, 개발 로그, 의사결정이다.
- 이런 자료는 질문 시점에 매번 검색하는 것보다 Wiki에 누적하는 편이 더 가치 있다.
- Wiki가 충분히 정리되면 Ask About Me 인터페이스는 그 위에 얹을 수 있다.
- embedding/vector search는 나중에 규모가 커졌을 때 선택적으로 붙인다.

## Repository Strategy

### Decision

`AI-Product-Studio`는 메인 포트폴리오 웹 레포로 유지한다.

각 프로젝트가 실행 가능한 앱이나 서비스가 되면 별도 레포로 분리한다.

### Reason

- 초기에는 문서와 소개를 한곳에 모으는 것이 빠르다.
- 실제 코드와 운영 구조가 복잡해지는 프로젝트는 별도 레포가 관리하기 쉽다.
- 메인 포트폴리오는 허브 역할에 집중할 수 있다.
