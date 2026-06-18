# LLM Wiki Ingest Workflow

이 문서는 새로운 자료를 LLM Wiki에 반영하는 절차를 정의한다.

목표는 raw source를 단순 보관하는 것이 아니라, 기존 Wiki에 통합해 지식이 누적되도록 만드는 것이다.

## When To Run Ingest

다음 상황에서 ingest를 실행한다.

- 중요한 AI 대화가 생겼을 때
- 프로젝트 방향이 바뀌었을 때
- 새 외부 참고 자료를 읽었을 때
- 좋은 프롬프트를 발견했을 때
- Build Log에 남길 작업이 생겼을 때
- 기존 Wiki 문서와 연결되는 새 아이디어가 생겼을 때

## Inputs

Ingest 입력은 보통 다음 중 하나이다.

- `raw/conversations/*.md`
- `raw/articles/*.md`
- `raw/notes/*.md`
- 사용자가 직접 붙여넣은 대화나 메모
- 외부 URL 요약

## Output Targets

Ingest 결과는 보통 다음 파일 중 하나 이상에 반영된다.

- `content/about/*.md`
- `content/projects/*.md`
- `content/prompts/*.md`
- `content/logs/*.md`
- `content/ai-stack/*.md`
- `content/wiki/*.md`
- `content/wiki/index.md`
- `content/wiki/log.md`

## Step-by-Step Workflow

### 1. Read Source

원본 자료를 읽고 다음을 파악한다.

- 이 자료가 무엇에 관한 것인가?
- 프로젝트 방향에 영향을 주는가?
- 기존 Wiki 문서와 연결되는가?
- 새 문서가 필요한가?
- 민감한 정보가 포함되어 있는가?

### 2. Extract Signals

다음 항목을 추출한다.

- 핵심 아이디어
- 결정사항
- 새로 알게 된 것
- 기존 계획에서 바뀐 점
- 관련 프로젝트
- 관련 프롬프트
- 후속 작업

### 3. Map To Existing Wiki

기존 문서를 확인한다.

우선 확인할 파일:

- `content/wiki/index.md`
- `knowledge/PROJECT_CONTEXT.md`
- `knowledge/ROADMAP.md`
- `knowledge/NEXT_ACTIONS.md`
- 관련 `content/projects/*.md`
- 관련 `content/wiki/*.md`

### 4. Update Existing Pages

새 정보가 기존 문서에 속한다면 새 문서를 만들기보다 기존 문서를 갱신한다.

업데이트 기준:

- 더 정확한 설명으로 수정
- 오래된 표현 교체
- 새 결정사항 추가
- 관련 문서 링크 추가
- 다음 작업 업데이트

### 5. Create New Pages When Needed

다음 경우에는 새 문서를 만든다.

- 기존 문서에 넣으면 너무 길어지는 개념
- 여러 문서에서 반복해서 등장하는 주제
- 독립적으로 탐색할 가치가 있는 프로젝트
- 재사용 가능한 프롬프트
- 장기적으로 추적할 실험

### 6. Update Index

새 문서가 생기거나 핵심 문서가 바뀌면 `content/wiki/index.md`를 갱신한다.

업데이트할 것:

- 문서 링크
- 한 줄 요약
- 카테고리
- 관련 문서

### 7. Append Log

`content/wiki/log.md`에 변경 기록을 추가한다.

형식:

```md
## [YYYY-MM-DD] ingest | Source Title

- Source: `raw/...`
- Updated:
  - `content/wiki/example.md`
- Created:
  - `content/wiki/new-page.md`
- Decisions:
  - 결정사항
- Next:
  - 다음 작업
```

### 8. Add Build Log When Useful

포트폴리오 진행 과정으로 보여줄 가치가 있으면 `content/logs/`에도 별도 Build Log를 작성한다.

Build Log는 사용자에게 보여주는 작업 기록이고, Wiki log는 Wiki 유지보수 기록이다.

둘은 역할이 다르다.

## Ingest Checklist

Ingest를 마치기 전에 확인한다.

- [ ] 민감한 정보가 공개 문서에 들어가지 않았다.
- [ ] 기존 문서를 먼저 업데이트할지 새 문서를 만들지 판단했다.
- [ ] 관련 문서 링크를 추가했다.
- [ ] `content/wiki/index.md`를 업데이트했다.
- [ ] `content/wiki/log.md`에 기록했다.
- [ ] 필요한 경우 `knowledge/NEXT_ACTIONS.md`를 업데이트했다.
- [ ] 필요한 경우 Build Log를 작성했다.
- [ ] `npm run build`로 웹 렌더링을 확인했다.

## Anti-Patterns

피해야 할 것:

- raw source를 요약본으로 덮어쓰기
- 같은 내용을 여러 문서에 중복 작성하기
- 새 문서만 계속 만들고 기존 문서를 갱신하지 않기
- 출처 없이 강한 주장 남기기
- 민감한 정보가 포함된 원문을 공개 저장소에 커밋하기
- 질문에 대한 좋은 답변을 채팅 기록에만 남기고 Wiki에 반영하지 않기

