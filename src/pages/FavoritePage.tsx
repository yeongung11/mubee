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
        <div>
            <h1>즐겨찾기한 영화</h1>
            <MovieGrid movies={favorites} />
        </div>
    );
}
