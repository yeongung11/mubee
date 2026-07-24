// import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SearchInput } from "./SearchInput";

interface HeaderProps {
    className?: string;
}

export function Header({ className }: HeaderProps) {
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

    return (
        <>
            {/* 데스크탑 */}
            <div
                className={`hidden lg:flex items-center justify-around gap-3 px-4 py-4 lg:px-12 ${
                    className ?? ""
                }`}
            >
                <div className="flex items-center gap-4 md:gap-6 flex-wrap">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-mubee-burgundy tracking-widest border-b-2 border-mubee-burgundy/40 pb-0.5"
                    >
                        Mubee
                    </Link>
                    <Link
                        to="/"
                        className="text-sm hover:text-mubee-burgundy transition"
                    >
                        홈
                    </Link>
                    <Link
                        to="/genre"
                        className="text-sm hover:text-mubee-burgundy transition"
                    >
                        카테고리
                    </Link>
                    <Link
                        to="/favorites"
                        className="text-sm hover:text-mubee-burgundy transition whitespace-nowrap"
                    >
                        찜한 영화
                    </Link>
                </div>
                <div className="relative w-full lg:max-w-md">
                    <SearchInput
                        position="top"
                        inputClassName="w-full bg-black-1600 text-black text-sm px-4 py-2 rounded-full outline-none border border-gray-300 focus:border-mubee-burgundy transition placeholder-black-100"
                    />
                </div>
            </div>

            {/* 모바일 */}
            <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white lg:hidden">
                <div className="flex items-center">
                    <Link
                        to="/"
                        onClick={() => setMobileSearchOpen(false)}
                        className="flex-1 text-center text-sm py-3 hover:text-mubee-burgundy transition text-gray-700"
                    >
                        홈
                    </Link>
                    <Link
                        to="/genre"
                        onClick={() => setMobileSearchOpen(false)}
                        className="flex-1 text-center text-sm py-3 hover:text-mubee-burgundy transition text-gray-700"
                    >
                        카테고리
                    </Link>
                    <Link
                        to="/favorites"
                        onClick={() => setMobileSearchOpen(false)}
                        className="flex-1 text-center text-sm py-3 hover:text-mubee-burgundy transition text-gray-700"
                    >
                        찜한 영화
                    </Link>
                    <button
                        className="flex-1 text-center text-sm py-3 text-gray-700"
                        onClick={() => setMobileSearchOpen((prev) => !prev)}
                    >
                        검색
                    </button>
                </div>
                {mobileSearchOpen && (
                    <div className="px-4 py-3 border-t border-gray-200 bg-white">
                        <SearchInput
                            autoFocus
                            position="bottom"
                            onSelect={() => setMobileSearchOpen(false)}
                            inputClassName="w-full bg-gray-50 text-gray-900 text-sm px-4 py-2 rounded-full outline-none border border-gray-300 focus:border-mubee-burgundy transition placeholder-gray-400"
                        />
                    </div>
                )}
            </nav>
        </>
    );
}
