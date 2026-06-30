# 2026-06-30 - Tailwind Setup

## What I Did

Tailwind CSS를 프로젝트에 적용했다.

초기 MVP에서는 전역 CSS만으로 화면을 만들고 Tailwind 도입 여부를 나중에 결정하기로 했었다. 현재는 Project Archive, Ask, Wiki, Logs 등 주요 화면이 안정화되었으므로 Tailwind를 빌드 파이프라인에 연결하되, 기존 디자인을 한 번에 마이그레이션하지 않는 방식으로 적용했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 나머지 작업들 계획 세워서 계속 진행해줘.

## Decisions

- Tailwind CSS v4와 `@tailwindcss/postcss`를 dev dependency로 추가한다.
- 기존 `app/globals.css` 디자인은 유지한다.
- Tailwind preflight는 import하지 않고 `theme`와 `utilities`만 import한다.
- `app/layout.tsx`의 `body`에 `antialiased` utility를 적용해 Tailwind pipeline이 실제로 동작하는지 확인한다.
- npm audit이 Next.js 관련 high advisory와 Next 내부 PostCSS moderate advisory를 보고했지만, `npm audit fix --force`는 Next 16으로 올리는 breaking change라 자동 실행하지 않는다.

## Files Updated

- `package.json`
- `package-lock.json`
- `postcss.config.mjs`
- `app/globals.css`
- `app/layout.tsx`
- `knowledge/NEXT_ACTIONS.md`
- `knowledge/TECH_DECISIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 106개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

추가 확인:

```bash
npm audit --audit-level=moderate
```

- Next.js advisory와 `next/node_modules/postcss` advisory가 보고되었다.
- npm이 제안한 자동 수정은 `next@16.2.9` 설치이며 breaking change 가능성이 있어 적용하지 않았다.

## Next Step

- 이후 새 UI를 만들 때 Tailwind utility를 점진적으로 사용한다.
- 기존 CSS 전체 마이그레이션은 필요해지는 시점에 별도 작업으로 다룬다.
- Vercel 배포 전 Next.js 보안 업데이트 경로를 별도로 검토한다.
