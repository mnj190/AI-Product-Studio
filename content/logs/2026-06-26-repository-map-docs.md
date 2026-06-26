# 2026-06-26 - Repository Map Docs

## What I Did

README에 Repository Map 섹션을 추가했다.

프로젝트가 커지면서 `app`, `lib`, `content`, `knowledge`, `scripts`, `raw`의 역할이 분명해졌다. 새로 이어서 작업하는 사람이 어디를 먼저 봐야 하는지 빠르게 파악할 수 있도록 레포 구조를 README에 정리했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- `Core Structure`는 핵심 철학을 짧게 유지한다.
- 실제 디렉터리별 역할은 `Repository Map`으로 분리한다.
- `raw/`는 공개 콘텐츠 전 원본 자료 보관 위치로 설명한다.
- `knowledge/`와 `content/`의 차이를 README에서 더 명확히 한다.

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
- 정적 페이지 82개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- 새 주요 디렉터리가 생기면 README의 Repository Map을 함께 갱신한다.
