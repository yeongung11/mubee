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

    useEffect(() => {
    if (!movie.length) return;
    fetchMovieLogos(movie[index].id).then(setLogoPath);
}, [index, movie])

    // 자동 슬라이드
    const AUTO_SLIDE = 5000;

    useEffect(() => {
        if(movie.length === 0) return;

        const id = setInterval(() => {
            setIndex((prevIndex) => prevIndex === movie.length - 1 ? 0 : prevIndex + 1);
        }, AUTO_SLIDE);
        
        return () => clearInterval(id);
    }, [movie.length])

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
     //   배너이미지
    <div className="relative">
        <Link to={`/movie/${hero.id}`} className="bg-white ">
            <img
                src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
                className="w-full h-full object-cover"
                alt={hero.title}
            />
            
              {/* 타이틀, 별점, 장르 */}
              <div className="absolute top-8 left-4 gap-1 md:top-1/4 md:left-10 md:gap-5 lg:top-1/3 lg:left-50 lg:gap-8 text-amber-50 flex flex-col ">

        {/* 영화 로고     */}
        {logoPath ? (
            <img
            src={`https://image.tmdb.org/t/p/w780${logoPath}`}
            alt={hero.title}
            className="max-h-16 md:max-h-32 lg:max-h-48 object-contain object-left"
        />
        ) : (
            <h2 className="text-lg md:text-3xl lg:text-5xl font-bold text-white drop-shadow-lg">
                {hero.title}
            </h2>
        )}
        
        {/* 제목 */}
        <h2 className="text-base md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
            {hero.title}
        </h2>
    {/* 트렌드 순위 */}
    <span className="text-base md:text-2xl md: mb-4 lg:text-3xl lg:mb-4 block font-bold text-white 
            drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]
            drop-shadow-[0_1px_3px_rgba(0,0,0,1)]
            drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">오늘 트렌드 {index + 1} 위</span>
                <span className="text-sm md:text-lg lg:text-xl block font-bold text-white mb-4
            drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]
            drop-shadow-[0_1px_3px_rgba(0,0,0,1)]
            drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">
                    ⭐{convertFive(hero.vote_average)} • {hero.release_date?.slice(0,4)}
                </span>
                
              </div>
        </Link>
        {/* 버튼 */}
        <div>
              <Buttons
                    direction="left"
                    onClick={handlePrev}
                    disabled={index === 0}
                />
                <Buttons
                    direction="right"
                    onClick={handleNext}
                    disabled={index === movie.length - 1}
                />
              </div>
     </div>
            );
}
