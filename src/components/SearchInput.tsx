import { SearchResultList } from "./SearchResultList";
import { RecentDropDown } from "./RecentDropdown";
import { useSearch } from "../hooks/useSearch";

interface SearchInputProps {
    autoFocus?: boolean;
    position: "top" | "bottom";
    onSelect?: () => void;
    inputClassName?: string;
}

export function SearchInput({
    autoFocus,
    position,
    onSelect,
    inputClassName,
}: SearchInputProps) {
    const {
        searchQuery,
        setSearchQuery,
        searchResults,
        isLoading,

        setIsFocused,
        recentSearches,
        handleSearch,
        handleNavigateSearch,
        handleRecentSelect,
        handleRecentDelete,
        clearRecentSearches,
        showRecentDropdown,
    } = useSearch();

    return (
        <div className="relative w-full">
            <input
                autoFocus={autoFocus}
                className={inputClassName}
                type="text"
                placeholder="영화 검색"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                        handleNavigateSearch(searchQuery.trim());
                        onSelect?.();
                    }
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
            />
            {isLoading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm animate-spin">
                    ⏳
                </span>
            )}
            {searchResults.length > 0 && (
                <SearchResultList
                    results={searchResults}
                    position={position}
                    onSelect={onSelect}
                />
            )}
            {showRecentDropdown && (
                <RecentDropDown
                    position={position}
                    recentSearches={recentSearches}
                    onSelect={handleRecentSelect}
                    onDelete={handleRecentDelete}
                    onClearAll={clearRecentSearches}
                />
            )}
        </div>
    );
}
