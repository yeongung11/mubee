export function HomeSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Hero Banner */}
            <div className="w-full h-[520px] bg-gray-300 rounded-b-3xl" />

            {/* Ranking */}
            <div className="max-w-8xl mx-auto p-8 mt-15">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-8 w-52 bg-gray-300 rounded-lg" />
                    <div className="h-5 w-14 bg-gray-300 rounded" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i}>
                            <div className="w-full aspect-[2/3] bg-gray-300 rounded-2xl" />
                            <div className="mt-3 h-5 w-3/4 bg-gray-300 rounded" />
                            <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded" />
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center mt-7 gap-5">
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                </div>
            </div>

            {/* Upcoming */}
            <div className="max-w-8xl mx-auto p-8 mt-10">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-8 w-40 bg-gray-300 rounded-lg" />
                    <div className="h-5 w-14 bg-gray-300 rounded" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i}>
                            <div className="w-full aspect-[2/3] bg-gray-300 rounded-2xl" />
                            <div className="mt-3 h-5 w-3/4 bg-gray-300 rounded" />
                            <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Magazine */}
            <div className="max-w-8xl mx-auto p-8 mt-10">
                <div className="h-8 w-44 bg-gray-300 rounded-lg mb-8" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i}>
                            <div className="w-full h-72 bg-gray-300 rounded-2xl" />
                            <div className="mt-4 h-6 w-2/3 bg-gray-300 rounded" />
                            <div className="mt-3 h-4 w-full bg-gray-300 rounded" />
                            <div className="mt-2 h-4 w-4/5 bg-gray-300 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Rate */}
            <div className="max-w-8xl mx-auto p-8 mt-10">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-8 w-40 bg-gray-300 rounded-lg" />
                    <div className="h-5 w-14 bg-gray-300 rounded" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i}>
                            <div className="w-full aspect-[2/3] bg-gray-300 rounded-2xl" />
                            <div className="mt-3 h-5 w-3/4 bg-gray-300 rounded" />
                            <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Now Playing */}
            <div className="max-w-8xl mx-auto p-8 mt-10 mb-16">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-8 w-44 bg-gray-300 rounded-lg" />
                    <div className="h-5 w-14 bg-gray-300 rounded" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i}>
                            <div className="w-full aspect-[2/3] bg-gray-300 rounded-2xl" />
                            <div className="mt-3 h-5 w-3/4 bg-gray-300 rounded" />
                            <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}