import { useState, useCallback } from "react";
import type { Actor } from "../types/movie";
import Buttons from "../components/Buttons";
import { Link } from "react-router-dom";

export function PopularPersons({ persons }: { persons: Actor[] }) {
    const [index, setIndex] = useState(0);
    const personPages = 10;
    const current = persons.slice(index, index + personPages);

    const handlePrev = useCallback(() => {
        setIndex(Math.max(0, index - personPages));
    }, [index]);

    const handleNext = useCallback(() => {
        setIndex(Math.min(persons.length - personPages, index + personPages));
    }, [index, persons.length]);

    return (
        <div className="relative max-w-8xl mx-auto p-8 py-10">
            <h2 className="text-2xl font-bold mb-6">인기 인물</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3">
                {current.map((person, idx) => (
                    <div key={person.id} className="flex flex-col">
                        <Link to={`/actor/${person.id}`}>
                            <div className="relative">
                                <span className="absolute top-2 left-4 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                                    {index + idx + 1}
                                </span>
                                {person.profile_path ? (
                                    <div className="w-full h-full rounded-lg overflow-hidden">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w342${person.profile_path}`}
                                            alt={person.name}
                                            className="w-full h-full  object-contain"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-73 rounded flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                                        <span className="text-gray-400 font-semibold">
                                            No Image
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>
                        <p className="mt-2 text-sm font-semibold text-center">
                            {person.name}
                        </p>
                    </div>
                ))}
            </div>

            {persons.length > personPages && (
                <div className="flex justify-between mt-8 gap-4">
                    <Buttons
                        direction="left"
                        onClick={handlePrev}
                        disabled={index === 0}
                    />
                    <Buttons
                        direction="right"
                        onClick={handleNext}
                        disabled={index + personPages >= persons.length}
                    />
                </div>
            )}
        </div>
    );
}
