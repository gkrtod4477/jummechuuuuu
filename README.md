# Lunch Menu Recommendation

정적 JSON 데이터와 S3 이미지 URL을 사용해 오늘의 점심 메뉴를 추천하는 React 단일 페이지 앱입니다. 서버 없이 동작하며 GitHub Actions로 빌드한 뒤 AWS S3 정적 웹사이트 호스팅에 배포하는 것을 전제로 합니다.

## Features

- 메뉴 목록에서 무작위로 점심 메뉴 1개 추천
- 메뉴명, 카테고리, 설명, 이미지 표시
- 빈 데이터, 데이터 형식 오류, 이미지 로드 실패 대응
- S3 정적 호스팅과 GitHub Actions 자동 배포 지원

## Local Development

```bash
npm install
npm start
```

- 개발 서버 기본 주소: `http://localhost:3000`
- 배포용 빌드 생성:

```bash
npm run build
```

- 빌드 결과물은 `build/` 디렉터리에 생성됩니다.

## Project Structure

- `src/data/menus.json`: 정적 메뉴 데이터
- `src/components/RecommendationCard.js`: 추천 결과 카드 UI
- `src/assets/menu-placeholder.svg`: 이미지 실패 시 대체 자산
- `.github/workflows/deploy.yml`: GitHub Actions 배포 워크플로우

## S3 Deployment

정적 웹사이트 호스팅을 사용하는 S3 버킷 1개를 준비하고, 사이트 파일과 메뉴 이미지를 서로 다른 경로로 관리합니다.

- 사이트 파일: `s3://mybucket-20263576/`
- 메뉴 이미지: `s3://mybucket-20263576/images/menus/`

S3 정적 웹사이트 호스팅 설정은 다음과 같아야 합니다.

- Index document: `index.html`
- Error document: `index.html`

`package.json`의 `homepage`는 `"."`로 설정되어 있어 S3 루트 기준 정적 자산 경로가 깨지지 않도록 구성되어 있습니다.

## GitHub Actions Setup

`.github/workflows/deploy.yml`은 `main` 브랜치에 push 되면 앱을 빌드하고 S3로 동기화합니다. 워크플로우를 사용하기 전에 아래 값을 준비해야 합니다.

1. 워크플로우의 `S3_BUCKET`은 `mybucket-20263576`로 설정되어 있습니다.
2. GitHub 저장소 `Settings > Secrets and variables > Actions`에 다음 시크릿을 등록합니다.

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`

기본 리전은 `us-east-1`로 설정되어 있습니다. 다른 리전을 사용하면 워크플로우의 `AWS_REGION`도 함께 수정해야 합니다.

## Deployment Check

- GitHub Actions 실행에서 `Install dependencies`, `Build`, `Deploy to S3` 단계가 모두 성공해야 합니다.
- 배포 후 S3 정적 웹사이트 엔드포인트에 접속해 앱이 렌더링되는지 확인합니다.
- 새로고침 시 404가 발생하면 S3의 `Error document` 설정이 `index.html`인지 먼저 확인합니다.

## Submission Notes

- 현재 버전은 과제 최소 범위에 맞춰 필터 UI 없이 랜덤 추천만 제공합니다.
- 메뉴 이미지는 공개 접근 가능한 S3 URL이어야 하며, URL이 잘못되면 플레이스홀더가 표시됩니다.
- 과제 1 시연 영상: https://youtu.be/e_4dUd8pdS0
- 과제 2 시연 영상: https://youtu.be/bb9sf63vvWk
