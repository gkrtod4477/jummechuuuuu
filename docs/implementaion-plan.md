# Implementation Plan: Lunch Menu Recommendation Web App

## Overview

이 문서는 [tech-spec.md](/Users/admin/Desktop/study/tue-class/jummechuuuuu/docs/tech-spec.md)를 바탕으로 점심 메뉴 추천 React 웹앱을 구현하기 위한 작업 순서를 정의한다. 목표는 서버 없이 정적 JSON 데이터와 S3 이미지 URL을 사용해 동작하는 단일 페이지 앱을 만들고, GitHub Actions를 통해 AWS S3에 배포 가능한 상태까지 만드는 것이다.

## Architecture Decisions

- React 단일 페이지 애플리케이션으로 구현한다.
  - 과제 최소 요건 충족에 충분하고, 정적 호스팅과 잘 맞는다.
- 메뉴 데이터는 `src/data/menus.json`에 저장한다.
  - 서버나 DB 없이도 구현 가능하며 데이터 수정이 단순하다.
- 메뉴 이미지는 AWS S3에 사전 업로드하고 JSON에는 `imageUrl`만 저장한다.
  - 빌드 산출물 크기를 줄이고 이미지 자산 관리 경계를 분리할 수 있다.
- 최소 버전 범위로 구현하며, 추천 기능은 랜덤 추천 중심으로 마감한다.
  - 과제 최소 요건 충족을 우선하고 불필요한 기능 확장을 막는다.
- 이미지 로드 실패 시 사용할 기본 플레이스홀더는 로컬 자산으로 관리한다.
  - 외부 이미지 의존성을 줄이고 실패 상황을 일관되게 제어할 수 있다.
- S3 사이트와 이미지 자산은 하나의 버킷에서 관리하고, 내부 폴더 경로로 분리한다.
  - 버킷 수를 줄이면서도 배포 산출물과 이미지 자산의 경계를 유지할 수 있다.
- Create React App 스타일 구조를 따른다.
  - 과제 참고 자료와 일치하고 로컬 실행 및 GitHub Actions 빌드 구성이 단순하다.
- 배포 대상은 AWS S3 정적 웹사이트 호스팅이며, CI/CD는 GitHub Actions로 구성한다.
  - 과제 요구사항과 운영 방식이 명확하다.

## Task List

### Phase 1: Foundation

- [ ] Task 1: React 프로젝트 기본 구조 생성
- [ ] Task 2: 패키지 설정 및 로컬 실행 환경 구성
- [ ] Task 3: 정적 메뉴 데이터 스키마와 샘플 데이터 작성

### Checkpoint: Foundation

- [ ] `npm install`이 정상 완료된다.
- [ ] `npm start`로 기본 앱이 실행된다.
- [ ] 메뉴 JSON 파일 구조가 tech spec과 일치한다.

### Phase 2: Core Features

- [x] Task 4: 메인 화면 레이아웃 및 기본 스타일 구현
- [x] Task 5: 메뉴 추천 로직 및 상태 관리 구현
- [x] Task 6: 추천 결과 카드와 이미지 표시 구현
- [x] Task 7: 빈 결과/오류 상태 및 플레이스홀더 처리 구현

### Checkpoint: Core Features

- [x] 사용자가 추천 버튼으로 메뉴를 추천받을 수 있다.
- [x] 추천 결과에 메뉴명, 카테고리, 설명, 이미지가 표시된다.
- [x] 데이터 없음, 데이터 오류, 이미지 로드 실패 상태를 확인할 수 있다.

### Phase 3: Deployment and Documentation

- [x] Task 8: S3 배포 전제에 맞는 빌드 설정 정리
- [x] Task 9: GitHub Actions 배포 워크플로우 작성
- [x] Task 10: README 및 제출용 운영 정보 정리

### Checkpoint: Complete

- [x] `npm run build`가 성공한다.
- [x] `.github/workflows/deploy.yml`이 정의되어 있다.
- [x] S3 정적 호스팅 전제와 GitHub Secrets 요구사항이 문서에 반영되어 있다.

## Detailed Tasks

## Task 1: React 프로젝트 기본 구조 생성

**Description:** React 앱 실행에 필요한 기본 디렉터리와 엔트리 파일을 만든다. `public/index.html`, `src/index.js`, `src/App.js`, `src/App.css`를 포함한 최소 구조를 먼저 고정한다.

**Acceptance criteria:**
- [ ] `public/`, `src/`, `.github/workflows/` 디렉터리 구조가 생성된다.
- [ ] `public/index.html`에 `div#root`가 존재한다.
- [ ] `src/index.js`가 React 앱을 `root`에 마운트한다.

**Verification:**
- [ ] 수동 확인: 폴더 구조가 [tech-spec.md](/Users/admin/Desktop/study/tue-class/jummechuuuuu/docs/tech-spec.md)의 파일 구조와 일치한다.
- [ ] 수동 확인: 엔트리 파일 간 import 경로가 올바르다.

