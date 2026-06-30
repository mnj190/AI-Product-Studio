# 2026-06-30 - Project Card Resource Links

## What I Did

Project Archive 카드에서 관련 자료로 바로 이동할 수 있는 링크 기준을 추가했다.

이전 작업에서는 프로젝트 상세 문서의 `Links` 섹션을 보강했지만, `/projects` 목록 화면에서는 여전히 문서 제목과 요약만 보여줬다. 이번 작업에서는 트레이딩 봇을 제외한 기본 포트폴리오 프로젝트 카드에 핵심 로그, 프롬프트, Wiki 링크를 짧게 노출했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 나머지 작업들 계획 세워서 계속 진행해줘.

직전 사용자 요청:

> 트레이딩 봇 쪽은 다른 에이전트가 할 꺼니까 그 외에 작업 진행 사항과 앞으로 해야할 일을 정리해줘.

## Decisions

- 공용 `ContentCard`는 유지하고, 프로젝트 목록 화면에만 전용 카드 구성을 둔다.
- Project Archive 카드에는 최대 3개의 관련 자료 링크만 보여준다.
- 링크는 로그, 프롬프트, Wiki, 주요 화면처럼 방문자가 다음으로 읽기 쉬운 항목을 우선한다.
- Trading Bot 프로젝트는 다른 에이전트가 담당하므로 이번 카드 큐레이션 대상에서 제외한다.

## Documents Updated

- `app/projects/page.tsx`
- `app/globals.css`
- `knowledge/NEXT_ACTIONS.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

기본 PATH에서는 `node`를 찾지 못해 실패했으므로, nvm Node 경로를 명시해 다시 실행했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 104개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

로컬 서버 확인:

- `http://127.0.0.1:3002/projects` 응답 200
- 렌더된 HTML에서 Project Archive resource links 확인

## Next Step

- 이후 Daily Work Logging 운영 항목에서 최근 로그가 Daily Digest에 반영되어야 하는지 점검한다.
