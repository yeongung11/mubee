import { create } from "zustand"; // zustand 스토어 생성
import type { FavoriteStore } from "../types/movie";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFavoritesStore = create<FavoriteStore>()(
    persist(
        // 로컬스토리지 자동 저장
        (set, get) => ({
            favorites: [], 
            addFavorite: (movie) =>
                set((state) => ({
                    favorites: [...state.favorites, movie],
                })), 
            removeFavorite: (movieId) =>
                set((state) => ({
                    favorites: state.favorites.filter((m) => m.id !== movieId),
                })), 
            isFavorite: (movieId) => {
                const { favorites } = get();
                return favorites.some((m) => m.id === movieId);
            }, 
            toggleFavorite: (movie) => {
                const { isFavorite, addFavorite, removeFavorite } = get();
                if (isFavorite(movie.id)) {
                    removeFavorite(movie.id);
                } else {
                    addFavorite(movie);
                }
            }, 
        }),
        {
            name: "favorites-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
