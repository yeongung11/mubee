import { useEffect, useState } from "react";
import {
    fetchNowPlaying,
    fetchPopularMovies,
    fetchTopRate,
    fetchUpcomingMovies,
    fetchPopularPersons,
} from "../api/tmdb";
import type { Movie, Actor } from "../types/movie";
import { MovieRanking } from "../components/MovieRanking";
import { Upcoming } from "../components/Upcoming";
import { HeroBanner } from "../components/HeroBanner";
import { TopRate } from "../components/TopRate";
import { NowPlaying } from "../components/NowPlaying";
import { MagazineSection } from "@/components/MagazineSection";
import { HomeSkeleton } from "./Skeleton";
import { PopularPersons } from "@/components/PopularPersons";

export function Home() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [topRateMovies, setTopRateMovies] = useState<Movie[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
    const [popularPersons, setPopularPersons] = useState<Actor[]>([]);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };
        loadAllData();
    }, []);

    if (loading) return <HomeSkeleton />;

    return (
        <>
            <HeroBanner />
            <MovieRanking movies={popularMovies} />
            <Upcoming movies={upcomingMovies} />
            <PopularPersons persons={popularPersons} />
            <MagazineSection trendingMovies={popularMovies} />
            <TopRate movies={topRateMovies} />
            <NowPlaying movies={nowPlayingMovies} />
        </>
    );
}
