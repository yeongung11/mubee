import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import PageTransition from "../components/PageTransition";

export default function MainLayout() {
    return (
        <div className="min-h-screen lg:pt-16">
            <Header className="fixed top-0 left-0 z-50 w-full bg-white border-b-2 border-mubee-burgundy shadow-sm" />
            <PageTransition>
                <Outlet />
            </PageTransition>
        </div>
    );
}
