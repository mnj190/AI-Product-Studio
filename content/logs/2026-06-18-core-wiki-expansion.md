# 2026-06-18 - Core Wiki Expansion

## What I Did

Ask About Me lookup 품질을 높이기 위해 누락된 핵심 Wiki 문서와 장기 프로젝트 문서를 추가했다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- API 연동 전에 콘텐츠 밀도를 먼저 올린다.
- 문서 구조에 언급되지만 실제 파일이 없던 주제를 우선 작성한다.
- WebGPU Game은 아직 구현 전 장기 목표로 담백하게 정리한다.
- MCP, AI Agent, Context Engineering, WebGPU는 Ask About Me와 LLM Wiki 검색 품질을 높이는 핵심 개념 문서로 둔다.

## Documents Added

- `content/projects/webgpu-game.md`
- `content/wiki/mcp.md`
- `content/wiki/ai-agent.md`
- `content/wiki/context-engineering.md`
- `content/wiki/webgpu.md`

## Documents Updated

- `content/wiki/index.md`
- `content/wiki/log.md`
- `knowledge/NEXT_ACTIONS.md`

## Verification

다음 단계에서 `npm run build`로 새 프로젝트/Wiki 문서가 정상 라우팅되는지 확인한다.

## Next Step

- UI/콘텐츠 품질 점검
- Ask 페이지 사용성 개선
- 이후 real LLM provider adapter와 rate limit 정책 설계 여부 결정

