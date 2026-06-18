# Ask Feedback Loop Design

이 문서는 Ask About Me에서 나온 질문과 답변을 LLM Wiki에 다시 반영하는 feedback loop를 정의한다.

## Goal

좋은 질문과 답변이 일회성 채팅으로 사라지지 않게 한다.

Ask About Me에서 반복되거나 가치 있는 질문은 Wiki 문서, Prompt Library, Build Log, Wiki Log로 반영할 수 있어야 한다.

## Principle

모든 질문을 저장하지 않는다.

저장 기준은 다음과 같다.

- 3개월 뒤 다시 봐도 가치가 있는가?
- 기존 Wiki의 빈틈을 드러냈는가?
- 프로젝트 방향이나 설명을 더 선명하게 만드는가?
- 다른 방문자도 궁금해할 가능성이 높은가?
- 새 문서나 기존 문서 업데이트로 이어질 수 있는가?

## Do Not Save

다음 질문은 저장하지 않는다.

- 민감 정보 요청
- 투자 권유 요청
- 단순 잡담
- 일회성 오류 질문
- 문서와 무관한 질문
- 개인정보가 포함된 질문

## Feedback Actions

질문/답변을 보고 다음 중 하나를 선택한다.

### 1. No Action

저장할 가치가 없거나 이미 충분히 문서화되어 있다.

### 2. Update Existing Page

기존 문서에 보강하면 된다.

예시:

- `content/about/about-me.md`
- `content/projects/ask-about-me-chatbot.md`
- `content/wiki/llm-wiki-pattern.md`

### 3. Create New Wiki Page

기존 문서에 넣기엔 독립적인 주제이다.

예시:

- `content/wiki/mcp.md`
- `content/wiki/ai-agent.md`
- `content/wiki/context-engineering.md`

### 4. Add Prompt

질문 자체가 재사용 가능한 프롬프트라면 Prompt Library에 저장한다.

예시:

- `content/prompts/ask-about-me-evaluation.md`

### 5. Add Build Log

질문이 프로젝트 진행 과정이나 의사결정에 영향을 줬다면 Build Log로 남긴다.

예시:

- `content/logs/YYYY-MM-DD-ask-feedback-loop.md`

## Suggested Metadata

나중에 실제 저장 기능을 만들 경우 다음 metadata를 사용한다.

```ts
type FeedbackCandidate = {
  question: string;
  action: "none" | "update" | "create" | "prompt" | "log";
  targetPath?: string;
  reason: string;
  sourceHrefs: string[];
  safety: "ok" | "blocked" | "unknown";
};
```

## UI Direction

`/ask` 페이지는 답변 아래에 다음을 보여준다.

- 이 질문은 Wiki에 반영할 가치가 있는가?
- 추천 action
- 추천 target document
- 이유
- 다음 수동 작업 안내

초기에는 실제 파일을 자동 수정하지 않는다.

먼저 후보만 보여준다.

## Manual Workflow

초기 수동 workflow:

1. 사용자가 질문한다.
2. Local Wiki Lookup과 draft answer를 확인한다.
3. feedback candidate를 확인한다.
4. 반영할 가치가 있으면 Codex에게 ingest를 요청한다.
5. Codex는 관련 문서를 업데이트한다.
6. `content/wiki/log.md`에 기록한다.
7. 필요한 경우 Build Log를 작성한다.

## Future Automation

나중에 자동화할 수 있는 것:

- feedback candidate 저장
- GitHub issue 생성
- Wiki update draft 생성
- Pull request 생성
- Wiki log 자동 append

하지만 현재 단계에서는 자동 파일 수정 버튼을 만들지 않는다.

공개 포트폴리오에서 사용자의 자유 입력을 바로 파일로 저장하는 것은 보안과 품질 리스크가 크다.

