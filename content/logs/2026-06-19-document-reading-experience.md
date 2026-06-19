# 2026-06-19 - Document Reading Experience

## What I Did

프로젝트, Wiki, Build Log, Prompt Library, AI Stack 상세 페이지의 읽기 경험을 개선했다.

기존 상세 페이지는 Markdown 본문만 거의 그대로 보여줬기 때문에 제목, 요약, 위치, 이전/다음 문서 탐색이 부족했다. 공통 `DocumentPage` 컴포넌트를 추가해 모든 상세 페이지가 같은 읽기 구조를 갖도록 정리했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 상세 페이지 중복 구현을 `components/document-page.tsx`로 합친다.
- Markdown의 첫 `# 제목`은 페이지 헤더로 끌어올리고, 본문에서는 제거해 제목 중복을 막는다.
- 상세 페이지 상단에 breadcrumb, title, summary, section/slug meta를 보여준다.
- 문서 하단에 previous/next 또는 목록으로 돌아가는 링크를 제공한다.
- About 페이지는 여러 문서를 한 페이지에 보여주는 구조라 이번 공통 상세 컴포넌트 적용 대상에서 제외한다.

## Code Added

- `components/document-page.tsx`

## Code Updated

- `app/projects/[slug]/page.tsx`
- `app/wiki/[slug]/page.tsx`
- `app/logs/[slug]/page.tsx`
- `app/prompts/[slug]/page.tsx`
- `app/ai-stack/[slug]/page.tsx`
- `app/globals.css`

## Documents Updated

- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 production build를 확인했다.

```bash
npm run build
```

결과:

- build 성공
- 정적 페이지 48개 생성
- 프로젝트, Wiki, Build Log, Prompt Library 상세 페이지가 새 공통 상세 UI로 렌더링되는지 로컬 서버 HTML 응답으로 확인

인앱 브라우저는 현재 세션에서 사용할 수 없어 직접 시각 검수는 하지 못했다.

## Next Step

- real LLM provider adapter 설계 여부 결정
- rate limit 정책 정리
