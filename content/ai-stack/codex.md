# Codex

## When I Use It

구현할 방향이 정해진 뒤 실제 코드베이스를 수정하고 검증할 때 사용한다.

이 프로젝트에서는 Codex를 개발자, 리팩토링 파트너, 검증 담당자처럼 사용한다.

## Strengths

- 현재 레포 상태를 확인하면서 작업할 수 있다.
- 파일을 직접 생성하고 수정할 수 있다.
- 빌드와 테스트를 실행해 결과를 검증할 수 있다.
- 변경사항을 커밋하고 푸시하는 흐름까지 이어갈 수 있다.
- 문서와 구현을 함께 업데이트하기 좋다.

## Weaknesses

- 구현 방향이 흐릿하면 잘못된 구조를 빠르게 만들 수도 있다.
- 패키지 설치나 외부 네트워크 작업은 권한과 인증이 필요할 수 있다.
- 사용자가 원하는 제품 감각은 문서와 대화로 충분히 전달해야 한다.

## Best Use Cases

- Next.js 앱 생성
- 페이지/컴포넌트 구현
- Markdown 콘텐츠 렌더링 구조 작성
- 빌드 오류 수정
- 작업 로그 작성
- Git 커밋 및 푸시

## Example Prompts

```text
현재 레포 상태를 확인하고, Roadmap에 따라 다음 작업을 하나 진행해줘.
작업 후 빌드 검증하고 Build Log도 남겨줘.
```

```text
Prompt Library 페이지를 추가하고, content/prompts의 Markdown 문서를 목록/상세로 보여줘.
```

## Related Projects

- AI Product Studio
- Static Portfolio MVP
- Ask About Me Chatbot

