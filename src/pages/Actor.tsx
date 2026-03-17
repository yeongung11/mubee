import type { Actor, Movie } from "../types/movie";
import { useParams } from "react-router-dom";
import { useEffect, useState, useEffectEvent } from "react";
import { fetchActorDetail, fetchActorMovies } from "../api/tmdb";
import { useRating } from "../utils/useRating";

export function Actor() {
    const { convertFive } = useRating();
    const { actorId } = useParams<{ actorId: string }>();
    const [actor, setActor] = useState<Actor | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    const loadActorData = useEffectEvent(() => {
        if (!actorId) return;

        setLoading(true);
        Promise.all([
            fetchActorDetail(Number(actorId)),
            fetchActorMovies(Number(actorId)),
        ])
            .then(([actorData, moviesData]) => {
                // console.log("Actor:", actorData);
                // console.log("Movies:", moviesData);
                setActor(actorData);
                setMovies(moviesData);
            })
            .catch((err) => console.error("Actor 로드 실패:", err))
            .finally(() => setLoading(false));
    });

    useEffect(() => {
        loadActorData();
    }, [actorId]);

    if (loading)
        return (
            <div className="flex items-center justify-center align-middle">
                로딩중...
            </div>
        );
    if (!actor) return <div>배우 정보 없음</div>;

    return (
        <div className="px-20">
            <div className="mt-30  mb-8">
                <img
                    className="mb-8"
                    src={`https://image.tmdb.org/t/p/w185${
                        actor.profile_path || ""
                    }`}
                    alt={actor.name}
                />
                <div className="text-3xl mb-8">{actor.name}</div>
                <p className="font-bold">{actor.birthday}</p>
                <p className="font-bold">{actor.place_of_birth}</p>
                {/* <p>{actor.biography}</p> */}
                {/* <div>
                    출연 {actor.known_for_department} • {movies.length} 편
                </div> */}
            </div>
            <div className="w-full h-px bg-gray-300 my-4" />
            <section>
                <h1 className="text-2xl mb-8">출연작</h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-400 text-sm mb-4 px-2">
                    <span>제목</span>
                    <span>역할</span>
                    <span>평가</span>
                </div>
                <div className="w-full h-px bg-gray-300 mb-4" />

                {movies.slice(0, 14).map((movie) => (
                    <div key={movie.id}>
                        <div className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 mb-4 px-2">
                            {/* 제목 (이미지 + 텍스트) */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={`https://image.tmdb.org/t/p/w92${
                                        movie.poster_path || ""
                                    }`}
                                    alt={movie.title}
                                    className="w-36 h-48  rounded"
                                />
                                <p>{movie.title}</p>
                            </div>
                            {/* 역할 */}
                            <p className="text-gray-400">{movie.character}</p>
                            {/* 별점 */}
                            <p className="text-yellow-400">
                                ⭐ {convertFive(movie.vote_average)}
                            </p>
                        </div>
                        <div className="w-full h-px bg-gray-300 mb-4" />
                    </div>
                ))}
            </section>
        </div>
    );
}
