export function GenreSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8 animate-pulse">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                    <div className="w-full h-72 lg:h-80 bg-gray-300 rounded-2xl" />
                    <div className="p-4 lg:p-5">
                        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-5 bg-gray-300 rounded w-1/2 mb-3" />
                        <div className="h-4 bg-gray-300 rounded w-16" />
                    </div>
                </div>
            ))}
        </div>
    );
}