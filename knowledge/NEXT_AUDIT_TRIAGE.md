# Next.js Audit Triage

이 문서는 `npm audit`에서 보고된 Next.js 관련 advisory를 Vercel 배포 전 어떻게 다룰지 정리한다.

## Current Result

2026-06-30 기준 `npm audit --audit-level=moderate`는 다음을 보고했다.

- `next`: high severity advisories
- `next/node_modules/postcss`: moderate severity advisory

npm이 제안한 자동 수정은 `npm audit fix --force`이며, 이 경로는 `next@16.2.9` 설치를 포함한다.

Next 14 App Router 기반 현재 프로젝트에서 Next 16으로 바로 올리는 것은 breaking change 가능성이 있으므로 자동 적용하지 않는다.

## Patch Path Check

2026-06-30 기준 npm registry 확인 결과:

- latest `next`: `16.2.9`
- latest `next@14`: `14.2.35`
- latest `next@15`: `15.5.19`

현재 lockfile은 `next@14.2.35`를 사용한다.

따라서 Next 14 라인 안에서 더 올릴 수 있는 패치 버전은 없다.

audit advisory를 제거하려면 Next 15 또는 Next 16 업그레이드를 별도 작업으로 검증해야 한다.

## Current App Exposure Check

현재 코드 기준으로 아래 기능은 사용하지 않는다.

- `next/image`
- `images.remotePatterns`
- middleware/proxy
- `rewrites`
- `beforeInteractive` script
- WebSocket upgrade route

`next.config.mjs`는 빈 설정이다.

현재 앱은 Markdown 기반 정적 콘텐츠, App Router page, `/api/ask` route 중심이다.

## Decision

Vercel 배포 전에는 다음 중 하나를 선택한다.

1. Next 15/16 업그레이드를 별도 브랜치에서 검증한다.
2. mock-only Production 배포를 먼저 진행하되, 공개 URL 생성 전 risk acceptance를 명시한다.

현재 추천은 1번이다.

## Required Before Production

- `npm audit --audit-level=moderate` 재실행
- Next.js major upgrade 여부 결정
- `npm run verify` 통과
- `/ask`와 `/api/ask`가 mock mode를 유지하는지 확인
- Vercel Production에는 real LLM secret을 넣지 않음

## Notes

이 문서는 advisory를 무시하기 위한 문서가 아니다.

지금 자동 업그레이드를 하지 않는 이유는 배포 직전의 작은 보안 패치와 major upgrade를 구분하기 위해서다.
