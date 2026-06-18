# Raw Source Policy

이 문서는 LLM Wiki에 반영하기 전 원본 자료를 어떻게 다룰지 정의한다.

## Purpose

Raw source는 LLM Wiki의 원재료이다.

Wiki 문서는 LLM이 요약하고 연결하고 갱신할 수 있지만, raw source는 원본성을 보존해야 한다.

## What Counts as Raw Source

Raw source의 예:

- AI 대화 원문
- 사용자가 붙여넣은 기획 메모
- 프로젝트 회고 원문
- 외부 글의 짧은 요약과 URL
- 회의 기록
- 실험 로그
- 스크린샷 또는 다이어그램

## Storage Location

```text
raw/
├── conversations/
├── articles/
├── notes/
└── assets/
```

## Public Safety Rule

이 저장소는 공개 포트폴리오 레포가 될 수 있다.

따라서 다음은 절대 저장하지 않는다.

- API Key
- Secret Key
- Access Token
- Refresh Token
- 계좌번호
- 주민등록번호
- 비밀번호
- 회사 내부 기밀
- 운영 서버 접속 정보
- 비공개 장애 대응 기록
- 고객 개인정보

## Source Metadata

가능하면 raw source 상단에 다음 정보를 남긴다.

```md
# Source Title

- Date: YYYY-MM-DD
- Type: conversation | article | note | asset
- Origin: 직접 작성 | ChatGPT 대화 | 외부 URL
- URL:
- Status: raw | ingested | archived
- Related Wiki:
```

## Modification Rule

Raw source는 의미가 바뀌도록 수정하지 않는다.

허용되는 수정:

- 오탈자 수정
- 민감한 정보 제거
- 출처 정보 추가
- status 업데이트

허용되지 않는 수정:

- 원문 의미 변경
- LLM 요약으로 원문 덮어쓰기
- 출처 삭제
- 민감한 정보를 남긴 채 공개 저장소에 커밋

## Ingest Rule

Raw source를 Wiki에 반영하면 다음을 수행한다.

1. 관련 Wiki 문서를 업데이트한다.
2. 필요한 새 Wiki 문서를 만든다.
3. `content/wiki/index.md`를 업데이트한다.
4. `content/wiki/log.md`에 ingest 기록을 추가한다.
5. raw source의 `Status`를 `ingested`로 바꿀 수 있다.

