import type { Actor, Movie } from "../types/movie";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchActorDetail, fetchActorMovies } from "../api/tmdb";

import { getEngTitle, getEngName } from "@/utils/movieTitle";
import { ActorSkeleton } from "../components/Actor/ActorSkeleton";
import { ActorProfile } from "../components/Actor/ActorProfile";
import { ActorFeaturedMovies } from "../components/Actor/ActorFeaturedMovies";
import { ActorMovieList } from "@/components/Actor/ActorMovieList";

export function Actor() {
    const { actorId } = useParams<{ actorId: string }>();
    const [actor, setActor] = useState<Actor | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [moreMovie, setMoreMovie] = useState(14);

    useEffect(() => {
        if (!actorId) return;

        setLoading(true);

        const load = async () => {
            try {
                const [actorData, moviesData] = await Promise.all([
                    fetchActorDetail(Number(actorId)),
                    fetchActorMovies(Number(actorId)),
                ]);

                const [resolvedName, resolvedMovies] = await Promise.all([
                    getEngName(actorData.id, actorData.name),
                    Promise.all(
                        moviesData.map(async (movie: Movie) => ({
                            ...movie,
                            title: await getEngTitle(movie),
                        })),
                    ),
                ]);

                setActor({ ...actorData, name: resolvedName });
                setMovies(resolvedMovies);
            } catch (err) {
                console.error("Actor 로드 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [actorId]);

    if (loading) return <ActorSkeleton />;

    if (!actor)
        return (
            <div className="flex justify-center items-center">
                배우 정보 없음
            </div>
        );

    const sortedMovies = [...movies].sort((a, b) => {
        const dateA = new Date(a.release_date ?? "").getTime();
        const dateB = new Date(b.release_date ?? "").getTime();
        return dateB - dateA;
    });

    return (
        <div className="px-4 md:px-10 lg:px-20">
            <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6 lg:gap-16 mt-10 lg:mt-30 mb-12">
                {/* 왼쪽: 프로필 */}
                <ActorProfile actor={actor} />
                {/* 오른쪽: 대표 출연작 */}
                <ActorFeaturedMovies movies={movies} />
            </div>

            <div className="w-full h-px bg-gray-300 my-4" />

            {/* 배우 출연작 */}
            <ActorMovieList
                sortedMovies={sortedMovies}
                moreMovie={moreMovie}
                setMoreMovie={setMoreMovie}
            />
        </div>
    );
}
