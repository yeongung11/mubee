import type { Actor, Movie } from "../types/movie";
import { useParams } from "react-router-dom";
import { useEffect, useState, useEffectEvent } from "react";
import { fetchActorDetail, fetchActorMovies } from "../api/tmdb";

export function Actor() {
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
        <div>
            <div>
                <img
                    src={`https://image.tmdb.org/t/p/w300${
                        actor.profile_path || ""
                    }`}
                    alt={actor.name}
                />
                <div>{actor.name}</div>
                <div>
                    출연 {actor.known_for_department} • {movies.length} 편
                </div>
            </div>
            <section>
                <h1>출연작</h1>
                <div>
                    {movies.slice(0, 14).map((movie) => (
                        <div key={movie.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w92${
                                    movie.poster_path || ""
                                }`}
                                alt={movie.title}
                            />
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
