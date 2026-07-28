import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };
    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="min-h-screen flex items-center justify-center bg-white px-6">
                    <section
                        role="alert"
                        className="w-full max-w-md text-center"
                    >
                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-mubee-burgundy/10">
                            <span className="text-4xl" aria-hidden="true">
                                🎬
                            </span>
                        </div>

                        <p className="text-sm font-bold tracking-widest text-mubee-burgundy">
                            MUBEE ERROR
                        </p>

                        <h1 className="mt-3 text-2xl font-bold text-gray-900">
                            영화를 불러오지 못했어요
                        </h1>

                        <p className="mt-4 text-sm leading-6 text-gray-500">
                            일시적인 오류가 발생했습니다.
                            <br />
                            잠시 후 다시 시도해 주세요.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="rounded-full bg-mubee-burgundy px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                            >
                                다시 시도
                            </button>

                            <button
                                type="button"
                                onClick={() => window.location.assign("/")}
                                className="rounded-full border border-mubee-burgundy px-6 py-3 text-sm font-semibold text-mubee-burgundy transition hover:bg-mubee-burgundy/5"
                            >
                                홈으로
                            </button>
                        </div>
                    </section>
                </main>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
