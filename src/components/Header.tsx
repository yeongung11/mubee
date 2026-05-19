import { useState, useCallback, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import type { Movie, Actor } from "../types/movie";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [searchResults, setSearchResults] = useState<(Movie | Actor)[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const location = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSearchResults([]);
        setSearchQuery("");
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setSearchResults([]);
                setSearchQuery("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = useCallback((query: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (query.length <= 2) {
            setSearchResults([]);
            return;
        }

        timeoutRef.current = setTimeout(async () => {
            const results = await searchMovies(query);
            setSearchResults(results.slice(0, 4));
        }, 200);
    }, []);

    return (
        <>
            <div
                className={`hidden flex items-center justify-around gap-3 px-4 py-4 lg:px-12 lg:flex
    ${className || ""}`}
            >
                {/* 왼쪽 묶음 */}
                <div className="flex items-center gap-4 md:gap-6 flex-wrap ">
                    <Link
                        to="/"
                        className="text-2xl font-bold tracking-widest hover:text-blue-400 transition"
                    >
                        Mubee
                    </Link>
                    <Link
                        to="/"
                        className="text-sm hover:text-blue-400 transition"
                    >
                        홈
                    </Link>
                    <Link
                        to="/genre"
                        className="text-sm hover:text-blue-400 transition"
                    >
                        카테고리
                    </Link>
                    <Link
                        to="/favorites"
                        className="text-sm hover:text-blue-400 transition whitespace-nowrap"
                    >
                        찜한 영화
                    </Link>
                </div>

                {/* 오른쪽: 검색창 */}
                <div ref={containerRef} className="relative w-full lg:max-w-md">
                    <input
                        className="w-full bg-black-1600 text-white text-sm px-4 py-2 rounded-full outline-none border border-gray-600 focus:border-blue-400 transition placeholder-gray-100"
                        type="text"
                        placeholder="영화 검색"
                        value={searchQuery}
                        onChange={(e) => {
                            const query = e.target.value;
                            setSearchQuery(query);
                            handleSearch(query);
                        }}
                    />
                    {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl mt-1 max-h-64 overflow-auto z-50 border">
                            {searchResults.map((result) => {
                                const isMovie = "poster_path" in result;
                                const title = isMovie
                                    ? (result as Movie).title
                                    : (result as Actor).name;
                                const imagePath = isMovie
                                    ? (result as Movie).poster_path || ""
                                    : (result as Actor).profile_path || "";

                                return (
                                    <Link
                                        to={
                                            isMovie
                                                ? `/movie/${result.id}`
                                                : `/actor/${result.id}`
                                        }
                                        key={result.id}
                                        className="flex gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        {imagePath ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w92${imagePath}`}
                                                className="w-12 h-16 object-cover rounded shrink-0 bg-gray-200 "
                                                alt={title}
                                            />
                                        ) : (
                                            <div className="w-12 h-16 rounded shrink-0 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center text-center">
                                                <span className="text-gray-400 text-xs font-medium">
                                                    No Image
                                                </span>
                                            </div>
                                        )}

                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-sm truncate text-black">
                                                {title}
                                            </p>
                                            {isMovie && (
                                                <p className="text-xs text-gray-500">
                                                    {(result as Movie).release_date?.slice(
                                                        0,
                                                        4,
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            {/* 모바일 bottom nav */}
            <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-700 bg-black lg:hidden">
                <div className="flex items-center">
                    <Link
                        to="/"
                        className="flex-1 text-center text-sm py-3 hover:text-blue-400 transition text-amber-50"
                    >
                        홈
                    </Link>
                    <Link
                        to="/genre"
                        className="flex-1 text-center text-sm py-3 hover:text-blue-400 transition text-amber-50"
                    >
                        카테고리
                    </Link>
                    <Link
                        to="/favorites"
                        className="flex-1 text-center text-sm py-3 hover:text-blue-400 transition text-amber-50"
                    >
                        찜한 영화
                    </Link>
                </div>
            </nav>
        </>
    );
}
