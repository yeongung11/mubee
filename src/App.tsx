import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Actor } from "./pages/Actor";
import { FavoritePage } from "./pages/FavoritePage";
import MainLayout from "./layouts/MainLayout";
import DetailLayout from "./layouts/DetailLayout";
import Genre from "./components/Genre";
import GenreDetail from "./pages/GenreDetail";
import { MainPageMovies } from "./pages/MainPageMovies";
import SearchPage from "./pages/SearchPage";
import ErrorBoundary from "./components/ErrorBoundary";
import NoPages from "./pages/NoPages";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/genre" element={<Genre />} />
                    <Route path="/genre/:genreId" element={<GenreDetail />} />
                    <Route path="/movies" element={<MainPageMovies />} />
                    <Route path="/actor/:actorId" element={<Actor />} />
                    <Route path="/favorites" element={<FavoritePage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Route>
                <Route element={<DetailLayout />}>
                    <Route path="/movie/:id" element={<Detail />} />
                </Route>
                <Route path="*" element={<NoPages />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <main>
                    <AnimatedRoutes />
                </main>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
