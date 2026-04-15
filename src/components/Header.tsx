import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import type { Movie, Actor } from "../types/movie";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [searchResults, setSearchResults] = useState<(Movie | Actor)[]>([]);
    const [, setSearchQuery] = useState("");

    const handleSearch = useCallback(async (query: string) => {
        // 300ms 대기
        const timeoutId = setTimeout(async () => {
            if (query.length > 2) {
                const results = await searchMovies(query);
                console.log("🔍 검색결과:", results);
                console.log("첫 번째:", results[0]);
                setSearchResults(results.slice(0, 4));
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        // 왼쪽

        <div
            className={`flex items-center justify-between px-12 py-4 ${
                className || ""
            }`}
        >
            {/* 왼쪽 묶음 */}
            <div className="flex items-center gap-8">
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-widest hover:text-blue-400 transition"
                >
                    Mubee
                </Link>
                <Link to="/" className="text-sm hover:text-blue-400 transition">
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
            <div className="relative max-w-md w-full">
                <input
                    className="w-full bg-black-1600 text-white text-sm px-4 py-2 rounded-full outline-none border border-gray-600 focus:border-blue-400 transition placeholder-gray-400"
                    type="text"
                    placeholder="영화 검색"
                    onChange={(e) => {
                        const query = e.target.value;
                        setSearchQuery(query);
                        if (query.length > 2) {
                            handleSearch(query);
                        } else {
                            setSearchResults([]);
                        }
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
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${imagePath}`}
                                        className="w-10 h-14 object-cover rounded flex-shrink-0 bg-gray-200 "
                                        alt={title}
                                    />
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
    );
}
