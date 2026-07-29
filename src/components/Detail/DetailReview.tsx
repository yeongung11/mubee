import type { Review } from "../../types/movie";

interface Props {
    reviews: Review[];
}

export function DetailReviews({ reviews }: Props) {
    if (reviews.length === 0) {
        return null;
    }
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-6xl px-6 pb-12">
                <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-3xl">
                        관객 리뷰
                    </h2>

                    <p className="text-xs text-gray-400">TMDB 제공</p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {reviews.map((review) => (
                        <article
                            key={review.id}
                            className="rounded-2xl border border-gray-200 bg-gray-50 p-6 transition hover:border-mubee-burgundy/30 hover:shadow-md"
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div
                                    aria-hidden="true"
                                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mubee-burgundy font-bold text-white"
                                >
                                    {review.author.slice(0, 2).toUpperCase()}
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate font-semibold text-gray-900">
                                        {review.author}
                                    </h3>

                                    <time
                                        dateTime={review.created_at}
                                        className="text-sm text-gray-500"
                                    >
                                        {new Date(
                                            review.created_at,
                                        ).toLocaleDateString("ko-KR")}
                                    </time>
                                </div>
                            </div>

                            <p className="line-clamp-4 text-sm leading-6 text-gray-700">
                                {review.content}
                            </p>
                        </article>
                    ))}
                </div>

                <p className="mt-8 text-center text-xs text-gray-400">
                    TMDB에서 제공하는 사용자 리뷰입니다.
                </p>
            </div>
        </section>
    );
}
