import type { Movie } from "../../types/movie";

interface Props {
    movie: Movie;
}

export function DetailHeroBanner({ movie }: Props) {
    return (
        <section className="relative w-full h-[40vh] md:h-112.5 lg:h-150">
            {movie.backdrop_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-240 bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-300">
                        {movie.title}
                    </span>
                </div>
            )}

            <div className="absolute bottom-8 left-4 md:bottom-10 md:left-6 lg:bottom-12 lg:left-8">
                <h1 className="text-xl md:text-3xl lg:text-5xl text-white/90">
                    {movie.title}
                </h1>
                <p className="text-sm md:text-xl lg:text-2xl text-white/90 mt-3 md:mt-4 lg:mt-7">
                    {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "미정"}{" "}
                    {" • "}
                    {movie.genres.slice(0, 3).map((genre) => (
                        <span key={genre.id} className="">
                            {genre.name}
                        </span>
                    ))}
                </p>
                <p className="text-lg md:txex-xl lg:text-2xl text-white/90 mt-3 md:mt-4 lg:mt-7">
                    {movie.production_countries?.[0]?.name || "기타"}
                </p>
                <p className="text-lg md:text-xl lg:text-2xl text-white/90 mt-3 md:mt-4 lg:mt-7">
                    {movie.runtime}분{" • "}
                    {movie.adult ? (
                        <span>청소년 관람불가</span>
                    ) : (
                        <span>전체 이용가</span>
                    )}
                </p>
            </div>
        </section>
    );
}
