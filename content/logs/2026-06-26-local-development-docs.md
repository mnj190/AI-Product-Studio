# 2026-06-26 - Local Development Docs

## What I Did

README에 로컬 웹 실행, 재기동, 상태 확인 방법을 추가했다.

실제로 작업 중 “웹을 재기동하려면 어떻게 해야 하는지”가 필요했고, 이 지식은 다음 작업에서도 반복해서 쓰일 가능성이 높다. 그래서 터미널 명령을 README에 고정해 두었다.

## AI Used

- Codex

## Prompts Used

관련 요청:

> 지금 웹 재기동 할려면 어떻게 해야해? 그거 잘 되는지만 좀 보고 싶어.

현재 목표:

> 이제 앞으로의 작업 계획을 세우고 하나씩 진행해줘.

## Decisions

- 기본 실행은 `npm run dev`와 `http://localhost:3000`으로 안내한다.
- 포트 충돌을 피하는 확인용 실행은 `127.0.0.1:3001` 기준으로 안내한다.
- 재기동은 `Ctrl + C` 후 같은 명령을 다시 실행하는 방식으로 설명한다.
- 상태 확인은 `curl -I http://127.0.0.1:3001`와 `200 OK` 기준으로 설명한다.

## Documents Updated

- `README.md`
- `content/wiki/log.md`

## Verification

다음 명령으로 확인했다.

```bash
npm run build
```

`npm run build`는 성공했고, 정적 페이지 78개가 생성되었다.

## Next Step

- 후속 작업에서 `npm run dev:local` script를 추가해 `127.0.0.1:3001` 실행 명령을 짧게 만들었다.
- 로컬 개발 명령이 더 늘어나면 README의 Local Development 섹션에 함께 정리한다.
