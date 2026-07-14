import { useState, useCallback, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import type { Movie, Actor } from "../types/movie";
import { SearchResultList } from "./SearchResultList";
import { RecentDropDown } from "./RecentDropdown";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [searchResults, setSearchResults] = useState<(Movie | Actor)[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isFocused, setIsFocused] = useState(false);

    const saveSearch = (query: string) => {
        setRecentSearches((prev) => {
            const filtered = prev.filter((q) => q !== query);
            return [query, ...filtered].slice(0, 5);
        });
    };

    const handleNavigateSearch = (query: string) => {
        saveSearch(query);
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    useEffect(() => {
        setSearchResults([]);
        setSearchQuery("");
        setMobileSearchOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setSearchResults([]);
                setSearchQuery("");
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const abortRef = useRef<AbortController | null>(null);

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
            abortRef.current = new AbortController();
            try {
                const results = await searchMovies(query);
                setSearchResults(results.slice(0, 8));
            } catch (e) {
                if ((e as Error).name != "AbortError") {
                    console.error(e);
                }
            } finally {
                setIsLoading(false);
            }
        }, 200);
    }, []);

    const showRecentDropdown =
        searchQuery === "" &&
        isFocused &&
        recentSearches.length > 0 &&
        searchResults.length === 0;

    const handleRecentSelect = (q: string) => {
        setSearchQuery(q);
        handleSearch(q);
        handleNavigateSearch(q);
    };

    const handleRecentDelete = (q: string) => {
        setRecentSearches((prev) => prev.filter((item) => item !== q));
    };

    return (
        <>
            <div
                className={`hidden flex items-center justify-around gap-3 px-4 py-4 lg:px-12 lg:flex ${
                    className ?? ""
                }`}
            >
                {/* 왼쪽 묶음 */}
                <div className="flex items-center gap-4 md:gap-6 flex-wrap ">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-mubee-burgundy tracking-widest border-b-2 border-mubee-burgundy/40 pb-0.5"
                    >
                        Mubee
                    </Link>
                    <Link
                        to="/"
                        className="text-sm  hover:text-mubee-burgundy transition"
                    >
                        홈
                    </Link>
                    <Link
                        to="/genre"
                        className="text-sm  hover:text-mubee-burgundy transition"
                    >
                        카테고리
                    </Link>
                    <Link
                        to="/favorites"
                        className="text-sm  hover:text-mubee-burgundy transition whitespace-nowrap"
                    >
                        찜한 영화
                    </Link>
                </div>

                {/* 오른쪽: 검색창 */}
                <div ref={containerRef} className="relative w-full lg:max-w-md">
                    <input
                        className="w-full bg-black-1600 text-black text-sm px-4 py-2 rounded-full outline-none border border-gray-300 focus:border-mubee-burgundy transition placeholder-black-100"
                        type="text"
                        placeholder="영화 검색"
                        value={searchQuery}
                        onChange={(e) => {
                            const query = e.target.value;
                            setSearchQuery(query);
                            handleSearch(query);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && searchQuery.trim()) {
                                handleNavigateSearch(searchQuery.trim());
                                setMobileSearchOpen(false);
                            }
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() =>
                            setTimeout(() => setIsFocused(false), 150)
                        }
                    />
                    {isLoading && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm animate-spin">
                            ⏳
                        </span>
                    )}
                    {searchResults.length > 0 && (
                        <SearchResultList
                            results={searchResults}
                            position="top"
                        />
                    )}
                    {showRecentDropdown && (
                        <RecentDropDown
                            position="top"
                            recentSearches={recentSearches}
                            onSelect={handleRecentSelect}
                            onDelete={handleRecentDelete}
                            onClearAll={() => setRecentSearches([])}
                        />
                    )}
                </div>
            </div>
            {/* 모바일 bottom nav */}
            <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white lg:hidden">
                <div className="flex items-center">
                    <Link
                        to="/"
                        className="flex-1 text-center text-sm py-3 hover:text-mubee-burgundy transition text-gray-700"
                    >
                        홈
                    </Link>
                    <Link
                        to="/genre"
                        className="flex-1 text-center text-sm py-3 hover:text-mubee-burgundy transition text-gray-700"
                    >
                        카테고리
                    </Link>
                    <Link
                        to="/favorites"
                        className="flex-1 text-center text-sm py-3 hover:text-mubee-burgundy transition text-gray-700"
                    >
                        찜한 영화
                    </Link>
                    <button
                        className="flex-1 text-center text-sm py-3 text-gray-700"
                        onClick={() => setMobileSearchOpen((prev) => !prev)}
                    >
                        검색
                    </button>
                </div>

                {/* 검색창 */}
                {mobileSearchOpen && (
                    <div
                        ref={containerRef}
                        className="px-4 py-3 border-t border-gray-200 bg-white"
                    >
                        <input
                            autoFocus
                            className="w-full bg-gray-50 text-gray-900 text-sm px-4 py-2 rounded-full outline-none border border-gray-300 focus:border-mubee-burgundy transition placeholder-gray-400"
                            type="text"
                            placeholder="검색"
                            value={searchQuery}
                            onChange={(e) => {
                                const query = e.target.value;
                                setSearchQuery(query);
                                handleSearch(query);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && searchQuery.trim()) {
                                    handleNavigateSearch(searchQuery.trim());
                                    setMobileSearchOpen(false);
                                }
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() =>
                                setTimeout(() => setIsFocused(false), 150)
                            }
                        />
                        {searchResults.length > 0 && (
                            <SearchResultList
                                results={searchResults}
                                position="bottom"
                                onSelect={() => setMobileSearchOpen(false)}
                            />
                        )}
                        {showRecentDropdown && (
                            <RecentDropDown
                                position="bottom"
                                recentSearches={recentSearches}
                                onSelect={handleRecentSelect}
                                onDelete={handleRecentDelete}
                                onClearAll={() => setRecentSearches([])}
                            />
                        )}
                    </div>
                )}
            </nav>
        </>
    );
}
