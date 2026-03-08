import type { Movie } from "../types/movie";

interface MovieRankingProps {
    movies: Movie[];
}

export function MovieRanking({ movies }: MovieRankingProps) {
    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">
                영화 HOT 랭킹 {movies.length}편
            </h1>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {movies.slice(0, 5).map((movie: Movie, idx) => (
                    <li key={movie.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        />
                        <strong>#{idx + 1} </strong>
                        {movie.title}
                        <br />⭐ {movie.vote_average.toFixed(1)}{" "}
                    </li>
                ))}
            </ul>
        </div>
    );
}
