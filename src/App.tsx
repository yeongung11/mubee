import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Header } from "./components/Header";
import { Actor } from "./pages/Actor";
import { FavoritePage } from "./pages/FavoritePage";

function App() {
    return (
        <BrowserRouter>
            <Header className="z-50 fixed top-0 w-full" />
            <main className="">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<Detail />} />
                    <Route path="/actor/:actorId" element={<Actor />} />
                    <Route path="/favorites" element={<FavoritePage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
