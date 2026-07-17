import { HeroBanner } from "../components/HeroBanner";
import { HomeSkeleton } from "../components/Skeleton";
import { MagazineSection } from "@/components/MagazineSection";
import { MovieRanking } from "../components/MovieRanking";
import { MovieSection } from "../components/MovieSection";
import { PopularPersons } from "@/components/PopularPersons";
import { RecentView } from "../components/RecentView";
import { Upcoming } from "../components/Upcoming";
import { useHomeData } from "../hooks/useHomeData";
import { useRecentViewStore } from "../store/recent";

export function Home() {
    const {
        popularMovies,
        upcomingMovies,
        topRateMovies,
        nowPlayingMovies,
        popularPersons,
        loading,
        error,
    } = useHomeData();
    const { recentView } = useRecentViewStore();

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
                moreLink="/movies?category=top_rated"
            />
            <MovieSection
                movies={nowPlayingMovies}
                title="최신 개봉작"
                moreLink="/movies?category=now_playing"
            />
        </>
    );
}
