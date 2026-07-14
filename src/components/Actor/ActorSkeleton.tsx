export function ActorSkeleton() {
    return (
        <div className="animate-pulse px-4 md:px-10 lg:px-20">
            {/* 프로필 영역 */}
            <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6 lg:gap-16 mt-10 lg:mt-30 mb-12">
                {/* 왼쪽: 프로필 */}
                <div className="flex flex-row gap-4 lg:flex-col">
                    <div className="w-24 h-36 lg:w-56 lg:h-86 bg-gray-300 rounded-xl shrink-0" />
                    {/* 이름/생년월일/출생지 */}
                    <div className="flex flex-col gap-2 lg:mt-15">
                        <div className="h-6 bg-gray-300 rounded w-32 lg:w-40" />
                        <div className="h-4 bg-gray-300 rounded w-24 lg:w-32" />
                        <div className="h-4 bg-gray-300 rounded w-36 lg:w-48" />
                    </div>
                </div>

                {/* 오른쪽: 대표 출연작 ) */}
                <div className="hidden lg:flex flex-1 gap-12 justify-center">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="min-w-45 cursor-pointer">
                            <div className="w-65 h-95 bg-gray-300 rounded-lg" />
                            <div className="mt-3 flex flex-col gap-2">
                                <div className="h-4 bg-gray-300 rounded w-40" />
                                <div className="h-3 bg-gray-300 rounded w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full h-px bg-gray-300 my-4" />

            {/* 출연작 제목 */}
            <div className="h-6 bg-gray-300 rounded w-20 mb-8" />

            {/* 출연작 목록 */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i}>
                    {/* 포스터 정보  */}
                    <div className="flex items-center gap-4 mb-4 lg:grid lg:grid-cols-[2fr_1fr_1fr]">
                        {/* 포스터 */}
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="w-20 h-28 lg:w-36 lg:h-48 bg-gray-300 rounded" />
                            {/* 포스터 옆 제목 */}
                            <div className="hidden lg:flex flex-col gap-2">
                                <div className="h-3 bg-gray-300 rounded w-10" />
                                <div className="h-4 bg-gray-300 rounded w-32" />
                            </div>
                        </div>
                        {/* 오른쪽 정보 */}
                        <div className="flex flex-col gap-2 flex-1 lg:hidden">
                            <div className="h-4 bg-gray-300 rounded w-full" />
                            <div className="h-3 bg-gray-300 rounded w-12" />
                            <div className="h-3 bg-gray-300 rounded w-10" />
                        </div>
                        {/* 역할 */}
                        <div className="hidden lg:block h-4 bg-gray-300 rounded w-20" />
                        {/* 별점 */}
                        <div className="hidden lg:block h-4 bg-gray-300 rounded w-12" />
                    </div>
                    <div className="w-full h-px bg-gray-300 mb-4" />
                </div>
            ))}
        </div>
    );
}
