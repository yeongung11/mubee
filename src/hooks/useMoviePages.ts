import { useState, useEffect } from "react";

export function useMoviePages(mobile = 2, tablet = 3, desktop = 5) {
    const [moviePages, setMoviePages] = useState(desktop);

    useEffect(() => {
        const updatePages = () => {
            if (window.innerWidth < 768) {
                setMoviePages(mobile);
            } else if (window.innerWidth < 1024) {
                setMoviePages(tablet);
            } else {
                setMoviePages(desktop);
            }
        };

        updatePages();
        window.addEventListener("resize", updatePages);
        return () => window.removeEventListener("resize", updatePages);
    }, [mobile, tablet, desktop]);

    return moviePages;
}
