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
            title: "요즘엔 무슨 영화? ",
            content: "대중이 선택한 컨텐츠...",
            backdrop: trendingMovies[0]?.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${trendingMovies[0].backdrop_path}`
                : "/static/fallback.jpg",
        },
        {
            title: "새롭게 떠오르는 컨텐츠 🎞️",
            content: "요즘 넷플릭스 덕에 집에서 영화를 보지만...",
            backdrop: trendingMovies[1]?.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${trendingMovies[1].backdrop_path}`
                : "/static/fallback.jpg",
        },
        {
            title: "새롭게 떠오르는 컨텐츠 🎞️",
            content: "요즘 넷플릭스 덕에 집에서 영화를 보지만...",
            backdrop: trendingMovies[2]?.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${trendingMovies[2].backdrop_path}`
                : "/static/fallback.jpg",
        },
        {
            title: "새롭게 떠오르는 컨텐츠 🎞️",
            content: "요즘 넷플릭스 덕에 집에서 영화를 보지만...",
            backdrop: trendingMovies[3]?.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${trendingMovies[3].backdrop_path}`
                : "/static/fallback.jpg",
        },
    ];

    return (
        <section className="max-w-8xl mx-auto py-16 px-4">
            {/* <h1 className="text-3xl text-semibold">지금 많이 보는 영화</h1> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <Link to={`/movie/${id}`} className="group cursor-pointer block">
            <article className="group cursor-pointer">
                <div
                    className="relative h-80 md:h-[450px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-neutral-800 to-black mb-6 transition-all duration-500 group-hover:scale-[1.02]"
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

                <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <span>ung</span>
                    <span>•</span>
                    <span>약 2시간 전</span>
                    <span className="ml-auto text-neutral-400 text-xs">
                        더보기 →
                    </span>
                </div>
            </article>
        </Link>
    );
}
