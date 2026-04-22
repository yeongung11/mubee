import { useState, useCallback } from "react";
import type { Actor } from "../types/movie";
import Buttons from "../components/Buttons";
import { PersonCard } from "../components/PersonCard";

export function PopularPersons({ persons }: { persons: Actor[] }) {
    const [index, setIndex] = useState(0);
    const personPages = 8;
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 gap-3">
                {current.map((person, idx) => (
                    <PersonCard
                        key={person.id}
                        person={person}
                        rank={index + idx + 1}
                    />
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
