interface GenreHeaderProps {
    selectedGenre: { name: string } | null;
    movieCount: number;
    loading: boolean;
}

export function GenreHeader({
    selectedGenre,
    movieCount,
    loading,
}: GenreHeaderProps) {
    return (
        <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-black drop-shadow-2xl mb-6">
                카테고리별 영화
            </h1>
            {selectedGenre && !loading && (
                <p className="text-2xl font-semibold text-gray-700">
                    "{selectedGenre.name}"{" "}
                    <span className="text-blue-600">({movieCount}개)</span>
                </p>
            )}
            {selectedGenre && loading && (
                <div className="flex justify-center">
                    <div className="h-8 w-44 bg-gray-300 rounded-lg animate-pulse" />
                </div>
            )}
        </div>
    );
}
