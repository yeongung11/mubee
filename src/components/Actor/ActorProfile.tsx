import type { Actor } from "@/types/movie";

type Props = {
    actor: Actor;
};

export function ActorProfile({ actor }: Props) {
    return (
        <div className="flex flex-row gap-4 lg:flex-col">
            {actor.profile_path ? (
                <img
                    className="w-24 h-36 lg:w-56 lg:h-86 rounded-xl object-cover"
                    src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
                    alt={actor.name}
                />
            ) : (
                <div className="w-46 h-64 rounded-xl bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-gray-400 font-medium">No Image</span>
                </div>
            )}

            <div className="flex flex-col gap-2 lg:mt-15">
                <div className="text-xl lg:text-3xl font-bold">
                    {actor.name}
                </div>
                <p className="text-sm text-gray-500">
                    {actor.birthday || "생년월일 정보 없음"}
                </p>
                <p className="text-sm text-gray-500">
                    {actor.place_of_birth || "출생지 정보 없음"}
                </p>
            </div>
        </div>
    );
}
