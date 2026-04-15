import type { Actor, Movie } from "../types/movie";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useEffectEvent } from "react";
import { fetchActorDetail, fetchActorMovies } from "../api/tmdb";
import { useRating } from "../utils/useRating";
import { getEngTitle, getEngName } from "@/utils/movieTitle";

export function Actor() {
    const navigate = useNavigate();
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
                // 배우 이름 변환
                getEngName(actorData.id, actorData.name).then(
                    (resolvedName) => {
                        setActor({ ...actorData, name: resolvedName });
                    },
                );

                // 영화 제목 변환
                Promise.all(
                    moviesData.map(async (movie: Movie) => ({
                        ...movie,
                        title: await getEngTitle(movie),
                    })),
                ).then((resolvedMovies) => {
                    setMovies(resolvedMovies);
                    setLoading(false);
                });
            })
            .catch((err) => console.error("Actor 로드 실패:", err));
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
                {actor.profile_path ? (
                    <img
                        className="mb-8 w-46 h-64 rounded-xl object-cover"
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                    />
                ) : (
                    <div className="mb-8 w-46 h-64 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <span className="text-gray-400 font-medium">
                            No Image
                        </span>
                    </div>
                )}
                <div className="text-3xl mb-8">{actor.name}</div>
                <p className="font-bold">
                    {actor.birthday || "생년월일 정보 없음"}
                </p>
                <p className="font-bold">
                    {actor.place_of_birth || "출생년도 정보 없음"}
                </p>
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

                {movies.slice(0, 14).map((movie) => {
                    const year = movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "미정";

                    return (
                        <div key={movie.id}>
                            <div className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4 mb-4 px-2">
                                {/* 제목 (연도 + 이미지 + 텍스트) */}
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-400 min-w-[50px]">
                                        {year}
                                    </span>

                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${
                                            movie.poster_path || ""
                                        }`}
                                        onClick={() =>
                                            navigate(`/movie/${movie.id}`)
                                        }
                                        alt={movie.title}
                                        className="w-36 h-48 cursor-pointer rounded"
                                    />

                                    <p>{movie.title}</p>
                                </div>

                                {/* 역할 */}
                                <p className="text-gray-400">
                                    {movie.character}
                                </p>

                                {/* 별점 */}
                                <p className="text-yellow-400">
                                    ⭐ {convertFive(movie.vote_average)}
                                </p>
                            </div>

                            <div className="w-full h-px bg-gray-300 mb-4" />
                        </div>
                    );
                })}
            </section>
        </div>
    );
}
