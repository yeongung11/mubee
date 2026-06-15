# mubee

TMDB 기반의 영화 검색 및 목록 관리 앱입니다.

## 배포링크

-   mubee-clwolc2ph-yeongung11s-projects.vercel.app

## 기술스택

-   React
-   TypeScript
-   Tailwind CSS
-   Vite
-   React Router
-   Zustand
-   TMDB API
-   KOBIS API

## 기능

-   영화 제목, 배우 검색
-   영화 상세 페이지(줄거리, 평점, 출연진, 리뷰)
-   배우 상세 페이지(배우 대표작, 배우 정보)
-   카테고리별 영화
-   찜한 영화 추가/삭제

## 시작하기

```bash
git clone https://github.com/yeongung11/mubee.git
cd mubee
npm install
npm run dev
```

트러블 슈팅

### 1

에러

-   `calling setstate synchronously within an effect can trigger cascading renders`

원인

-   `useEffect` 안에서 `setState`를 호출해서 리렌더링을 발생시키게 되기 때문에 무한루프 발생

해결

-   `useEffectEvent`를 사용해 무한호출을 차단
