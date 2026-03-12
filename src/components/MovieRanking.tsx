import type { Movie } from "../types/movie";
import { useEffect, useState, useCallback, useEffectEvent } from "react";
import { Link } from "react-router-dom";
import { useRating } from "../utils/useRating";

interface MovieRankingProps {
    movies: Movie[];
}

export function MovieRanking({ movies }: MovieRankingProps) {
    const [prevDailyRank, setPrevDailyRank] = useState<Record<number, number>>(
        {},
    );
    const [index, setIndex] = useState(0);
    const moviePages = 5;
    const currentMovies = movies.slice(index, index + moviePages);
    const { convertFive } = useRating();
    // const navigate = useNavigate();

    // 초기 로드
    const loadRanks = useEffectEvent(() => {
        // setState 무한호출 방지
        try {
            const saved = localStorage.getItem("prevMovieRanks");
            if (saved) {
                setPrevDailyRank(JSON.parse(saved));
            }
        } catch {
            console.warn("랭킹 로드 실패");
        }
    });

    useEffect(() => {
        loadRanks();
    }, []);

    // 현재 데이터 저장
    useEffect(() => {
        const currentRanks: Record<number, number> = {};
        movies.forEach((m, i) => (currentRanks[m.id] = i + 1));
        localStorage.setItem("prevMovieRanks", JSON.stringify(currentRanks));
    }, [movies]);

    const handlePrev = useCallback(() => {
        setIndex(Math.max(0, index - moviePages));
    }, [index, moviePages]);

    const handleNext = useCallback(() => {
        setIndex(Math.min(movies.length - moviePages, index + moviePages));
    }, [index, movies.length, moviePages]);

    // 순위 등락 확인용 하드 코딩
    // const PREV_RANKINGS: Record<number, number> = {
    //     1290821: 5, // 1위 → 이전 5위 (↗)
    //     680493: 2, // 2위 → 이전 2위 (-)
    //     1159559: 1, // 3위 → 이전 1위 (↙)
    //     799882: 7, // 4위 → 이전 7위 (↗)
    //     1265609: 3, // 5위 → 이전 3위 (↙)
    // };

    // -----------------------------------------------
    return (
        <div className="max-w-6xl mx-auto p-8 mt-7">
            <h1 className="text-3xl font-bold mb-8">Mubee HOT 랭킹</h1>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {currentMovies.map((movie: Movie) => {
                    const overallRank =
                        movies.findIndex((m) => m.id === movie.id) + 1;
                    const prevRank = prevDailyRank[movie.id];
                    const rankChange = overallRank - prevRank;

                    return (
                        <Link
                            key={movie.id}
                            className="relative w-48"
                            to={`/movie/${movie.id}`}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                className="w-full h-80 object-cover rounded mb-2"
                            />
                            <div
                                className="absolute top-2 left-2 w-14 h-12 sm:w-14 sm:h-8 
    bg-black/70 rounded-xl shadow-2xl border-2 border-white/50
    flex items-center justify-center text-2xl sm:text-xl 
    font-bold text-amber-50 drop-shadow-xl z-10 gap-2"
                            >
                                {overallRank}
                                {rankChange === 0 && <span>-</span>}
                                {rankChange < 0 && <span>↗</span>}
                                {rankChange > 0 && <span>↙</span>}
                            </div>
                            {movie.title}
                            <br />⭐ {convertFive(movie.vote_average)}
                        </Link>
                    );
                })}
            </ul>

            <div className="flex items-center justify-center mt-7 gap-5">
                <button
                    onClick={handlePrev}
                    disabled={index === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    이전
                </button>
                <button
                    onClick={handleNext}
                    disabled={index + moviePages >= movies.length}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    다음
                </button>
            </div>
        </div>
    );
}
