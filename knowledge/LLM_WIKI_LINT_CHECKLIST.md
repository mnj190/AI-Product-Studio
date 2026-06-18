# LLM Wiki Lint Checklist

이 문서는 LLM Wiki의 건강 상태를 점검하기 위한 체크리스트이다.

Wiki는 시간이 지날수록 문서가 늘어나고 설명이 바뀐다.

따라서 주기적으로 lint를 실행해 오래된 설명, 중복, 고립 문서, 약한 출처를 정리해야 한다.

## When To Run Lint

다음 상황에서 Wiki lint를 실행한다.

- 큰 방향 전환이 있었을 때
- 새 source를 여러 개 ingest한 뒤
- Build Log가 많이 쌓인 뒤
- 문서 간 설명이 어긋난다고 느껴질 때
- 새 프로젝트를 추가하기 전
- Ask About Me 인터페이스를 붙이기 전

## Lint Scope

기본 점검 대상:

- `content/about`
- `content/projects`
- `content/prompts`
- `content/logs`
- `content/ai-stack`
- `content/wiki`
- `knowledge`

raw source는 원본 보존 레이어이므로 lint의 수정 대상이 아니다.

다만 raw source가 Wiki에 반영되었는지 확인할 수는 있다.

## Checklist

### 1. Stale Claims

오래된 설명이 남아 있는지 확인한다.

- [ ] 현재 Roadmap과 맞지 않는 설명이 있는가?
- [ ] 이전 방향이 현재 목표처럼 쓰여 있는가?
- [ ] 완료된 작업이 아직 예정 작업으로 남아 있는가?
- [ ] 파일명이 바뀌었는데 오래된 링크가 남아 있는가?

### 2. Contradictions

문서 간 설명이 충돌하는지 확인한다.

- [ ] 한 문서에서는 RAG 우선이라고 하고, 다른 문서에서는 LLM Wiki 우선이라고 하는가?
- [ ] MVP 범위와 Roadmap이 다르게 말하는가?
- [ ] 프로젝트 문서와 실제 구현 상태가 다르게 말하는가?
- [ ] 보안 규칙과 콘텐츠 예시가 충돌하는가?

중요: 모든 contradiction이 삭제 대상은 아니다.

관점 차이나 의사결정 변화는 `content/wiki/log.md` 또는 Build Log에 변화 기록으로 남긴다.

### 3. Orphan Pages

고립된 문서를 찾는다.

- [ ] `content/wiki/index.md`에 없는 Wiki 문서가 있는가?
- [ ] 프로젝트 문서에서 관련 로그나 프롬프트로 연결되지 않는가?
- [ ] 중요한 문서인데 홈/목록/색인에서 찾기 어려운가?

### 4. Missing Pages

자주 언급되지만 별도 문서가 없는 개념을 찾는다.

- [ ] MCP가 여러 번 언급되지만 `content/wiki/mcp.md`가 없는가?
- [ ] AI Agent가 여러 번 언급되지만 별도 문서가 없는가?
- [ ] WebGPU Game이 프로젝트 후보인데 문서가 없는가?
- [ ] raw source나 ingest workflow가 웹에서 설명되지 않는가?

### 5. Weak Sources

출처가 약한 설명을 확인한다.

- [ ] 외부 아이디어를 참고했는데 URL이 없는가?
- [ ] 사용자의 결정인지 AI의 제안인지 구분되지 않는가?
- [ ] 날짜가 중요한 결정인데 날짜가 없는가?
- [ ] “현재”, “최근”, “나중에” 같은 표현이 모호한가?

### 6. Duplicate Content

중복 설명을 확인한다.

- [ ] 같은 설명이 여러 문서에 거의 그대로 반복되는가?
- [ ] 반복되어야 한다면 각 문서의 역할이 분명한가?
- [ ] 한 곳을 수정하면 다른 곳도 수정해야 하는 위험한 중복인가?

### 7. Security

공개 저장소에 들어가면 안 되는 내용이 있는지 확인한다.

- [ ] API Key가 있는가?
- [ ] 토큰이 있는가?
- [ ] 계좌번호나 개인정보가 있는가?
- [ ] 회사 내부 기밀이 있는가?
- [ ] 운영 서버 정보가 있는가?
- [ ] 민감한 스크린샷이 있는가?

### 8. Build Compatibility

웹 렌더링에 문제가 없는지 확인한다.

- [ ] 파일명이 영어 소문자와 하이픈 규칙을 따르는가?
- [ ] Markdown 문법이 현재 렌더러에서 깨지지 않는가?
- [ ] 새 문서가 목록 페이지에 나타나는가?
- [ ] `npm run build`가 성공하는가?

## Lint Output Format

Lint 결과는 다음 형식으로 기록한다.

```md
## [YYYY-MM-DD] lint | Wiki Health Check

### Findings

- Critical:
  - 항목
- Important:
  - 항목
- Nice to Have:
  - 항목

### Updates Made

- `path/to/file.md`: 변경 내용

### Follow-up

- 다음 작업
```

## Severity

### Critical

즉시 수정해야 한다.

예:

- 민감한 정보 노출
- 빌드 실패
- 현재 목표와 정면으로 충돌하는 설명

### Important

가까운 시일 내 수정해야 한다.

예:

- 오래된 Roadmap
- 누락된 index 링크
- 중요한 개념 문서 부재

### Nice to Have

나중에 정리해도 된다.

예:

- 표현 개선
- 중복 문장 줄이기
- 관련 링크 추가

