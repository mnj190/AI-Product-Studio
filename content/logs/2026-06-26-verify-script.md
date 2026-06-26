# 2026-06-26 - Verify Script

## What I Did

작업 단위 마무리 검증을 위한 `npm run verify` script를 추가했다.

이 프로젝트에서는 커밋 전 `npm run build`와 `npm run check:preview-env`를 자주 함께 실행한다. 둘을 하나의 명령으로 묶어 반복 검증 루틴을 줄였다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- `npm run verify`는 production build와 Preview environment check를 순서대로 실행한다.
- Preview URL smoke test는 실제 URL이 생겼을 때만 실행하므로 `verify`에는 포함하지 않는다.
- README에 작업 마무리 전 확인 명령으로 `npm run verify`를 추가한다.

## Code Updated

- `package.json`

## Documents Updated

- `README.md`
- `content/logs/2026-06-26-dev-local-script.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 80개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- 일반 작업 마무리는 `npm run verify`를 기본 검증 명령으로 사용한다.
- Preview URL이 생긴 뒤에는 별도로 `npm run check:ask-url -- <preview-url>`을 실행한다.
