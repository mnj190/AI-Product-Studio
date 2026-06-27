# Cross-Project Connections

여러 프로젝트가 어떻게 연결되고 데이터를 공유하는지 정의한다.

## 프로젝트 목록

| 프로젝트 | 경로 | 역할 |
|---|---|---|
| VIBE_PROJECT | `/Users/jo/Desktop/VIBE_PROJECT` | 포트폴리오 허브, 공유 지식 HQ |
| trading-bot | `/Users/jo/Desktop/trading-bot` | 자동매매봇 엔진 |

## 데이터 흐름

```
trading-bot/
  logs/                    ─── 공개 가능 거래 로그 생성
  reports/                 ─── 수익률 리포트 생성
        │
        ▼
VIBE_PROJECT/
  content/logs/            ← trading-bot 공개 로그 복사 경로
  content/projects/
    trading-bot.md         ← 수익률/현황 수동 업데이트
```

## 연결 규칙

### trading-bot → VIBE_PROJECT

trading-bot이 포트폴리오에 노출할 콘텐츠를 생성할 때:

1. **거래 로그**: `trading-bot/logs/public/` 에 공개용 로그 생성
2. **복사 경로**: `VIBE_PROJECT/content/logs/YYYY-MM-DD-trading-topic.md`
3. **포함 금지**: API key, 계좌번호, 증권사 ID, 정확한 매수/매도 금액 (법적 이슈)
4. **포함 가능**: 전략 변경 이유, 실험 결과, 오류 분석, 기술적 의사결정

현재 포트폴리오 사이트는 `content/logs/*.md`만 자동으로 Build Log 목록에 노출한다.

따라서 `content/logs/trading/` 같은 하위 폴더를 사용하려면 먼저 콘텐츠 로더를 확장해야 한다.

### VIBE_PROJECT → trading-bot

포트폴리오 사이트가 봇에 영향을 주는 경우:

- 없음. 포트폴리오는 trading-bot 출력을 소비만 한다.

## 공개 기준 (trading-bot 콘텐츠)

포트폴리오에 올릴 수 있는 것:

- 전략 설계 과정
- 기술적 구현 결정 (어떤 라이브러리, 왜)
- 버그 발견과 수정 과정
- 백테스트 결과 (상대적 지표, 절대 금액 제외)
- 운영 중 발생한 문제와 해결 방법
- AI 활용 방식 (어떤 프롬프트로 뭘 만들었는지)

포트폴리오에 올리면 안 되는 것:

- 구체적인 계좌 잔고
- 구체적인 수익/손실 금액
- API key, secret, 계좌번호
- 특정 종목 매수/매도 시점과 수량
- 투자 권유처럼 읽힐 수 있는 표현

## 향후 추가 프로젝트 연결 방법

새 프로젝트가 생기면:

1. 이 파일에 프로젝트 추가
2. `AGENT_SYNC.md`에 담당 에이전트 추가
3. 해당 프로젝트의 `knowledge/PROJECT_CONTEXT.md`에 연결 지점 명시
4. 공유 데이터가 있으면 `VIBE_PROJECT/content/` 하위 경로 확정
