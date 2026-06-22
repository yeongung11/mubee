export function DetailSkeleton() {
    return (
        <div className="relative">
            {/* 백드롭 이미지 */}
            <div className="w-full h-240 skeleton" />

            {/* 제목/장르/국가/러닝타임 */}
            <div className="absolute top-150 left-3 ml-5 flex flex-col gap-5">
                <div className="h-10 skeleton rounded w-80" />
                <div className="h-6 skeleton rounded w-60" />
                <div className="h-6 skeleton rounded w-40" />
                <div className="h-6 skeleton rounded w-48" />
            </div>

            {/* 포스터 + 평점 영역 */}
            <div className="px-6 mx-auto mt-10 mb-12 max-w-6xl">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div className="w-44 h-64 skeleton rounded-xl" />
                        <div className="flex items-center space-x-5 mr-50">
                            <div className="flex space-x-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-12 h-12 skeleton rounded-full"
                                    />
                                ))}
                            </div>
                            <div className="h-8 skeleton rounded w-28" />
                            <div className="h-8 skeleton rounded w-24" />
                            <div className="w-10 h-10 skeleton rounded-full" />
                        </div>
                    </div>
                    <div className="pt-4 pb-8 border-t border-white/20 flex flex-col gap-3">
                        <div className="h-4 skeleton rounded w-full" />
                        <div className="h-4 skeleton rounded w-full" />
                        <div className="h-4 skeleton rounded w-3/4" />
                    </div>
                </div>
            </div>

            {/* 출연/제작 */}
            <div className="mt-16 mx-auto px-6 pb-20">
                <div className="h-8 skeleton rounded w-32 mb-8" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                        >
                            <div className="w-16 h-20 skeleton rounded-lg shrink-0" />
                            <div className="flex flex-col gap-2 flex-1">
                                <div className="h-3 skeleton rounded w-full" />
                                <div className="h-3 skeleton rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 유사한 영화 */}
            <div className="px-6 mb-10">
                <div className="h-8 skeleton rounded w-64 mb-8" />
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <div className="w-full aspect-2/3 skeleton rounded-xl" />
                            <div className="h-3 skeleton rounded w-full" />
                        </div>
                    ))}
                </div>
            </div>

            {/* 리뷰 */}
            <div className="mx-auto px-6 pb-12 mt-20">
                <div className="h-8 skeleton rounded w-32 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="p-6 bg-white/10 rounded-2xl border border-white/20"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 skeleton rounded-full" />
                                <div className="flex flex-col gap-2">
                                    <div className="h-4 skeleton rounded w-24" />
                                    <div className="h-3 skeleton rounded w-16" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="h-3 skeleton rounded w-full" />
                                <div className="h-3 skeleton rounded w-full" />
                                <div className="h-3 skeleton rounded w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
