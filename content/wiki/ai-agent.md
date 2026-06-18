# AI Agent

## Summary

AI Agent는 단일 질문에 답하는 것을 넘어, 목표를 여러 단계로 나누고 도구를 사용해 작업을 이어가는 AI 사용 방식이다.

이 프로젝트에서는 AI Agent를 “자동으로 모든 것을 맡기는 존재”가 아니라, 문서와 규칙을 기반으로 안전하게 작업을 이어가는 협업자에 가깝게 본다.

## Why It Matters

AI Product Studio는 AI와 함께 기획, 구현, 검증, 문서화를 반복하는 포트폴리오이다.

이 흐름에서는 Agent가 다음 역할을 할 수 있다.

- 작업 계획 수립
- 파일 수정
- 빌드 검증
- 문서 업데이트
- Build Log 작성
- Wiki ingest 보조

## Principles

AI Agent를 사용할 때 중요한 원칙:

- 목표를 작게 나눈다.
- 변경 전 현재 상태를 확인한다.
- 민감 정보에 접근하지 않는다.
- 빌드나 테스트로 검증한다.
- 작업 기록을 남긴다.
- 사용자의 의도를 임의로 확대하지 않는다.

## Planned Experiments

- LLM Wiki ingest를 Agent workflow로 정리하기
- Build Log 자동 초안 작성
- Ask About Me 질문을 Wiki 업데이트 후보로 분류
- 프로젝트별 작업 체크리스트 자동 생성

## Current Status

현재는 Codex를 활용해 Agent-like workflow를 수동으로 진행하고 있다.

실제 autonomous agent 시스템은 아직 구현하지 않았다.

## Risks

- 잘못된 목표를 빠르게 실행할 수 있다.
- 문서와 코드가 어긋날 수 있다.
- 권한이 과도하면 보안 위험이 커진다.
- 사용자의 판단 없이 자동 반영하면 품질이 떨어질 수 있다.

## Next Step

먼저 사람이 검토할 수 있는 반자동 workflow를 만든다.

예: 질문/답변을 자동 저장하지 않고, Wiki 반영 후보만 보여주는 방식.

