import { useEffect, useState } from "react";
import { fetchPopularMovies } from "./api/tmdb";
import { MovieRanking } from "./components/MovieRanking";
import type { Movie } from "./types/movie";

function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPopularMovies()
            .then((data) => {
                console.log("영화 데이터:", data.results);
                setMovies(data.results);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    if (loading) return <div> 로딩중...</div>;

    return (
        <>
            <div>Mubee</div>
            <MovieRanking movies={movies} />
        </>
    );
}

export default App;
