# Local Wiki Lookup Design

이 문서는 Ask About Me 인터페이스의 Local Wiki Lookup 단계를 정의한다.

실제 LLM API를 붙이기 전에, 사용자가 입력한 질문과 관련된 Markdown 문서 후보를 찾는 기능을 먼저 만든다.

## Goal

질문이 들어오면 LLM Wiki와 공개 콘텐츠 문서 중 관련성이 높은 문서를 찾아 보여준다.

이 단계에서는 답변을 생성하지 않는다.

대신 다음을 보여준다.

- 관련 문서 후보
- 문서 요약
- 왜 매칭되었는지 알 수 있는 점수
- 문서로 이동하는 링크

## Why Before LLM API

LLM 답변 품질은 어떤 문서를 근거로 제공하느냐에 크게 의존한다.

따라서 먼저 로컬 문서 lookup을 구현해 다음을 검증한다.

- 어떤 문서가 검색 대상인가?
- 질문이 들어왔을 때 적절한 문서를 찾는가?
- 출처 표시가 가능한가?
- 문서가 부족한 질문을 발견할 수 있는가?

## Search Scope

검색 대상:

- `content/wiki`
- `content/about`
- `content/projects`
- `content/prompts`
- `content/ai-stack`
- `content/logs`

검색 우선순위:

1. Wiki
2. About
3. Projects
4. Prompts
5. AI Stack
6. Logs

## Initial Algorithm

초기에는 단순 keyword scoring을 사용한다.

작동 방식:

1. 질문을 정규화한다.
2. 질문에서 검색어를 추출한다.
3. 각 문서의 title, summary, body를 비교한다.
4. title match에 더 높은 가중치를 준다.
5. summary match에 중간 가중치를 준다.
6. body match에 낮은 가중치를 준다.
7. section priority를 가산한다.
8. 점수가 높은 문서를 상위에 보여준다.

## Korean Query Note

한국어는 띄어쓰기와 조사 때문에 단순 검색이 완벽하지 않다.

초기 MVP에서는 다음 방식을 사용한다.

- 2글자 이상 token만 사용
- 원문 전체 substring match도 함께 확인
- 자주 등장하는 불용어는 제거

나중에 필요하면 형태소 분석, BM25, qmd, embedding search 등을 검토한다.

## Result Shape

```ts
type LookupResult = {
  entry: ContentEntry;
  href: string;
  score: number;
  matchedTerms: string[];
};
```

## UI Behavior

`/ask?q=질문` 형태로 동작한다.

페이지 구성:

1. 질문 입력 form
2. 검색 결과 목록
3. 결과가 없을 때 안내
4. 예시 질문
5. 답변 정책

## Non-Goals

이번 단계에서는 하지 않는다.

- LLM 답변 생성
- 사용자 질문 저장
- 서버 DB 저장
- Vector DB
- 외부 검색
- 개인정보 입력

## Next Step After This

Local Wiki Lookup이 안정화되면 다음 단계로 간다.

1. 검색 결과를 기반으로 답변 draft를 생성한다.
2. `ASK_ABOUT_ME_ANSWER_POLICY.md`를 시스템 지침으로 사용한다.
3. 답변에 출처를 표시한다.
4. 좋은 질문과 답변을 Wiki에 다시 반영한다.

