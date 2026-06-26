# 2026-06-26 - Git Sync Docs

## What I Did

README에 GitHub 동기화 상태를 확인하고 push하는 기본 루틴을 추가했다.

현재 로컬 `main`은 `origin/main`보다 여러 커밋 앞서 있다. 이런 상태에서는 “작업은 로컬에 안전하게 저장되었지만 GitHub에는 아직 올라가지 않았다”는 점을 명확히 이해하는 것이 중요하다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 로컬/원격 차이는 `git status --short --branch`로 확인한다.
- `[ahead N]`의 의미를 README에 설명한다.
- 최근 커밋 확인은 `git log --oneline --decorate -10`으로 안내한다.
- GitHub 업로드는 `git push origin main`으로 안내한다.
- push 전에는 `npm run verify` 통과를 먼저 확인한다.

## Documents Updated

- `README.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 81개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- GitHub에 올릴 준비가 되면 `npm run verify` 후 `git push origin main`을 실행한다.