**Dependencies:** None

**Files likely touched:**
- `public/index.html`
- `src/index.js`
- `src/App.js`
- `src/App.css`

**Estimated scope:** Medium

## Task 2: 패키지 설정 및 로컬 실행 환경 구성

**Description:** `package.json`과 `.gitignore`를 작성하고 React 실행과 빌드에 필요한 스크립트를 구성한다. `homepage` 설정도 S3 배포 기준으로 맞춘다.

**Acceptance criteria:**
- [ ] `package.json`에 `start`, `build`, `test` 스크립트가 정의된다.
- [ ] `homepage`가 `.` 또는 미지정 상태로 설정된다.
- [ ] `.gitignore`에 `node_modules`, `build`, `.env` 등이 포함된다.

**Verification:**
- [ ] 실행 확인: `npm install`
- [ ] 실행 확인: `npm start`

**Dependencies:** Task 1

**Files likely touched:**
- `package.json`
- `.gitignore`

**Estimated scope:** Small

## Task 3: 정적 메뉴 데이터 스키마와 샘플 데이터 작성

**Description:** `src/data/menus.json`에 메뉴 데이터 샘플을 정의한다. 각 항목은 `id`, `name`, `category`, `description`, `imageUrl` 필드를 포함해야 하며 필요 시 태그 필드를 추가한다.

**Acceptance criteria:**
- [ ] `menus.json` 파일이 생성된다.
- [ ] 모든 샘플 메뉴가 필수 필드를 가진다.
- [ ] `imageUrl`은 S3 형식의 URL 문자열을 사용한다.

**Verification:**
- [ ] 수동 확인: JSON 문법 오류가 없다.
- [ ] 수동 확인: 스키마가 [tech-spec.md](/Users/admin/Desktop/study/tue-class/jummechuuuuu/docs/tech-spec.md)의 `Menu Type`과 일치한다.

**Dependencies:** Task 1

**Files likely touched:**
- `src/data/menus.json`

**Estimated scope:** Small

## Task 4: 메인 화면 레이아웃 및 기본 스타일 구현

**Description:** 앱 첫 화면에서 서비스 제목, 설명, 추천 버튼, 결과 영역이 보이도록 레이아웃을 구현한다. 과제 시연에 적합한 단순한 반응형 스타일을 적용한다.

**Acceptance criteria:**
- [ ] 첫 화면에서 앱 제목과 추천 실행 영역이 보인다.
- [ ] 모바일과 데스크톱에서 주요 요소가 깨지지 않는다.
- [ ] 결과 표시 영역의 기본 상태가 정의된다.

**Verification:**
- [ ] 실행 확인: `npm start`
- [ ] 수동 확인: 브라우저에서 첫 화면이 정상 렌더링된다.

**Dependencies:** Task 1, Task 2

**Files likely touched:**
- `src/App.js`
- `src/App.css`

**Estimated scope:** Small

## Task 5: 메뉴 추천 로직 및 상태 관리 구현

**Description:** JSON 데이터를 읽어 메뉴 목록을 상태로 보관하고, 추천 버튼 클릭 시 후보 목록 중 하나를 무작위로 선택하는 로직을 구현한다. 로딩, 오류, 추천 결과 상태를 함께 관리한다.

**Acceptance criteria:**
- [ ] 앱이 정적 메뉴 데이터를 읽어 상태에 저장한다.
- [ ] 추천 버튼 클릭 시 무작위 메뉴 1개가 선택된다.
- [ ] 데이터가 비어 있거나 잘못된 경우 오류 상태로 전환된다.

**Verification:**
- [ ] 실행 확인: `npm start`
- [ ] 수동 확인: 버튼 클릭 시 추천 결과가 갱신된다.

**Dependencies:** Task 3, Task 4

**Files likely touched:**
- `src/App.js`
- `src/data/menus.json`

**Estimated scope:** Small

## Task 6: 추천 결과 카드와 이미지 표시 구현

**Description:** 추천 결과를 카드 형태로 렌더링하고 메뉴 이미지, 이름, 카테고리, 설명을 보여준다. 이미지 로드 실패 시 대체 표시도 이 작업에 포함한다.

**Acceptance criteria:**
- [ ] 추천 결과 카드가 표시된다.
- [ ] 카드에 메뉴 이미지와 텍스트 정보가 함께 보인다.
- [ ] 이미지 로드 실패 시 대체 UI가 표시된다.

**Verification:**
- [ ] 실행 확인: `npm start`
- [ ] 수동 확인: 정상 이미지와 실패 이미지를 각각 확인한다.

**Dependencies:** Task 5

**Files likely touched:**
- `src/components/RecommendationCard.js`
- `src/App.js`
- `src/App.css`

**Estimated scope:** Medium

## Task 7: 빈 결과/오류 상태 및 플레이스홀더 처리 구현

