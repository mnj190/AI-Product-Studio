# 2026-06-27 - Workspace Coordination Docs

## What I Did

멀티 프로젝트/멀티 에이전트 운영 문서를 프로젝트 현재 구조에 맞게 정리했다.

새로 발견된 `knowledge/WORKSPACE_GUIDE.md`, `knowledge/AGENT_SYNC.md`, `knowledge/CROSS_PROJECT.md`는 포트폴리오 사이트와 trading-bot을 함께 운영하기 위한 공유 지식 문서였다. 다만 일부 문서가 `content/logs/trading/` 하위 폴더가 자동 노출된다고 설명하고 있었는데, 현재 포트폴리오의 콘텐츠 로더는 `content/logs/*.md`만 자동 노출한다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 멀티 프로젝트 운영 문서 3개를 정식 공유 지식 문서로 편입한다.
- trading-bot 공개 로그 전달 경로는 현재 구현에 맞춰 `content/logs/YYYY-MM-DD-trading-topic.md`로 안내한다.
- `content/logs/trading/` 하위 폴더를 쓰려면 먼저 콘텐츠 로더 확장이 필요하다고 명시한다.
- README Repository Map에서 `WORKSPACE_GUIDE`, `AGENT_SYNC`, `CROSS_PROJECT`를 바로 찾을 수 있게 한다.

## Documents Updated

- `knowledge/WORKSPACE_GUIDE.md`
- `knowledge/AGENT_SYNC.md`
- `knowledge/CROSS_PROJECT.md`
- `README.md`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 87개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- trading-bot에서 공개 로그가 실제로 생기면 `content/logs/YYYY-MM-DD-trading-topic.md` 형식으로 수동 반영한다.
- 하위 폴더 로그 노출이 필요해지면 `lib/content.ts`의 콘텐츠 로더 확장을 별도 작업으로 진행한다.
