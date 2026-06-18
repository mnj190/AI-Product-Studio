# LLM Answer API Design

이 문서는 Ask About Me 인터페이스의 LLM Answer API 설계를 정의한다.

현재 단계에서는 실제 외부 LLM API를 호출하지 않는다.

먼저 Local Wiki Lookup 결과를 어떤 형식으로 답변 생성 단계에 넘길지, 어떤 guard를 적용할지 정의한다.

## Goal

사용자의 질문과 Local Wiki Lookup 결과를 바탕으로 문서 기반 답변을 생성한다.

답변은 다음 원칙을 따른다.

- Wiki first
- No guessing
- Source shown
- Safety first

## Request Shape

초기 API:

```ts
type AskRequest = {
  question: string;
};
```

Route:

```text
POST /api/ask
```

서버 내부에서는 다음 컨텍스트를 구성한다.

```ts
type AnswerContext = {
  question: string;
  results: LookupResult[];
  sources: AnswerSource[];
  policy: string;
};
```

## Source Shape

```ts
type AnswerSource = {
  title: string;
  section: string;
  href: string;
  summary: string;
  matchedTerms: string[];
  excerpt: string;
};
```

## Response Shape

초기 응답 후보:

```ts
type AskResponse = {
  status: "answered" | "unknown" | "blocked";
  query: string;
  answer: string;
  sources: AnswerSource[];
  results: LookupResult[];
  warnings: string[];
  feedback: FeedbackCandidate | null;
  mode: "mock" | "real";
};
```

현재 구현은 `mode: "mock"`만 지원한다.

외부 LLM API는 호출하지 않는다.

## Answer Guard

답변 생성 전 다음 조건을 확인한다.

### 1. Empty Question

질문이 비어 있으면 답변하지 않는다.

### 2. No Source

관련 문서가 없으면 unknown으로 처리한다.

문구:

```text
현재 LLM Wiki에는 해당 내용이 충분히 정리되어 있지 않습니다.
```

### 3. Sensitive Request

다음 요청은 blocked로 처리한다.

- API Key
- token
- password
- 계좌번호
- 주민등록번호
- 회사 내부 기밀
- 운영 서버 정보
- 고객 개인정보

### 4. Trading Advice

자동매매봇 관련 질문에서 투자 권유를 요구하면 blocked 또는 안전한 설명으로 전환한다.

금지:

- 종목 추천
- 매수/매도 권유
- 수익 보장

허용:

- 개발 구조 설명
- 실험 기록 설명
- 리스크와 실패 사례 설명

## Prompt Contract

나중에 실제 LLM API를 붙일 때 시스템 지침은 다음 문서를 기반으로 만든다.

- `knowledge/ASK_ABOUT_ME_ANSWER_POLICY.md`
- `knowledge/LLM_WIKI_SCHEMA.md`
- `knowledge/RAW_SOURCE_POLICY.md`

LLM에 전달할 컨텍스트는 Local Wiki Lookup 상위 결과로 제한한다.

권장 제한:

- sources: 최대 5개
- excerpt: 문서당 800자 이하
- answer: 5~8문장

## Draft Answer Before LLM

LLM API를 붙이기 전에는 deterministic draft answer를 사용한다.

초기 draft는 다음 형식이다.

```text
이 질문에 답하기 위해 다음 문서를 먼저 확인해야 합니다.

1. 문서 제목 — 요약
2. 문서 제목 — 요약

현재 단계에서는 실제 LLM 답변 생성 전이므로, 아래 문서를 읽는 것을 권장합니다.
```

이 draft는 실제 답변처럼 보이기보다, 어떤 근거 문서를 사용할지 보여주는 역할이다.

## UI Requirements

`/ask` 페이지에는 다음을 표시한다.

- 질문
- draft answer
- source cards
- matched terms
- safety/unknown warning
- 다음 단계 안내

## Next Implementation Step

1. `ASK_API_MODE=mock`을 유지한다.
2. `/api/ask` route의 response contract를 안정화한다.
3. 실제 LLM 연동이 필요해지면 provider adapter를 추가한다.
4. 공개 배포 전 rate limit과 비용 제한을 적용한다.
