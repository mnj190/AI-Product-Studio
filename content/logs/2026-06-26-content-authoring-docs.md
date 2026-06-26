# 2026-06-26 - Content Authoring Docs

## What I Did

README에 Content Authoring 섹션을 추가했다.

이 프로젝트는 코드보다 문서와 기록이 핵심 자산이다. 따라서 새 프로젝트, 프롬프트, Build Log, Wiki 문서를 어디에 추가하고 어떤 검증을 해야 하는지 README에서 바로 알 수 있어야 한다.

## AI Used

- Codex

## Prompts Used

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 자세한 형식은 `knowledge/CONTENT_STRUCTURE.md`를 기준으로 둔다.
- README에는 자주 쓰는 콘텐츠 위치와 작성 후 검증 루틴만 짧게 둔다.
- 새 작업 단위는 가능하면 `content/logs/YYYY-MM-DD-topic.md`에 Build Log로 남긴다.
- 원본 자료는 `raw/`, 공개 콘텐츠는 `content/`로 구분한다.
- 콘텐츠 수정 후 검증은 `npm run verify`를 기준으로 한다.

## Documents Updated

- `README.md`
- `knowledge/DAILY_WORK_LOGGING_SYSTEM.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run verify
```

`npm run verify`는 성공했다.

- `npm run build` 성공
- 정적 페이지 83개 생성
- `npm run check:preview-env` 성공
- local mock mode 기준 preview readiness check 통과

## Next Step

- 새 콘텐츠 타입이 생기면 README의 Content Authoring 섹션과 `knowledge/CONTENT_STRUCTURE.md`를 함께 갱신한다.
