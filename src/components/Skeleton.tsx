// 카드
export function MovieCardSkeleton() {
    return (
        <div>
            <div className="w-full aspect-2/3 skeleton rounded-2xl" />
            <div className="mt-3 h-5 w-3/4 skeleton rounded" />
            <div className="mt-2 h-4 w-1/2 skeleton rounded" />
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
        <div className="max-w-8xl mx-auto p-8 mt-10 ">
            <div className="flex justify-between items-center mb-8">
                <div className="h-8 w-44 skeleton rounded-lg" />
                <div className="h-5 w-14 skeleton rounded" />
            </div>
            <MovieGridSkeleton count={count} />
        </div>
    );
}

// 공통 페이지
export function PageSkeleton({ count = 10 }: { count?: number }) {
    return (
        <div className="max-w-7xl mx-auto px-10 py-10 mt-16">
            <div className="mb-12">
                <div className="h-10 w-64 skeleton rounded-lg mx-auto" />
            </div>
            <MovieGridSkeleton count={count} />
        </div>
    );
}

// 홈 전용
export function HomeSkeleton() {
    return (
        <div>
            {/* Hero Banner */}
            <div className="w-full h-130 skeleton rounded-b-3xl" />
            <SectionSkeleton count={5} />
            <SectionSkeleton count={5} />
            <SectionSkeleton count={5} />
            <SectionSkeleton count={5} />
        </div>
    );
}
