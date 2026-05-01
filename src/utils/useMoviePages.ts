import { useState, useEffect } from "react";

export function useMoviePages() {
    const [moviePages, setMoviePages] = useState(5);

    useEffect(() => {
        const updatePages = () => {
            if (window.innerWidth < 768) {
                setMoviePages(2);
            } else if (window.innerWidth < 1024) {
                setMoviePages(3);
            } else {
                setMoviePages(5);
            }
        };

        updatePages();
        window.addEventListener("resize", updatePages);
        return () => window.removeEventListener("resize", updatePages);
    }, []);

    return moviePages;
}