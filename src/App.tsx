import { useEffect, useState } from "react";
import { fetchPopularMovies, fetchUpcomingMovies } from "./api/tmdb";
import type { Movie } from "./types/movie";
import { MovieRanking } from "./components/MovieRanking";
import { Header } from "./components/Header";
import { Upcoming } from "./components/Upcoming";

function App() {
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

    if (loading) return <div> 로딩중...</div>;

    return (
        <>
            <Header />
            <MovieRanking movies={popularMovies} />
            <Upcoming movies={upcomingMovies}/>
        </>
    );
}

export default App;
