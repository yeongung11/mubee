import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Movie } from "../types/movie";

interface RecentStore {
    recentView: Movie[];
    addRecentView: (movie: Movie) => void;
    clearRecentView: () => void;
}

export const useRecentViewStore = create<RecentStore>()(
    persist(
        (set) => ({
            recentView: [],
            addRecentView: (movie) =>
                set((state) => {
                    const filtered = state.recentView.filter(
                        (m) => m.id !== movie.id,
                    );
                    return {
                        recentView: [movie, ...filtered].slice(0, 20),
                    };
                }),
            clearRecentView: () => set({ recentView: [] }),
        }),
        {
            name: "recent-view-storage",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
