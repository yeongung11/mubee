import { Link } from "react-router-dom";
import type { CastMember, CrewMember } from "../../types/movie";

type Person = CastMember | CrewMember;

interface Props {
    currentCasts: Person[];
    castIdx: number;
    handleCastPrev: () => void;
    handleCastNext: () => void;
    totalCastLength: number;
    castPageSize: number;
}

export function DetailCast({
    currentCasts,
    castIdx,
    handleCastPrev,
    handleCastNext,
    totalCastLength,
    castPageSize,
}: Props) {
    return (
        <section className="py-20 bg-white">
            <div className="mx-auto px-6 max-w-6xl pb-20">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-8 pb-4 border-b border-white/30 text-left">
                    출연/제작
                </h2>
                <div className="flex gap-4 pb-4 overflow-x-auto touch-pan-x snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-5 lg:overflow-visible lg:snap-none mb-8">
                    {currentCasts.map((person, index) => (
                        <Link
                            to={`/actor/${person.id}`}
                            key={person.id ?? index}
                            className="group flex flex-col items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all border border-white/10 hover:border-white/20 cursor-pointer min-w-40 snap-start"
                        >
                            <div className="shrink-0 w-16 h-20 rounded-lg overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                                {person.profile_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
                                        alt={person.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                        <span className="text-xs text-gray-400 font-medium">
                                            No Image
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="min-w-0 w-full flex-1 text-center">
                                <p className="w-full min-h-10 font-bold text-sm text-center wrap-break-words line-clamp-2">
                                    {person.name}
                                </p>
                                <p className="text-gray-400 text-xs line-clamp-2 leading-tight mt-3">
                                    {"character" in person
                                        ? `출연 | ${person.character || "출연"}`
                                        : `제작 | ${person.job || "감독"}`}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="hidden lg:flex items-center justify-center gap-4">
                    <button
                        onClick={handleCastPrev}
                        disabled={castIdx === 0}
                        className="px-2 lg:px-6 lg:py-3 text-sm lg:text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-30 lg:min-w-20"
                    >
                        이전
                    </button>
                    <button
                        onClick={handleCastNext}
                        disabled={castIdx + castPageSize >= totalCastLength}
                        className="px-2 lg:px-6 lg:py-3 text-sm lg:text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-all disabled:cursor-not-allowed disabled:opacity-30 lg:min-w-20"
                    >
                        다음
                    </button>
                </div>
            </div>
        </section>
    );
}
