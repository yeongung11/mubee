import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";

type MagazineArticle = {
    title: string;
    content: string;
    backdrop: string;
};

export function MagazineSection({
    trendingMovies,
}: {
    trendingMovies: Movie[];
}) {
    const magazineArticles: MagazineArticle[] = [
        {
            title: trendingMovies[0].title,
            content: "대중이 선택한 컨텐츠...",
            backdrop: trendingMovies[0]?.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${trendingMovies[0].backdrop_path}`
                : "/static/fallback.jpg",
        },
        {
            title: trendingMovies[1].title,
            content: "요즘 넷플릭스 덕에 집에서 영화를 보지만...",
            backdrop: trendingMovies[1]?.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${trendingMovies[1].backdrop_path}`
                : "/static/fallback.jpg",
        },
        {
            title: trendingMovies[2].title,
            content: "요즘 넷플릭스 덕에 집에서 영화를 보지만...",
            backdrop: trendingMovies[2]?.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${trendingMovies[2].backdrop_path}`
                : "/static/fallback.jpg",
        },
        {
            title: trendingMovies[3].title,
            content: "대중이 선택한 컨텐츠...",
            backdrop: trendingMovies[3]?.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${trendingMovies[3].backdrop_path}`
                : "/static/fallback.jpg",
        },
    ];

    return (
        <section className="max-w-8xl mx-auto py-16 px-4 ml-4">
            {/* <h1 className="text-3xl text-semibold">지금 많이 보는 영화</h1> */}
            <div className="flex gap-6 overflow-x-auto touch-pan-x snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible md:snap-none">
                {magazineArticles.map((article, idx) => (
                    <MagazineCard
                        key={idx}
                        article={article}
                        id={trendingMovies[idx].id}
                    />
                ))}
            </div>
        </section>
    );
}

function MagazineCard({
    article,
    id,
}: {
    article: MagazineArticle;
    id: number;
}) {
    return (
        <Link
            to={`/movie/${id}`}
            className="group cursor-pointer block min-w-[85vw] snap-start md:min-w-0"
        >
            <article className="group cursor-pointer">
                <div
                    className="relative h-80 md:h-112.5 rounded-3xl overflow-hidden bg-linear-to-br from-gray-900 via-neutral-800 to-black mb-6 transition-all duration-500 group-hover:scale-[1.02]"
                    style={{
                        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url(${article.backdrop})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                    <div className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12">
                        <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg group-hover:translate-x-2 transition-transform duration-300">
                            {article.title}
                        </h3>
                        <p className="text-neutral-200 leading-relaxed max-w-2xl md:text-lg line-clamp-4 drop-shadow-md">
                            {article.content}
                        </p>
                    </div>
                </div>
            </article>
        </Link>
    );
}
