interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    return (
        <div
            className={`flex flex col justify-between mt-5 ${className || ""}`}
        >
            <h1 className="ml-3">Mubee</h1>
            <input
                className="border-amber-700 backdrop-blur bg-black/30 text-center text-xl"
                type="text"
                placeholder="배우, 영화, 장르 검색"
            />
            <p className="mr-3">프로필</p>
        </div>
    );
}
