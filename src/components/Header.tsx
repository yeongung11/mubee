export function Header() {
    return (
        <div className="flex flex col justify-between mt-5">
            <h1 className="ml-3">Mubee</h1>
            <input
                className="border-amber-700"
                type="text"
                placeholder="영화 검색"
            />
            <p className="mr-3">프로필</p>
        </div>
    );
}
