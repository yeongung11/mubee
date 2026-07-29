import type { Movie } from "../types/movie";
import { Link } from "react-router-dom";

type MagazineArticle = {
    id: number;
    title: string;
    content: string;
    backdrop: string | null;
};

interface MagazineSectionProps {
    trendingMovies: Movie[];
}

export function MagazineSection({ trendingMovies }: MagazineSectionProps) {
    const magazineArticles: MagazineArticle[] = trendingMovies
        .slice(0, 4)
        .map((movie) => ({
            id: movie.id,
            title: movie.title,
            content:
                movie.overview?.trim() ||
                "지금 관객들의 관심을 받고 있는 작품을 만나보세요.",
            backdrop: movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                : null,
        }));

    if (magazineArticles.length === 0) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-8">
                <p className="text-sm font-bold tracking-widest text-mubee-burgundy">
                    MUBEE MAGAZINE
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900 md:text-3xl">
                    지금 주목할 영화
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    지금 관객들의 관심을 받고 있는 작품을 만나보세요.
                </p>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4 touch-pan-x snap-x snap-proximity scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible md:pb-0 md:snap-none">
                {magazineArticles.map((article) => (
                    <MagazineCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}

function MagazineCard({ article }: { article: MagazineArticle }) {
    return (
        <Link
            to={`/movie/${article.id}`}
            aria-label={`${article.title} 상세 페이지로 이동`}
            className="group block min-w-[85vw] snap-start rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mubee-burgundy focus-visible:ring-offset-4 md:min-w-0"
        >
            <article>
                <div
                    className="relative mb-6 h-80 overflow-hidden rounded-3xl bg-linear-to-br from-gray-900 via-neutral-800 to-black transition-transform duration-500 group-hover:scale-[1.02] md:h-112.5"
                    style={{
                        backgroundImage: article.backdrop
                            ? `linear-gradient(
                                  135deg,
                                  rgba(0, 0, 0, 0.8),
                                  rgba(0, 0, 0, 0.3)
                              ),
                              url("${article.backdrop}")`
                            : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-transparent" />

                    <div className="absolute inset-x-8 bottom-8 md:inset-x-12">
                        <h3 className="mb-4 text-2xl font-bold text-white drop-shadow-lg transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">
                            {article.title}
                        </h3>

                        <p className="line-clamp-4 max-w-2xl text-sm leading-relaxed text-neutral-200 drop-shadow-md md:text-lg">
                            {article.content}
                        </p>
                    </div>
                </div>
            </article>
        </Link>
    );
}
