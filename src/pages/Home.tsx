import { useEffect, useState } from "react";
import { fetchPopularMovies, fetchUpcomingMovies } from "../api/tmdb";
import type { Movie } from "../types/movie";
import { MovieRanking } from "../components/MovieRanking";
import { Upcoming } from "../components/Upcoming";

export function Home() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            try {
                const [popularRes, upcomingRes] = await Promise.all([
                    fetchPopularMovies(),
                    fetchUpcomingMovies(),
                ]);
                setPopularMovies(popularRes.results);
                setUpcomingMovies(upcomingRes.results);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadAllData();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                {" "}
                로딩중...
            </div>
        );

    return (
        <>
            <MovieRanking movies={popularMovies} />
            <Upcoming movies={upcomingMovies} />
        </>
    );
}
