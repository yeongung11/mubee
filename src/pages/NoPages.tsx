import { Link } from "react-router-dom";

export default function NoPages() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-white px-6">
            <section className="w-full max-w-md text-center">
                <div
                    aria-hidden="true"
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-mubee-burgundy/10 text-4xl"
                >
                    🎬
                </div>

                <p className="text-sm font-bold tracking-widest text-mubee-burgundy">
                    PAGE NOT FOUND
                </p>

                <h1 className="mt-3 text-7xl font-bold text-mubee-burgundy">
                    404
                </h1>

                <h2 className="mt-5 text-2xl font-bold text-gray-900">
                    페이지를 찾을 수 없어요
                </h2>

                <p className="mt-4 text-sm leading-6 text-gray-500">
                    주소가 잘못 입력되었거나
                    <br />
                    페이지가 이동 또는 삭제되었을 수 있어요.
                </p>

                <Link
                    to="/"
                    replace
                    className="mt-8 inline-flex rounded-full bg-mubee-burgundy px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                    홈으로 돌아가기
                </Link>
            </section>
        </main>
    );
}
