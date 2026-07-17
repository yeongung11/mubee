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
import { MovieSection } from "../components/MovieSection";
import { MagazineSection } from "@/components/MagazineSection";
import { HomeSkeleton } from "../components/Skeleton";
import { PopularPersons } from "@/components/PopularPersons";
import { useRecentViewStore } from "../store/recent";
import { RecentView } from "../components/RecentView";

export function Home() {
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [topRateMovies, setTopRateMovies] = useState<Movie[]>([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
    const [popularPersons, setPopularPersons] = useState<Actor[]>([]);
    const [loading, setLoading] = useState(true);
    const { recentView } = useRecentViewStore();
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

    if (loading) return <HomeSkeleton />;

    if (error)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4">
                <p className="text-xl">데이터 로딩 실패</p>
                <button
                    className="px-6 py-2 bg-white text-black rounded-full font-semibold"
                    onClick={() => window.location.reload()}
                >
                    다시 시도
                </button>
            </div>
        );

    return (
        <>
            <HeroBanner />
            {recentView.length > 0 && <RecentView movies={recentView} />}
            <MovieRanking movies={popularMovies} />
            <Upcoming movies={upcomingMovies} />
            <PopularPersons persons={popularPersons} />
            <MagazineSection trendingMovies={popularMovies} />
            <MovieSection
                movies={topRateMovies}
                title="평점 높은 작품"
                moreLink="/movie?category=top_rated"
            />
            <MovieSection
                movies={nowPlayingMovies}
                title="최신 개봉작"
                moreLink="/movie?category=now_playing"
            />
        </>
    );
}
