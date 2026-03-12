import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/tmdb";
import { debounce } from "lodash";
import type { Movie } from "../types/movie";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [, setSearchQuery] = useState("");

    const handleSearch = useCallback(async (query: string) => {
        // 300ms 대기
        const timeoutId = setTimeout(async () => {
            if (query.length > 2) {
                const results = await searchMovies(query);
                setSearchResults(results.slice(0, 4));
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, []);

    // 검색 이미지 확인용
    // const handleSearch = useCallback(async (query: string) => {
    //     console.log("🔍 검색:", query); // 👈 추가

    //     const timeoutId = setTimeout(async () => {
    //         console.log("📡 API 호출!"); // 👈 추가
    //         try {
    //             const results = await searchMovies(query);
    //             console.log("✅ 결과:", results.length, "개"); // 👈 추가
    //             setSearchResults(results.slice(0, 4));
    //         } catch (error) {
    //             console.error("❌ 오류:", error); // 👈 추가
    //         }
    //     }, 300);
    // }, []);

    return (
        <div className={`flex justify-between mt-5 ${className || ""}`}>
            <h1 className="ml-3">Mubee</h1>
            <div className="relative flex-1 max-w-md">
                <input
                    className="border-amber-700 backdrop-blur bg-black/30 text-center text-xl"
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
                {/* <p className="mr-3">프로필</p> */}

                {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl mt-1 max-h-64 overflow-auto z-50 border">
                        {searchResults.map((movie) => (
                            <Link
                                to={`/movie/${movie.id}`}
                                key={movie.id}
                                className="flex gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSearchResults([]);
                                }}
                            >
                                <img
                                    src={
                                        movie.poster_path &&
                                        movie.poster_path.startsWith("/")
                                            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                                            : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA0MCA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjU2IiByeD0iMyIgZmlsbD0iIzNDNDE1MSIvPgo8dGV4dCB4PSI4IiB5PSIzMSIgZmlsbD0iI0ZGRiIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9IjUwMCI+No90ZXh0Pgo8L3N2Zz4K"
                                    }
                                    className="w-10 h-14 object-cover rounded flex-shrink-0 bg-gray-200"
                                    alt={movie.title}
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="font-medium text-sm truncate">
                                        {movie.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {movie.release_date?.slice(0, 4)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
