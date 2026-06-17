import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import PageTransition from "../components/PageTransition";

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
        <div className="min-h-screen bg-[#f3f4f6]">
            <Header
                className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                    isWhite
                        ? "text-white bg-black/30 "
                        : "text-black bg-white/90 shadow-lg"
                }`}
            />
            <PageTransition>
                <Outlet />
            </PageTransition>
        </div>
    );
}
