# mubee

영화 검색 및 목록 관리 앱입니다.

## 기술스택

-   React
-   TypeScript
-   Tailwind CSS
-   Vite
-   React Router
-   Zustand(예정)
-   TMDB API
-   KOBIS API

## 기능

-   영화 검색 및 조회 [ ]
-   영화 상세 페이지 [ ]
-   플레이리스트 생성 [ ]
-   플레이리스트 페이지 [ ]

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
