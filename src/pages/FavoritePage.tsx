import { useFavoritesStore } from "../store/favorite";
import { MovieGrid } from "../components/MovieGrid";
import { Link } from "react-router-dom";


export function FavoritePage() {
    const { favorites } = useFavoritesStore();
    if (favorites.length === 0) {
        return (
            <div>
                <div>
                    <h2>즐겨 찾는 영화가 없습니다</h2>
                    <Link to="/">영화 목록</Link>
                </div>
            </div>
        );
    }
    return (
        <div className="max-w-screen-xl mx-auto px-10 py-10 mt-16">
            <h1 className="text-3xl font-bold text-center mb-8">
                즐겨찾기한 영화
            </h1>
            <MovieGrid movies={favorites} />
        </div>
    );
}
