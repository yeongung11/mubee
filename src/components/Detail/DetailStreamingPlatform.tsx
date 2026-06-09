import type { WatchProviderResult } from "../../types/movie";

interface Props {
    provider: WatchProviderResult | null;
}

export function DetailStreamingPlatform({ provider }: Props) {
    return (
        <section className="py-12 bg-gray-50">
            {provider?.flatrate && provider.flatrate.length > 0 ? (
                <div className="px-6 max-w-6xl mx-auto">
                    <div className="w-full h-px bg-gray-300 mb-4" />
                    <p className="text-lg md:text-2xl lg:text-3xl font-bold ">
                        스트리밍 플랫폼
                    </p>
                    {provider.flatrate.map((p) => (
                        <div
                            key={p.provider_id}
                            className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2 mt-8"
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                                alt={p.provider_name}
                                className="w-14 h-14 rounded-lg"
                            />
                            <span className="text-lg lg:text-xl font-medium">
                                {p.provider_name}
                            </span>
                        </div>
                    ))}
                    <div className="w-full h-px bg-gray-300 mb-4 mt-5" />
                </div>
            ) : (
                <div className="px-6 max-w-6xl mx-auto">
                    <div className="w-full h-px bg-gray-300 mb-4" />
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold">
                        스트리밍 플랫폼
                    </p>
                    <p className="mt-6 text-gray-500 text-lg">
                        스트리밍 플랫폼 정보가 없습니다.
                    </p>
                    <div className="w-full h-px bg-gray-300 mb-4 mt-5" />
                </div>
            )}
        </section>
    );
}
