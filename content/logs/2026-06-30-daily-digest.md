# 2026-06-30 - Daily Digest

## One-line Summary

트레이딩 봇을 별도 에이전트 담당 범위로 분리하고, 기본 포트폴리오 프로젝트 아카이브의 카드 링크와 검증 기록을 마무리했다.

## What Changed

- `/projects` 카드에 관련 로그, 프롬프트, Wiki, 주요 화면으로 이어지는 resource links를 추가했다.
- 공용 `ContentCard`는 유지하고 Project Archive 화면에만 전용 카드 구성을 적용했다.
- Portfolio Site, Ask About Me, Personal LLM Wiki, WebGPU Game 카드에 최대 3개의 관련 자료 링크를 노출했다.
- Trading Bot 카드는 다른 에이전트 담당 범위로 두고 새 큐레이션 링크를 추가하지 않았다.
- `knowledge/NEXT_ACTIONS.md`의 Home/Project Archive 품질 개선 항목을 완료 처리했다.
- 오늘 작업 단위 Build Log를 Daily Digest에 반영했다.
- 멀티 에이전트 담당 범위 분리 요청을 Prompt Library 문서로 승격했다.
- Portfolio Site와 Personal LLM Wiki 프로젝트 문서의 오래된 Result 설명을 현재 구현 상태에 맞게 갱신했다.
- Tailwind CSS v4를 PostCSS pipeline에 적용하고 기존 CSS 디자인을 유지한 채 utility 사용 기반을 마련했다.
- npm audit에서 보고된 Next.js advisory를 배포 전 판단 문서로 triage했다.

## How AI Was Used

- Planning: 남은 Safe Local Backlog를 다시 읽고 트레이딩 봇 제외 범위를 분리했다.
- Building: 프로젝트 목록 페이지와 CSS를 수정해 카드에서 관련 자료로 바로 이동할 수 있게 했다.
- Reviewing: `npm run verify`와 로컬 `/projects` HTTP 응답으로 빌드와 렌더링을 확인했다.
- Reflecting: 작업 로그, Wiki Log, Next Actions, Daily Digest를 같은 상태로 맞췄다.
- Curating: 재사용 가치가 높은 멀티 에이전트 scope handoff 요청을 Prompt Library에 추가했다.
- Setup: Tailwind CSS를 기존 UI를 흔들지 않는 방식으로 빌드 파이프라인에 연결했다.
- Security Review: Next.js audit 결과를 major upgrade와 배포 전 패치 검토로 분리했다.

## Human Decisions

- Trading Bot 작업은 다른 에이전트가 담당한다.
- 이 에이전트는 기본 포트폴리오, LLM Wiki, Ask About Me, 운영 기록 정리에 집중한다.
- Vercel 연결과 배포는 아직 사용자 결정 전까지 진행하지 않는다.
- 기본 검증 기준은 계속 `npm run verify`로 둔다.

## Important Prompts

### 1. 담당 범위를 분리하고 나머지 작업을 계속 진행하는 패턴

> 트레이딩 봇 쪽은 다른 에이전트가 할 거니까 그 외에 작업 진행 사항과 앞으로 해야 할 일을 정리해줘.

Why it mattered:

멀티 에이전트 작업에서는 누가 어떤 프로젝트를 담당하는지 명확히 해야 같은 파일과 정책을 서로 다른 방향으로 바꾸지 않는다. 이번 요청으로 Trading Bot은 별도 범위로 두고, 기본 포트폴리오 품질 개선에 집중할 수 있었다.

Reusable pattern:

```text
[프로젝트/영역 A]는 다른 에이전트가 담당하니까 제외하고, 나머지 작업의 현재 상태와 다음 액션을 정리한 뒤 바로 진행해줘.
```

### 2. 계획만 세우지 않고 작은 작업부터 진행하는 패턴

> 나머지 작업들 계획 세워서 계속 진행해줘.

Why it mattered:

큰 백로그를 다시 읽은 뒤 가장 작은 미완료 항목부터 구현, 문서화, 검증까지 이어가게 만든다.

Reusable pattern:

```text
현재 Next Actions와 최근 작업 로그를 기준으로 남은 일을 작은 순서로 재정렬하고, 외부 결정이 필요 없는 항목부터 하나씩 구현해줘. 각 작업은 문서와 검증까지 함께 마무리해줘.
```

## Beginner Takeaways

- 프로젝트 카드에는 모든 링크를 넣기보다 “다음으로 읽기 좋은 2-3개”만 고르는 편이 낫다.
- 공용 컴포넌트가 여러 화면에서 쓰일 때는 특정 화면의 요구사항을 무리하게 밀어 넣기보다, 해당 화면에만 전용 구성을 두는 선택도 좋다.
- 멀티 에이전트 작업에서는 제외할 범위를 문서와 로그에 명시해야 충돌이 줄어든다.
- 검증 실패가 나오면 코드 문제인지 실행 환경 문제인지 먼저 분리한다.

## Verification

다음 명령으로 확인했다.

```bash
PATH=/Users/jo/.nvm/versions/node/v20.19.5/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin npm run verify
```

검증 결과:

- `npm run build` 성공
- 정적 페이지 105개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

로컬 서버 확인:

- `http://127.0.0.1:3002/projects` 응답 200
- 렌더된 HTML에서 프로젝트 resource links 확인

## Related Build Logs

- `content/logs/2026-06-30-project-card-resource-links.md`
- `content/logs/2026-06-30-multi-agent-scope-prompt.md`
- `content/logs/2026-06-30-prompt-ai-stack-discovery.md`
- `content/logs/2026-06-30-project-stale-claims.md`
- `content/logs/2026-06-30-ask-stale-design-refresh.md`
- `content/logs/2026-06-30-llm-wiki-lint-followup.md`
- `content/logs/2026-06-30-tailwind-setup.md`
- `content/logs/2026-06-30-next-audit-triage.md`

## Next Step

- 이후 LLM Wiki 품질 점검에서 Prompt Library와 AI Stack 문서의 발견 가능성을 확인한다.
- Vercel 연결은 Option A/B/C 중 사용자 결정 후 진행한다.
