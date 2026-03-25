import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHeroBanner } from "../api/tmdb";
import { type Movie } from "../types/movie";
import Buttons from "../components/Buttons";
import { useRating } from "../utils/useRating";

export function HeroBanner() {
    const { convertFive } = useRating();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [index, setIndex] = useState(0);

    // 자동 슬라이드
    const AUTO_SLIDE = 5000;

    useEffect(() => {
        if(movies.length === 0) return;

        const id = setInterval(() => {
            setIndex((prevIndex) => prevIndex === movies.length - 1 ? 0 : prevIndex + 1);
        }, AUTO_SLIDE);
        
        return () => clearInterval(id);
    }, [movies.length])

    useEffect(() => {
        fetchHeroBanner().then((data) => {
            setMovies(data.results.slice(0, 5));
        });
    }, []);

    if (!movies.length) return null;

    const hero = movies[index];
    const handlePrev = () => setIndex(Math.max(0, index - 1));
    const handleNext = () => setIndex(Math.min(movies.length - 1, index + 1));

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
              <div className="absolute top-1/2 left-12 gap-3 text-amber-50 flex flex-col ">
                <span className="text-3xl block font-bold text-white mb-4
            drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]
            drop-shadow-[0_1px_3px_rgba(0,0,0,1)]
            drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">오늘 트렌드 {index + 1} 위</span>
                <h2 className="text-2xl block font-bold text-white mb-4
            drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]
            drop-shadow-[0_1px_3px_rgba(0,0,0,1)]
            drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">{hero.title}</h2>
                <span className="text-lg block font-bold text-white mb-4
            drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]
            drop-shadow-[0_1px_3px_rgba(0,0,0,1)]
            drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">
                    ⭐{convertFive(hero.vote_average)} • {hero.release_date?.slice(0,4)}
                </span>
                {/* <Link to={`/movie/${hero.id}`}
                className="text-xl block font-bold text-white mb-4
            drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]
            drop-shadow-[0_1px_3px_rgba(0,0,0,1)]
            drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]">▶ 자세히 보기</Link> */}
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
                    disabled={index === movies.length - 1}
                />
              </div>
     </div>
            );
}
