# Context Engineering

## Summary

Context Engineering은 AI가 좋은 답변이나 작업 결과를 만들 수 있도록 필요한 맥락을 설계하고 제공하는 일이다.

프롬프트 한 줄을 잘 쓰는 것보다, AI가 참고할 문서, 규칙, 예시, 제한 조건, 작업 기록을 잘 구성하는 것이 중요하다.

## Why It Matters

AI Product Studio에서는 코드보다 문서와 기록이 핵심 자산이다.

AI가 프로젝트 방향을 잃지 않으려면 다음이 필요하다.

- 프로젝트 목적
- 작업 규칙
- 콘텐츠 구조
- Roadmap
- Next Actions
- LLM Wiki Schema
- Build Log

이 자료들이 AI에게 제공되는 context가 된다.

## Examples in This Project

현재 context engineering에 해당하는 문서:

- `knowledge/PROJECT_CONTEXT.md`
- `knowledge/AI_WORK_RULES.md`
- `knowledge/CONTENT_STRUCTURE.md`
- `knowledge/ROADMAP.md`
- `knowledge/NEXT_ACTIONS.md`
- `knowledge/LLM_WIKI_SCHEMA.md`
- `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`

## Good Context

좋은 context의 특징:

- 현재 목표가 명확하다.
- 하지 말아야 할 것이 적혀 있다.
- 파일 구조가 설명되어 있다.
- 완료 기준이 있다.
- 보안 규칙이 있다.
- 과거 결정이 기록되어 있다.

## Bad Context

나쁜 context의 특징:

- 목표가 추상적이다.
- 오래된 계획이 현재 계획처럼 남아 있다.
- 코드와 문서가 충돌한다.
- 민감한 정보가 섞여 있다.
- 다음 작업이 불명확하다.

## Next Step

LLM Wiki가 커질수록 index, log, schema를 관리해 AI가 필요한 context를 빠르게 찾을 수 있게 한다.

