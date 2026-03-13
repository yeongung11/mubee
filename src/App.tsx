import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { Header } from "./components/Header";
import { Actor } from "./pages/Actor";

function App() {
    return (
        <BrowserRouter>
            <Header className="z-50 fixed top-0 w-full" />
            <main className="">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<Detail />} />
                    <Route path="/actor/:actorId" element={<Actor />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
