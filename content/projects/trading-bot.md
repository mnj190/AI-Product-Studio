# AI Trading Bot

## Summary

AI와 함께 만드는 자동매매봇 프로젝트.

공개 가능한 개발 과정, 기술적 의사결정, 요약 수준의 운영 회고를 포트폴리오 콘텐츠로 활용한다.

## Why I Built This

자동매매봇은 AI 활용 개발의 좋은 실험 주제이다.

전략 설계, API 연동, 실시간 데이터 처리, 운영 로그, 리스크 관리, 결과 분석을 모두 포함하기 때문이다.

단, 이 프로젝트는 투자 권유가 아니라 개발 및 실험 기록이다.

## AI Usage

AI는 다음 영역에서 활용한다.

- 전략 아이디어 정리
- API 문서 분석
- 코드 초안 작성
- 리팩토링
- 로그 분석
- 운영 기록 정리
- 실패 사례 분석

## Main Features

- 거래 전략 테스트
- 실시간 또는 준실시간 계좌 상태 확인
- 거래 내역 기록
- 수익률 추적
- 전략 변경 이력 관리
- 실패 사례 기록
- 운영 로그 관리

## Tech Stack

초기 후보:

- Java 또는 Python
- Spring Boot 또는 FastAPI
- PostgreSQL
- Redis
- 외부 증권 API
- Docker
- Scheduler 또는 Batch Job

## Prompt Examples

예상 프롬프트:

- 자동매매 전략을 개발자 관점에서 안전하게 실험하는 방법을 정리해줘.
- 거래 로그를 분석해서 전략 변경 후보를 찾아줘.
- 이 API 문서를 기반으로 주문/잔고 조회 모듈 구조를 설계해줘.

## Build Process

1. 공개 가능한 범위와 비공개 정보를 구분한다.
2. 증권 API 연동 구조를 설계한다.
3. 계좌/거래/전략/로그 데이터 모델을 정의한다.
4. 최소 기능으로 조회 및 기록 기능을 만든다.
5. 전략 테스트와 운영 로그를 축적한다.
6. 포트폴리오에 공개 가능한 지표만 노출한다.

## Portfolio Integration

trading-bot 자체 코드는 별도 비공개 레포에서 관리한다.

이 포트폴리오에는 공개 가능한 작업 로그와 기술적 의사결정만 반영한다.

공개 로그를 반영할 때는 현재 포트폴리오 구조에 맞춰 다음 파일명 규칙을 사용한다.

```text
content/logs/YYYY-MM-DD-trading-topic.md
```

프로젝트 간 연결 규칙은 `knowledge/CROSS_PROJECT.md`와 `knowledge/WORKSPACE_GUIDE.md`를 기준으로 관리한다.

### Public Content Rules

포트폴리오에 포함할 수 있는 것:

- 전략 설계 과정
- API 연동 구조
- 오류 분석과 해결 과정
- 백테스트 결과의 상대적 지표
- AI를 활용한 문서 분석, 코드 설계, 로그 분석 방식

포트폴리오에 포함하지 않는 것:

- API key, secret
- 계좌번호
- 구체적인 계좌 잔고
- 구체적인 수익/손실 금액
- 특정 종목의 매수/매도 시점과 수량
- 투자 권유처럼 읽힐 수 있는 표현

## Result

장기적으로 실제 운영 로그와 수익률 변화를 공개 가능한 범위에서 보여주는 것이 목표이다.

현재는 프로젝트 개념과 문서 기준을 정리하는 단계이다.

## Lessons Learned

자동매매 프로젝트는 흥미롭지만, 표현을 조심해야 한다.

수익 보장, 추천 종목, 매수/매도 권유처럼 보이는 표현은 피하고, 실험 기록과 개발 과정 중심으로 다룬다.

## Links

- 공개 프로젝트 페이지: `/projects/trading-bot`
- 관련 작업 로그:
  - `/logs/2026-06-27-trading-bot-portfolio-integration`
  - `/logs/2026-06-27-trading-bot-answer-guard`
- 관련 기준 문서:
  - `knowledge/CROSS_PROJECT.md`
  - `knowledge/WORKSPACE_GUIDE.md`
  - `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`
- 연결된 Wiki:
  - `/wiki/index`
