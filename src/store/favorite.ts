import { create } from "zustand"; // zustand 스토어 생성
import type { FavoriteStore } from "../types/movie";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFavoritesStore = create<FavoriteStore>()(
    persist(
        // 로컬스토리지 자동 저장
        (set, get) => ({
            favorites: [], // 즐겨찾기 목록
            addFavorite: (movie) =>
                set((state) => ({
                    favorites: [...state.favorites, movie],
                })), // 끝에 추가
            removeFavorite: (movieId) =>
                set((state) => ({
                    favorites: state.favorites.filter((m) => m.id !== movieId),
                })), // id로 삭제
            isFavorite: (movieId) => {
                const { favorites } = get();
                return favorites.some((m) => m.id === movieId);
            }, // 찜했는지 확인
            toggleFavorite: (movie) => {
                const { isFavorite, addFavorite, removeFavorite } = get();
                if (isFavorite(movie.id)) {
                    removeFavorite(movie.id);
                } else {
                    addFavorite(movie);
                }
            }, // 찜했는데 누르면 삭제, 아니면 추가
        }),
        {
            name: "favorites-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
