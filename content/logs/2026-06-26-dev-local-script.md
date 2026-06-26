# 2026-06-26 - Dev Local Script

## What I Did

`127.0.0.1:3001`에서 로컬 웹을 띄우는 긴 명령을 `npm run dev:local` script로 줄였다.

README에는 이미 포트 충돌을 피하기 위한 실행 방식이 문서화되어 있었지만, 매번 `npm run dev -- -H 127.0.0.1 -p 3001`를 입력하는 것은 번거롭다. 자주 쓰는 운영 명령은 script로 고정해 두는 편이 좋다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 기본 개발 서버는 기존처럼 `npm run dev`로 유지한다.
- 포트 충돌 회피용 로컬 실행은 `npm run dev:local`로 제공한다.
- `dev:local`은 `127.0.0.1:3001`에 고정한다.

## Code Updated

- `package.json`

## Documents Updated

- `README.md`
- `content/logs/2026-06-26-local-development-docs.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run build
```

`npm run build`는 성공했고, 정적 페이지 79개가 생성되었다.

## Next Step

- 로컬 웹을 직접 확인할 때는 `npm run dev:local`을 우선 사용한다.