**Description:** 최소 버전 범위에 맞춰 필터 UI는 구현하지 않고, 단일 추천 버튼 중심 흐름을 유지한다. 데이터 로딩 오류, 메뉴 없음 상태, 이미지 로드 실패 시 로컬 플레이스홀더를 포함한 대체 UI를 구현한다.

**Acceptance criteria:**
- [ ] 필터 UI가 구현 범위에서 제외되었음이 코드와 문서에서 명확하다.
- [ ] 메뉴 데이터 없음 메시지가 표시된다.
- [ ] 데이터 오류와 빈 데이터 상태 메시지가 표시된다.
- [ ] 이미지 로드 실패 시 로컬 플레이스홀더가 표시된다.

**Verification:**
- [ ] 실행 확인: `npm start`
- [ ] 수동 확인: 빈 데이터, 오류 상태, 이미지 실패 상태를 재현할 수 있다.

**Dependencies:** Task 5

**Files likely touched:**
- `src/App.js`
- `src/App.css`
- `src/assets/`

**Estimated scope:** Small

## Task 8: S3 배포 전제에 맞는 빌드 설정 정리

**Description:** 정적 빌드 결과가 S3 루트 경로에서 정상 동작하도록 설정을 점검한다. `homepage`, 자산 경로, SPA 에러 문서 전제 등을 기준으로 구성한다.

**Acceptance criteria:**
- [ ] `package.json`의 `homepage` 설정이 S3 배포 기준에 맞다.
- [ ] 빌드 산출물이 `build/`에 생성된다.
- [ ] 문서상 S3 정적 웹사이트 설정값이 구현 전제와 일치한다.

**Verification:**
- [ ] 실행 확인: `npm run build`
- [ ] 수동 확인: 빌드 결과 디렉터리가 생성된다.

**Dependencies:** Task 2, Task 4, Task 5

**Files likely touched:**
- `package.json`
- `docs/tech-spec.md`

**Estimated scope:** Small

## Task 9: GitHub Actions 배포 워크플로우 작성

**Description:** `main` 브랜치 push 시 React 앱을 빌드하고 S3로 동기화하는 GitHub Actions 워크플로우를 작성한다. AWS Academy용 세션 토큰을 포함한 시크릿 구조를 전제로 한다.

**Acceptance criteria:**
- [ ] `.github/workflows/deploy.yml` 파일이 생성된다.
- [ ] 워크플로우에 checkout, node setup, install, build, AWS credentials, S3 sync 단계가 포함된다.
- [ ] 버킷명 치환이 필요한 위치가 명확히 표시된다.

**Verification:**
- [ ] 수동 확인: YAML 문법이 올바르다.
- [ ] 수동 확인: 시크릿 이름이 tech spec과 일치한다.

**Dependencies:** Task 2, Task 8

**Files likely touched:**
- `.github/workflows/deploy.yml`

**Estimated scope:** Small

## Task 10: README 및 제출용 운영 정보 정리

**Description:** 과제 제출에 필요한 시스템 소개, 실행 방법, 배포 URL 기입 위치, GitHub Actions 및 S3 사용 방법을 README에 정리한다. 시연을 위한 최소 운영 안내를 포함한다.

**Acceptance criteria:**
- [ ] README에 프로젝트 소개와 기능 설명이 포함된다.
- [ ] 로컬 실행 방법과 배포 구조가 설명된다.
- [ ] GitHub Secrets, S3 호스팅, 배포 확인 방법이 정리된다.

**Verification:**
- [ ] 수동 확인: README만 읽어도 실행 및 배포 절차를 이해할 수 있다.

**Dependencies:** Task 8, Task 9

**Files likely touched:**
- `README.md`

**Estimated scope:** Small

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| S3 이미지 URL이 잘못되었거나 비공개 상태임 | High | 샘플 데이터 작성 시 공개 URL을 검증하고 로컬 플레이스홀더 UI를 구현한다. |
| `homepage` 설정 오류로 정적 자산 경로가 깨짐 | High | `package.json` 설정을 초기에 고정하고 빌드 결과를 확인한다. |
| GitHub Actions에서 AWS Academy 세션 토큰이 만료됨 | High | `AWS_SESSION_TOKEN` 재발급 절차를 README에 명시한다. |
| SPA 새로고침 시 404 발생 | Medium | S3 정적 웹사이트 호스팅의 error document를 `index.html`로 설정한다. |
| 필터 기능이 범위를 불필요하게 키움 | Low | 최소 버전 방침에 따라 필터 UI를 구현 범위에서 제외한다. |

## Resolved Decisions

1. 최소 버전으로 마감하며, 필터 UI는 구현 범위에서 제외한다.
2. 이미지 실패 시 사용할 기본 플레이스홀더는 로컬 자산으로 관리한다.
3. S3 사이트와 이미지 자산은 하나의 버킷에서 관리하고, 내부 폴더로 분리한다.
