import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
// import { Header } from "./components/Header";
import { Actor } from "./pages/Actor";
import { FavoritePage } from "./pages/FavoritePage";
import MainLayout from "./layouts/MainLayout";
import DetailLayout from "./layouts/DetailLayout";
import Genre from "./components/Genre";
import GenreDetail from "./pages/GenreDetail";
import { MainPageMovies } from "./pages/MainPageMovies";

function App() {
    return (
        <BrowserRouter>
            {/* <div className="min-h-screen bg-gradient-to-r from-slate-100/80 to-slate-200/70"> */}
            {/* <Header className="z-50 fixed top-0 w-full" /> */}
            <main>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/genre" element={<Genre />} />
                        <Route
                            path="/genre/:genreId"
                            element={<GenreDetail />}
                        />
                        <Route path="movies" element={<MainPageMovies />} />
                        <Route path="/actor/:actorId" element={<Actor />} />
                        <Route path="/favorites" element={<FavoritePage />} />
                    </Route>

                    <Route element={<DetailLayout />}>
                        <Route path="/movie/:id" element={<Detail />} />
                    </Route>
                </Routes>
            </main>
            {/* </div> */}
        </BrowserRouter>
    );
}

export default App;
