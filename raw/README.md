# Raw Sources

이 폴더는 LLM Wiki에 반영하기 전의 원본 자료를 보관한다.

`raw/`의 목적은 원본성을 보존하는 것이다.

LLM은 이 폴더의 자료를 읽고 `content/` 아래 Wiki 문서에 통합할 수 있지만, 원본 자료 자체를 임의로 요약본으로 덮어쓰거나 의미가 바뀌도록 수정하면 안 된다.

## Structure

```text
raw/
├── conversations/
├── articles/
├── notes/
└── assets/
```

## Rules

- 원본 자료는 가능한 한 그대로 보관한다.
- 민감한 정보는 저장하지 않는다.
- API Key, 토큰, 계좌번호, 주민등록번호, 회사 내부 기밀은 절대 저장하지 않는다.
- 공개 가능한 자료만 이 저장소에 둔다.
- 비공개 자료는 별도 비공개 저장소나 로컬 private 공간에 둔다.
- Wiki에 반영한 경우 `content/wiki/log.md`에 기록한다.

## Filename Rule

파일명은 영어 소문자와 하이픈을 사용한다.

추천 형식:

```text
YYYY-MM-DD-short-title.md
```

예시:

```text
2026-06-18-ai-portfolio-planning.md
2026-06-18-llm-wiki-reference.md
```

