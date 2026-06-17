import { Link } from "react-router-dom";

export default function NoPages() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4">
            <p className="text-6xl font-bold">404</p>
            <p className="text-xl text-gray-400">페이지가 없습니다.</p>
            <Link
                to="/"
                className="mt-4 px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
            >
                홈으로
            </Link>
        </div>
    );
}
