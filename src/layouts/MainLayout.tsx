import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export default function MainLayout() {
    return (
        <div className="min-h-screen">
            <Header className="fixed top-0 left-0 z-50 w-full text-white bg-black/30 shadow-lg" />
            <main className="">
                <Outlet />
            </main>
        </div>
    );
}
