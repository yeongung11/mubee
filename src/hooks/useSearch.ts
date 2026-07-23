import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import type { Movie, Actor } from "../types/movie";

export function useSearch() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<(Movie | Actor)[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>(() =>
        JSON.parse(localStorage.getItem("recentSearches") ?? "[]"),
    );
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const abortRef = useRef<AbortController | null>(null);

    const saveSearch = (query: string) => {
        setRecentSearches((prev) => {
            const next = [query, ...prev.filter((q) => q !== query)].slice(
                0,
                5,
            );
            localStorage.setItem("recentSearches", JSON.stringify(next));
            return next;
        });
    };

    const handleSearch = useCallback((query: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (abortRef.current) abortRef.current.abort();

        if (query.length <= 2) {
            setSearchResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        timeoutRef.current = setTimeout(async () => {
            const controller = new AbortController();
            abortRef.current = controller;
            try {
                const results = await searchMovies(query, controller.signal);
                if (!controller.signal.aborted) {
                    setSearchResults(results.slice(0, 8));
                }
            } catch (e) {
                if ((e as Error).name !== "AbortError") console.error(e);
            } finally {
                if (abortRef.current === controller) {
                    setIsLoading(false);
                }
            }
        }, 200);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            abortRef.current?.abort();
        };
    }, []);

    const handleNavigateSearch = (query: string) => {
        saveSearch(query);
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    const handleRecentSelect = (q: string) => {
        setSearchQuery(q);
        handleSearch(q);
        handleNavigateSearch(q);
    };

    const handleRecentDelete = (q: string) => {
        setRecentSearches((prev) => {
            const next = prev.filter((item) => item !== q);
            localStorage.setItem("recentSearches", JSON.stringify(next));
            return next;
        });
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };

    const showRecentDropdown =
        searchQuery === "" &&
        isFocused &&
        recentSearches.length > 0 &&
        searchResults.length === 0;

    return {
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        isLoading,
        isFocused,
        setIsFocused,
        recentSearches,
        handleSearch,
        handleNavigateSearch,
        handleRecentSelect,
        handleRecentDelete,
        clearRecentSearches,
        showRecentDropdown,
    };
}
