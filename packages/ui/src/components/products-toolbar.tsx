"use client";

import { useRef } from "react";
import { cn } from "../utils";

export type SortKey = "default" | "name" | "nutriscore" | "calories";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export interface ProductsToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isSearching: boolean;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  isSearchMode: boolean;
  isBarcode: boolean;
  resultCount: number;
  totalCount: number;
  /** Tailwind top-* class for the sticky position. Defaults to "top-14" (below a 56px nav). */
  stickyTop?: string;
  /** Show the category filter pills in browse mode. Defaults to true. */
  showCategories?: boolean;
  /** Show the sort dropdown. Defaults to true. */
  showSort?: boolean;
}

export function ProductsToolbar({
  searchQuery,
  onSearchChange,
  isSearching,
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  isSearchMode,
  isBarcode,
  resultCount,
  totalCount,
  stickyTop = "top-14",
  showCategories = true,
  showSort = true,
}: ProductsToolbarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const sortControl = (
    <div className="relative shrink-0">
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortKey)}
        className="appearance-none bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700 text-xs font-medium pl-3 pr-6 py-1.5 rounded-full cursor-pointer focus:outline-none transition-colors"
      >
        <option value="default">Popular</option>
        <option value="name">A – Z</option>
        <option value="nutriscore">Nutri-Score</option>
        <option value="calories">Calories</option>
      </select>
      <ChevronIcon className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400 pointer-events-none" />
    </div>
  );

  return (
    <div className={`sticky ${stickyTop} z-20 bg-zinc-50 pt-2 pb-4 space-y-3 -mx-4 px-4 sm:-mx-6 sm:px-6`}>

      {/* Search bar */}
      <div className="relative">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or barcode…"
          className="w-full h-10 bg-white rounded-xl border border-zinc-200 pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FFA551]/20 focus:border-[#FFA551]/50 transition-colors shadow-sm"
        />
        {isSearching ? (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-zinc-200 border-t-[#FFA551] animate-spin" />
        ) : searchQuery ? (
          <button
            onClick={() => { onSearchChange(""); inputRef.current?.focus(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-zinc-200 hover:bg-zinc-300 transition-colors"
          >
            <XIcon className="w-3 h-3 text-zinc-600" />
          </button>
        ) : null}
      </div>

      {/* Filter pills OR search result context */}
      {isSearchMode ? (
        (showSort || !isSearching) && (
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-zinc-500">
              {isSearching
                ? "Searching…"
                : isBarcode
                  ? (resultCount === 0 ? `No product found for barcode ${searchQuery.trim()}` : "Barcode result")
                  : `${resultCount} result${resultCount !== 1 ? "s" : ""} for "${searchQuery}"`}
            </p>
            {showSort && sortControl}
          </div>
        )
      ) : (showCategories || showSort) ? (
        <div className="flex items-center gap-3">
          {showCategories && (
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none flex-1 min-w-0 pb-0.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={cn(
                    "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
                    activeCategory === cat
                      ? "bg-[#FFA551] text-white shadow-sm"
                      : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          {showSort && sortControl}
        </div>
      ) : null}

      {/* Divider + count */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-zinc-200" />
        {!isSearchMode && (
          <p className="text-[11px] text-zinc-400 shrink-0">
            {resultCount === totalCount
              ? `${totalCount} products`
              : `${resultCount} of ${totalCount}`}
          </p>
        )}
      </div>

    </div>
  );
}
