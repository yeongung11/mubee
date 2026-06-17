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
                <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4">
                    <p className="text-2xl">🎬</p>
                    <p className="text-lg">문제가 발생했어요</p>
                    <button
                        className="px-4 py-2 bg-white text-black rounded cursor-pointer"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        다시 시도
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
