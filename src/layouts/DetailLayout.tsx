import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export default function DeatilLayout() {
    const [isWhite, setIsWhite] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsWhite(scrollY < 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen">
            <Header
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                    isWhite
                        ? "text-white bg-black/30 "
                        : "text-black bg-white/90 shadow-lg"
                }`}
            />
            <main className="pt-0">
                <Outlet />
            </main>
        </div>
    );
}
