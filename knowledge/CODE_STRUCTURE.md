# Code Structure

## Purpose

이 문서는 VIBE_PROJECT(포트폴리오 사이트) 코드베이스를 작업하는 AI 에이전트가 지켜야 할 파일 구조 규칙이다.

콘텐츠(Markdown) 구조는 [`CONTENT_STRUCTURE.md`](./CONTENT_STRUCTURE.md), 작업 철학은 [`AI_WORK_RULES.md`](./AI_WORK_RULES.md), 멀티 프로젝트 운영은 [`WORKSPACE_GUIDE.md`](./WORKSPACE_GUIDE.md) 참고. 이 문서는 그 세 문서와 겹치지 않고, "코드를 어디에 두는가"만 다룬다.

## Stack

Next.js 15 (App Router) + React 18 + TypeScript + Tailwind CSS 4. Vercel 배포.

## Root 구조

```text
app/         Next.js App Router 라우트 (페이지, API)
components/  여러 라우트에서 재사용하는 공용 React 컴포넌트
lib/         데이터 로딩, 비즈니스 로직, 서버 유틸리티
content/     Markdown 콘텐츠 (CONTENT_STRUCTURE.md 참고)
knowledge/   에이전트 공유 지식 문서 (이 문서가 속한 곳)
raw/         Wiki 반영 전 원본 자료
scripts/     배포/환경 검증용 Node 스크립트
```

## app/ 라우팅 규칙

대부분의 콘텐츠 타입은 동일한 2단 패턴을 따른다.

```text
app/{type}/page.tsx          목록 페이지
app/{type}/[slug]/page.tsx   상세 페이지
```

현재 2단 패턴 타입: `ai-stack`, `logs`, `projects`, `prompts`, `wiki`. 각각 `content/{type}/`와 1:1 대응한다.

예외:
- `app/ask/` — 챗봇 UI. `app/ask/eval/`은 real mode 응답 평가용 서브 라우트.
- `app/api/ask/route.ts` — 챗봇 API. 서버 로직은 여기 두지 않고 `lib/`에서 가져와 조합만 한다.
- `app/about/`은 `[slug]` 없이 단일 페이지이며 `content/about/*.md` 여러 문서를 한 화면에 묶어 보여준다.

새 콘텐츠 타입을 추가할 때 체크리스트:

1. `content/{type}/`에 Markdown 추가 (CONTENT_STRUCTURE.md 문서 구조 따름)
2. `lib/content.ts`에 로딩 함수 추가
3. `app/{type}/page.tsx`, `app/{type}/[slug]/page.tsx` 생성
4. 기존 `components/content-card.tsx`, `components/document-page.tsx`, `components/markdown-view.tsx` 재사용 우선 — 타입별 전용 컴포넌트를 새로 만들기 전에 공용 컴포넌트로 커버되는지 먼저 확인한다.

## components/ 규칙

라우트 2개 이상에서 쓰이는 것만 `components/`로 올린다. 특정 라우트에만 쓰는 UI는 해당 `app/{route}/` 안에 둔다 (현재는 아직 그런 케이스 없음).

현재 3개뿐이며 전부 콘텐츠 표시용이다: `content-card`(목록 카드), `document-page`(상세 페이지 레이아웃), `markdown-view`(Markdown 렌더링). 새 콘텐츠 타입 추가 시 이 3개로 안 되는 경우에만 새 컴포넌트를 만든다.

## lib/ 규칙

`lib/`는 두 그룹으로 나뉜다.

**콘텐츠 로딩**: `content.ts`, `wiki-lookup.ts` — `content/` Markdown을 읽어 라우트에 공급.

**Ask(챗봇) 로직**: `ask-config.ts`, `ask-evaluation.ts`, `answer-draft.ts`, `feedback-candidate.ts`, `llm-provider.ts`, `rate-limit.ts`, `rate-limit-config.ts` — LLM 호출, 평가, 레이트리밋을 각각 단일 책임 파일로 분리한다. 새 기능을 이 그룹에 추가할 때 기존 파일에 억지로 합치지 말고, 책임이 다르면 새 파일로 분리한다 (이 그룹의 기존 관례).

서버 전용 로직(API 키 사용, 파일 시스템 접근)은 반드시 `lib/`에 두고 `app/`에서는 호출만 한다. `app/api/ask/route.ts`에 직접 LLM 호출 로직을 쓰지 않는다.

## scripts/ 규칙

배포/환경 검증용 1회성 Node 스크립트만 둔다. `package.json`의 `check:*` 스크립트와 1:1 대응해야 한다.

현재 스크립트:

- `check:ask-url` ↔ `scripts/check-ask-url.mjs`
- `check:preview-env` ↔ `scripts/check-preview-env.mjs`
- `check:vercel` ↔ `scripts/check-vercel.mjs`

빌드나 런타임에 필요한 로직은 여기 두지 않는다 — `lib/`로 간다.

## 파일명 규칙

- 코드 파일: kebab-case, TypeScript (`.ts`/`.tsx`)
- 나머지 네이밍(Markdown, 날짜 포맷 등)은 [`AI_WORK_RULES.md`](./AI_WORK_RULES.md)의 Naming Rule 따름

## Do Not

- `content/`에 있어야 할 데이터를 `lib/`나 `app/`에 하드코딩하지 않는다.
- 라우트 전용 로직을 `components/`에 억지로 공용화하지 않는다.
- `app/api/ask/route.ts`에 비즈니스 로직을 직접 쓰지 않는다 — `lib/`로 분리.
