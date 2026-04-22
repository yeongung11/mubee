import { useState, useEffect } from "react";
import type { Actor } from "../types/movie";
import { Link } from "react-router-dom";
import { getEngName } from "../utils/movieTitle";

export function PersonCard({ person, rank }: { person: Actor; rank: number }) {
    const [dpName, setDpName] = useState(person.name);

    useEffect(() => {
        getEngName(person.id, person.name).then(setDpName);
    }, [person.id, person.name]);

    return (
        <div className="flex flex-col">
            <Link to={`/actor/${person.id}`}>
                <div className="relative">
                    <span className="absolute top-2 left-4 z-10 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                        {rank}
                    </span>
                    <div className="w-full h-62 rounded-xl overflow-hidden">
                        {person.profile_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w342${person.profile_path}`}
                                alt={dpName}
                                className="w-full h-full object-cover object-"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                <span className="text-gray-400 font-semibold">
                                    No Image
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>
            <p className="mt-2 text-sm font-semibold text-center truncate">
                {dpName}
            </p>
        </div>
    );
}
