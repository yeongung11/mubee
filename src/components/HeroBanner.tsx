import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHeroBanner, fetchMovieLogos } from "../api/tmdb";
import { type Movie } from "../types/movie";
import Buttons from "../components/Buttons";
import { useRating } from "../utils/useRating";

export function HeroBanner() {
    const { convertFive } = useRating();
    const [movie, setMovies] = useState<Movie[]>([]);
    const [index, setIndex] = useState(0);
    const [logoPath, setLogoPath] = useState<string | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [wideLogo, setWideLogo] = useState(false);
    

    useEffect(() => {
    if (!movie.length) return;
    setWideLogo(false);
    fetchMovieLogos(movie[index].id).then(setLogoPath);
}, [index, movie])

    // 자동 슬라이드
    const AUTO_SLIDE = 5000;

    useEffect(() => {
        if(movie.length === 0 || isPaused) return;

        const id = setInterval(() => {
            setIndex((prevIndex) => prevIndex === movie.length - 1 ? 0 : prevIndex + 1);
        }, AUTO_SLIDE);
        
        return () => clearInterval(id);
    }, [movie.length, isPaused])

    useEffect(() => {
        fetchHeroBanner().then((data) => {
            setMovies(data.results.slice(0, 5));
        });
    }, []);

    if (!movie.length) return null;

    const hero = movie[index];
    const handlePrev = () => setIndex(Math.max(0, index - 1));
    const handleNext = () => setIndex(Math.min(movie.length - 1, index + 1));

    return (
    <div className="relative w-full h-50 sm:h-75 md:h-112.5 lg:h-140">
        <Link to={`/movie/${hero.id}`} className="block h-full relative overflow-hidden">
            <img
                src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
                className="w-full h-full object-cover"
                alt={hero.title}
            />

            {/* 타이틀, 별점, 장르 */}
            <div className="absolute top-8 left-4 gap-1 md:top-1/4 md:left-10 md:gap-5 lg:top-1/3 lg:left-50 lg:gap-8 text-amber-50 flex flex-col">

                {/* {logoPath ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w780${logoPath}`}
                        alt={hero.title}
                        className={`max-h-16 md:max-h-32 lg:max-h-48 object-contain object-left
                        ${wideLogo ? "hidden" : "block"}`}
                        onLoad={(e) => {
                            const img = e.currentTarget;
                            const ratio = img.naturalWidth / img.naturalHeight;
                            setWideLogo(ratio > 5);
                        }}
                    />
                ) : (
                    <h2 className="text-lg md:text-3xl lg:text-5xl font-bold text-white drop-shadow-lg">
                        {hero.title}
                    </h2>
                )} */}

                {logoPath ? (
    <img
        src={`https://image.tmdb.org/t/p/w780${logoPath}`}
        alt={hero.title}
        className="max-h-16 md:max-h-32 lg:max-h-48 object-contain object-left block"
    />
) : (
    <h2 className="text-lg md:text-3xl lg:text-5xl font-bold text-white drop-shadow-lg">
        {hero.title}
    </h2>
)}

                <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                    {hero.title}
                </h2>

                <span className="text-base  md:text-2xl lg:text-3xl lg:mb-4 block font-bold text-white
                    drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]
                    drop-shadow-[0_1px_3px_rgba(0,0,0,1)]
                    drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">
                    오늘 트렌드 {index + 1} 위
                </span>

                <span className="text-sm md:text-lg lg:text-xl block font-bold text-white mb-4
                    drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]
                    drop-shadow-[0_1px_3px_rgba(0,0,0,1)]
                    drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">
                    ⭐{convertFive(hero.vote_average)} • {hero.release_date?.slice(0, 4)}
                </span>
            </div>
        </Link>

        {/* 버튼 */}
        <div>
            <Buttons direction="left" onClick={handlePrev} disabled={index === 0} />
            <Buttons direction="right" onClick={handleNext} disabled={index === movie.length - 1} />

            {/* 일시정지 / 재생 버튼 */}
    <button
        onClick={() => setIsPaused((prev) => !prev)}
        className="absolute bottom-3 right-4 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all"
        aria-label={isPaused ? "재생" : "일시정지"}
    >
        {isPaused ? (
            // 재생 아이콘
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
            </svg>
        ) : (
            // 일시정지 아이콘
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
        )}
    </button>
        </div>
    </div>
);
}
