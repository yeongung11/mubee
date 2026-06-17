// 카드
export function MovieCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="w-full aspect-2/3 bg-gray-300 rounded-2xl" />
            <div className="mt-3 h-5 w-3/4 bg-gray-300 rounded" />
            <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded" />
        </div>
    );
}

// 카드 그리드
export function MovieGridSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <MovieCardSkeleton key={i} />
            ))}
        </div>
    );
}

// 섹션 타이틀
export function SectionSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="max-w-8xl mx-auto p-8 mt-10 animate-pulse">
            <div className="flex justify-between items-center mb-8">
                <div className="h-8 w-44 bg-gray-300 rounded-lg" />
                <div className="h-5 w-14 bg-gray-300 rounded" />
            </div>
            <MovieGridSkeleton count={count} />
        </div>
    );
}

// 공통 페이지
export function PageSkeleton({ count = 10 }: { count?: number }) {
    return (
        <div className="max-w-7xl mx-auto px-10 py-10 mt-16">
            <div className="animate-pulse mb-12">
                <div className="h-10 w-64 bg-gray-300 rounded-lg mx-auto" />
            </div>
            <MovieGridSkeleton count={count} />
        </div>
    );
}

// 홈 전용
export function HomeSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Hero Banner */}
            <div className="w-full h-130 bg-gray-300 rounded-b-3xl" />
            <SectionSkeleton count={5} />
            <SectionSkeleton count={5} />
            <SectionSkeleton count={5} />
            <SectionSkeleton count={5} />
        </div>
    );
}
