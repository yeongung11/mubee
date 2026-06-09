import type { Review } from "../../types/movie";

interface Props {
    reviews: Review[];
}

export function DetailReviews({ reviews }: Props) {
    return (
        <section className="py-20 bg-white">
            <div className="mx-auto px-6 max-w-6xl pb-12">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 pb-4 border-b border-white/30 text-left flex items-center gap-3">
                    리뷰 ({reviews.length}+)
                </h2>
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-sm text-white">
                                        {review.author
                                            .slice(0, 3)
                                            .toUpperCase()}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-xl  truncate">
                                            {review.author}
                                        </h4>
                                        <p className=" text-sm">
                                            {new Date(
                                                review.created_at,
                                            ).toLocaleDateString("ko-KR")}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-lg leading-7  line-clamp-4">
                                    {review.content}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p className="text-xl">아직 등록된 리뷰가 없습니다.</p>
                    </div>
                )}
                {reviews.length > 0 && (
                    <div className="text-center mt-8">
                        <button className="px-8 py-3 bg-linear-to-r from-gray-500 to-gray-500 text-white font-bold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg">
                            모든 리뷰 보기
                        </button>
                    </div>
                )}

                <div className="w-full h-px bg-gray-300 mt-12" />
            </div>
        </section>
    );
}
