# Wiki Index

## Summary

이 문서는 LLM Wiki의 콘텐츠 중심 색인이다.

LLM이나 사용자가 Wiki를 탐색할 때 먼저 읽는 진입점으로 사용한다.

## Core Pages

- [LLM Wiki Pattern](./llm-wiki-pattern.md): RAG 우선 전략에서 LLM이 유지보수하는 Markdown Wiki 우선 전략으로 전환한 이유와 운영 방식.
- [Vibe Coding](./vibe-coding.md): AI와 함께 기획, 구현, 검증, 문서화를 진행하는 개발 방식.
- [Daily Work Logging System](./daily-work-logging-system.md): 매일 아침 AI 협업 과정을 공유 가능한 작업 기록으로 정리하는 운영 방식.
- [Wiki Log](./log.md): LLM Wiki의 시간순 변경 기록.

## Concept Pages

- [LLM Wiki Pattern](./llm-wiki-pattern.md)
- [Vibe Coding](./vibe-coding.md)
- [Daily Work Logging System](./daily-work-logging-system.md)
- [MCP](./mcp.md)
- [AI Agent](./ai-agent.md)
- [Context Engineering](./context-engineering.md)
- [WebGPU](./webgpu.md)

## Project Pages

- [Personal LLM Wiki](../projects/llm-wiki.md): 포트폴리오와 질문형 인터페이스의 중심 지식 계층.
- [Ask About Me Chatbot](../projects/ask-about-me-chatbot.md): LLM Wiki를 기반으로 조정민에 대해 답변하는 후속 인터페이스.
- [Portfolio Site](../projects/portfolio-site.md): AI Product Studio의 웹 포트폴리오.
- [WebGPU Game](../projects/webgpu-game.md): AI를 활용해 WebGPU 기반 게임을 만드는 장기 실험 프로젝트.

## Interface Pages

- `/ask`: LLM Wiki 기반 Ask About Me mock 인터페이스. 예시 질문, 답변 정책, 참고 문서 mapping을 보여준다.
- `/ask/eval`: Ask About Me real mode 전환 전 품질, 안전, 비용 샘플 기준을 보여준다.
- [Ask Real Mode Evaluation](./ask-real-mode-evaluation.md): real LLM provider를 켜기 전 통과해야 할 평가 기준.
- [Production Rate Limit Store](./production-rate-limit-store.md): Ask About Me의 production persistent rate limit store 결정.
- [Real Mode Preview Deployment](./real-mode-preview-deployment.md): Ask About Me real mode를 처음 켤 제한 배포 환경 결정.
- [Vercel Preview Readiness Checklist](./vercel-preview-readiness-checklist.md): Preview real mode 전 환경 변수와 안전 조건을 점검하는 체크리스트.
- [Vercel Preview Smoke Test Runbook](./vercel-preview-smoke-test-runbook.md): Preview URL이 생긴 뒤 안전한 GET smoke test와 수동 검수 순서.

## Maintenance Notes

새 Wiki 문서가 생기면 이 파일에 한 줄 요약과 함께 추가한다.

LLM이 질문에 답할 때는 가능하면 이 index를 먼저 읽고 관련 문서로 이동한다.

## Maintenance Documents

- `knowledge/LLM_WIKI_SCHEMA.md`: Wiki 관리 규칙.
- `knowledge/LLM_WIKI_ARCHITECTURE.md`: LLM Wiki 중심 아키텍처.
- `knowledge/LLM_WIKI_INGEST_WORKFLOW.md`: raw source를 Wiki에 반영하는 절차.
- `knowledge/LLM_WIKI_LINT_CHECKLIST.md`: Wiki 건강 상태 점검 체크리스트.
- `knowledge/RAW_SOURCE_POLICY.md`: raw source 보존과 공개 안전 규칙.
- `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`: Ask About Me 답변 기준.
- `knowledge/ASK_ABOUT_ME_INTERFACE_DESIGN.md`: Ask About Me 인터페이스 단계별 설계.
- `knowledge/LLM_PROVIDER_ADAPTER_DESIGN.md`: real LLM provider adapter 설계.
- `knowledge/ASK_RATE_LIMIT_POLICY.md`: `/api/ask` rate limit과 비용 제한 기준.
- `knowledge/ASK_REAL_MODE_EVALUATION.md`: real mode 전환 전 비용/품질 샘플 기준.
- `knowledge/PRODUCTION_RATE_LIMIT_STORE_DECISION.md`: production persistent rate limit store 결정.
- `knowledge/REAL_MODE_DEPLOYMENT_ENVIRONMENT.md`: real mode 제한 배포 환경 결정.
- `knowledge/VERCEL_PREVIEW_READINESS_CHECKLIST.md`: Vercel Preview real mode 준비 상태 점검 기준.
- `knowledge/VERCEL_PREVIEW_SMOKE_TEST_RUNBOOK.md`: Preview URL smoke test와 수동 검수 절차.
- `knowledge/DAILY_WORK_LOGGING_SYSTEM.md`: 매일 작업 기록 운영 규칙.
