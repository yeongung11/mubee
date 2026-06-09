import type { Movie } from "../../types/movie";

interface Props {
    movie: Movie;
    userRating: number;
    hoverRating: number;
    setRating: (rating: number) => void;
    setHoverRating: (rating: number) => void;
    isFavorite: boolean;
    toggleFavorite: () => void;
    isWatching: boolean;
    setIsWatching: () => void;
    convertFive: (vote: number) => string | number;
}

export function DetailPosterRating({
    movie,
    userRating,
    hoverRating,
    setRating,
    setHoverRating,
    isFavorite,
    toggleFavorite,
    isWatching,
    setIsWatching,
    convertFive,
}: Props) {
    return (
        <section className="py-16 bg-white">
            <div className="px-20 mx-auto max-w-8xl">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="w-87.5 h-auto object-cover rounded-xl shadow-2xl shrink-0"
                    />

                    <div className="flex flex-col flex-1 min-w-0 w-full">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 border-b border-white/10 pb-6 mt-6 lg:mt-10">
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            className={`w-10 h-10 lg:w-15 lg:h-15 cursor-pointer transition-all hover:scale-110 ${
                                                hoverRating >= star ||
                                                userRating >= star
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-400"
                                            }`}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() =>
                                                setHoverRating(star)
                                            }
                                            onMouseLeave={() =>
                                                setHoverRating(0)
                                            }
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm text-gray-400">
                                    평가하기
                                </span>
                            </div>

                            <div className="flex flex-col items-center gap-5">
                                <span className="text-4xl lg:text-6xl font-bold text-pink-500">
                                    {convertFive(movie.vote_average)}
                                </span>
                                <span className="text-sm text-gray-400">
                                    예상 별점
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 lg:gap-10 w-full lg:ml-20">
                                <button
                                    onClick={toggleFavorite}
                                    className="flex flex-col items-center gap-1 w-20 text-gray-400 "
                                >
                                    <span className="text-lg lg:text-2xl">
                                        {isFavorite ? "❤️" : "＋"}
                                    </span>
                                    <span className="text-sm lg:text-2xl whitespace-nowrap">
                                        {isFavorite ? "찜완료" : "보고싶어요"}
                                    </span>
                                </button>

                                <button className="flex flex-col items-center gap-1 text-gray-400 ">
                                    <span className="text-lg lg:text-2xl">
                                        ...
                                    </span>
                                    <span className="text-sm lg:text-2xl whitespace-nowrap">
                                        코멘트
                                    </span>
                                </button>

                                <button
                                    onClick={setIsWatching}
                                    className={`flex flex-col items-center gap-1 transition-colors ${
                                        isWatching
                                            ? "text-blue-500"
                                            : "text-gray-400"
                                    }`}
                                >
                                    <span className="text-lg lg:text-2xl">
                                        {isWatching ? "O" : "X"}
                                    </span>
                                    <span className="text-sm lg:text-2xl whitespace-nowrap">
                                        보는 중
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="w-full h-px bg-gray-300 mb-4 mt-5" />
                        <div className="text-gray-700 leading-relaxed text-sm">
                            {movie.overview ? (
                                <p>{movie.overview}</p>
                            ) : (
                                <p className="text-gray-500">
                                    {movie.title}에 대한 상세 줄거리 정보가
                                    없습니다. 감독{" "}
                                    {movie.directors?.[0]?.name || "미상"}의{" "}
                                    {movie.genres[0]?.name || ""} 장르
                                    작품입니다.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
