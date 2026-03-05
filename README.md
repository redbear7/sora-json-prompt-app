# sora-json-prompt-app

Sora JSON v1.3 기반 스토리보드 생성 웹앱(정적 파일).

## 실행
- 터미널에서:
  - `cd /Users/bangju/Documents/PROGRAM/sora-json-prompt-app`
  - `python3 server.py --port 5500`
  - `http://localhost:5500` 접속

## Render 배포(가장 간단)
- 이 폴더를 GitHub 저장소로 푸시
- Render 대시보드에서 `New + Blueprint` 선택
- 해당 GitHub 저장소 연결 후 배포
- `render.yaml`이 자동으로 읽혀서 바로 서비스 생성됨

수동 생성 시:
- Environment: `Python`
- Build Command: 비워둠
- Start Command: `python server.py --port $PORT`

참고:
- `style_assets`는 서버 디스크에 저장됩니다.
- Render 무료 플랜 특성상 인스턴스 재시작/재배포 시 파일이 유지되지 않을 수 있습니다.

## 핵심 규칙
- Script 모드
  - 런타임 자동 15s 고정
  - KF 수 = `ACTOR`로 시작하는 대사/지문 라인 수
  - 원문 대사는 그대로 유지되어 KF 카드/JSON에 반영
- Reference 모드
  - KF 12개 고정

## 포함 기능
- 진행 상태 시뮬레이션 + progress bar
- Director's Analysis / Live Script Editor
- KF 카드 자동 생성
- Visual/Music Prompt 생성
- Contact Sheet 생성(옵션)
- JSON 출력 + Smart Copy(COPY -> COPIED!)
- 프로젝트 히스토리(localStorage)
- Gemini API Key 브라우저 저장(localStorage)
