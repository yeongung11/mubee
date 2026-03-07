import { useEffect } from "react";
import { fetchPopularMovies } from "./api/tmdb";

function App() {
    useEffect(() => {
        fetchPopularMovies().then(console.log);
    }, []);
    return (
        <>
            <div>Mubee</div>
            
        </>
    );
}

export default App;
