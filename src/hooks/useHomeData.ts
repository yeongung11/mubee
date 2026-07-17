import { useEffect, useState } from "react";
import {
    fetchNowPlaying,
    fetchPopularMovies,
    fetchTopRate,
    fetchUpcomingMovies,
    fetchPopularPersons,
} from "../api/tmdb";
import type { Movie, Actor } from "../types/movie";

export function useHomeData() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [topRateMovies, setTopRateMovies] = useState<Movie[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
    const [popularPersons, setPopularPersons] = useState<Actor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            try {
                const [
                    popularRes,
                    upcomingRes,
                    topRateRes,
                    nowPlayingRes,
                    personsRes,
                ] = await Promise.all([
                    fetchPopularMovies(),
                    fetchUpcomingMovies(),
                    fetchTopRate(),
                    fetchNowPlaying(),
                    fetchPopularPersons(),
                ]);
                setPopularMovies(popularRes.results);
                setUpcomingMovies(upcomingRes.results);
                setTopRateMovies(topRateRes.results);
                setNowPlayingMovies(nowPlayingRes.results);
                setPopularPersons(personsRes.results);
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        loadAllData();
    }, []);

    return {
        popularMovies,
        upcomingMovies,
        topRateMovies,
        nowPlayingMovies,
        popularPersons,
        loading,
        error,
    };
}
