# MCP

## Summary

MCP는 Model Context Protocol의 약자이다.

AI가 외부 도구, 데이터, 애플리케이션과 더 일관된 방식으로 연결될 수 있게 하는 프로토콜로 이해하고 있다.

## Why It Matters

AI를 단순 채팅 도구로 쓰는 것을 넘어 실제 개발 환경, 문서, 브라우저, 데이터 소스와 연결하려면 공통된 연결 방식이 필요하다.

MCP는 AI Agent가 외부 컨텍스트를 더 안전하고 구조적으로 사용할 수 있게 만드는 방향으로 중요하다.

## Planned Use in This Project

AI Product Studio에서는 MCP를 장기 실험 주제로 둔다.

가능한 실험:

- 개인 Wiki 문서 읽기
- GitHub 작업 흐름 연결
- Build Log 자동 작성 보조
- 브라우저 검증 도구 연결
- 로컬 개발 환경과 AI Agent 연결

## Current Status

현재는 개념 정리 단계이다.

실제 MCP 서버나 도구 구현은 아직 하지 않았다.

## Risks

- 외부 도구 접근 권한이 과도해질 수 있다.
- 민감한 파일이나 환경변수에 접근하지 않도록 제한이 필요하다.
- 자동화가 많아질수록 변경 기록과 검증이 중요해진다.

## Next Step

- MCP가 이 포트폴리오에서 어떤 문제를 해결할지 정의한다.
- 작은 read-only 도구부터 실험한다.
- 보안 정책과 권한 범위를 먼저 문서화한다.

