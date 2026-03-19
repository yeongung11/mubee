import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHeroBanner } from "../api/tmdb";
import { type Movie } from "../types/movie";
import Buttons from "../components/Buttons";
import { useRating } from "../utils/useRating";

export function HeroBanner() {
    // const [hero, setHero] = useState<Movie | null>(null);
    const { convertFive } = useRating();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [index, setIndex] = useState(0);

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
        <div>
            <img
                src={`https://image.tmdb.org/t/p/original${hero.backdrop_path}`}
                className="w-full h-full object-cover"
                alt={hero.title}
            />
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" /> */}
            <div>
                <span>오늘 트렌드 {index + 1} 위</span>
                <h1>{hero.title}</h1>
                <span>
                    ⭐{convertFive(hero.vote_average)}• {hero.release_date?.slice(0,4)}
                </span>

                <Link to={`/movie/${hero.id}`}>▶ 자세히 보기</Link>
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
                <div>
                    {movies.map((_, i) => (
                        <div key={i} onClick={() => setIndex(i)}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
