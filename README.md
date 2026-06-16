# mubee

TMDB 기반의 영화 검색 및 목록 관리 앱입니다.

## 배포링크

-   [mubee](https://mubee-clwolc2ph-yeongung11s-projects.vercel.app)

## 스크린샷

-   ![홈 화면](https://github.com/user-attachments/assets/bcf8ab1d-d564-4671-9476-fa7130698b22)

-   ![상세 페이지](https://github.com/user-attachments/assets/5ccc3fc7-94eb-4de5-9b05-f08e916db887)

## 기술스택

-   React
-   TypeScript
-   Tailwind CSS
-   Vite
-   React Router
-   Zustand
-   TMDB API

## 기능

-   영화 제목, 배우 검색
-   영화 상세 페이지(줄거리, 평점, 출연진, 리뷰)
-   배우 상세 페이지(배우 대표작, 배우 정보)
-   카테고리별 영화
-   찜한 영화 추가/삭제
-   최근에 본 영화 목록

## 환경변수

프로젝트 루트에 `.env` 파일을 생성하고 입력

```env
- VITE_TMDB_TOKEN=tmdb_api_key
```

## 시작하기

```bash
git clone https://github.com/yeongung11/mubee.git
cd mubee
npm install
npm run dev
```

## 트러블 슈팅

### 1. 클로저 문제

에러

-   무한 스크롤시 첫번째 페이지 데이터만 반복 출력

원인

-   `useCallback` 의존성 배열이 비어있어 함수가 처음 생성될 때 page 값을 클로저로 캡처해서 page가 바뀌어도 첫 page의 값을 그대로 참조

해결

-   `useState`의 page 대신 `useRef`로 교체
-   `useRef`는 클로저에 캡처되지 않고 항상 최신값을 참조하기 때문에 의존성 배열 변경 없이 페이지 호출
-   클로저 문제가 해결되면서 Vercel 빌드 에러도 동시에 해결
-   배포 전 로컬 빌드 검증 습관화

### 2. 검색 요청 경쟁(Race Condition)

에러

-   검색할 때 빠르게 입력 시 이전 요청이 늦게 도착해 마지막 결과를 덮어쓰는 문제

원인

-   비동기 API 요청의 발송 순서와 도착 순서가 다르기 때문에 발생

해결

-   `AbortController`로 query가 바뀔 때마다 이전 요청 취소
-   `useEffect` cleanup 함수에서 controller.abort()를 호출해 항상 마지막 요청의 결과만 반영하게 처리
