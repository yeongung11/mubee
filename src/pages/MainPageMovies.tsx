import { useEffect, useState } from "react";
import type { Movie } from "@/types/movie";
import { fetchMainPageMovies } from "@/api/tmdb";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MovieGrid } from "@/components/MovieGrid";

export function MainPageMovies() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [movies, setMovies] = useState<Movie[]>([]);
    const category = searchParams.get("category") || "popular";

    const categoryMap = {
        popular: "인기 영화",
        now_playing: "현재 상영중",
        top_rated: "평점 높은 영화",
        upcoming: "공개 예정 영화",
    };

    useEffect(() => {
        fetchMainPageMovies(category).then((data) => {
            setMovies(data.results);
        });
    }, [category]);

    // const handleTabChange = (newCategory: string) => {
    //     navigate(`/movies/category=${newCategory}`);
    // };

    // const renderSection = () => {
    //     switch (category) {
    //         case "now_playing":
    //             return <NowPlaying movies={movies} />;
    //         case "topRate":
    //             return <TopRate movies={movies} />;
    //         case "upcoming":
    //             return <Upcoming movies={movies} />;
    //         default:
    //             return <MovieRanking movies={movies} />;
    //     }
    // };

    return (
        <div className="max-w-6xl mx-auto p-8 mt-12">
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                {Object.entries(categoryMap).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => navigate(`/movies?category=${key}`)}
                        className={`px-6 py-2 rounded-full font-bold transition-all
                            ${
                                category === key
                                    ? "bg-blue-500 text-white shadow-lg"
                                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <MovieGrid movies={movies} />
        </div>
    );
}
