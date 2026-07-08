"use client";

import { useState, useMemo, useEffect, useRef, Fragment } from "react";
import { PageHeader } from "./page-header";
import { ProductsToolbar } from "./products-toolbar";
import { ProductCard } from "./product-card";
import { getBroadCategory, getProductName, NUTRISCORE_ORDER } from "../lib/off-utils";
import type { OFFProduct } from "../lib/off-types";
import type { SortKey } from "./products-toolbar";

const DEFAULT_FIELDS = [
  "code", "product_name", "product_name_en", "brands",
  "categories_tags", "image_front_url",
  "nutriscore_grade", "ecoscore_grade", "nova_group",
  "nutriments",
].join(",");

// v3 /search is not a valid route on world.openfoodfacts.org (returns 400) —
// v2 is the correct REST search endpoint for facet-filtered browsing.
const OFF_API_BASE = "https://world.openfoodfacts.org/api/v2";

const DEFAULT_FETCH_URL =
  `${OFF_API_BASE}/search?countries_tags=en:canada&page_size=50&sort_by=unique_scans_n&fields=${DEFAULT_FIELDS}`;

// Survives plugin switches — cleared on explicit retry
let _catalogCache: { url: string; products: OFFProduct[] } | null = null;

function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white shadow-sm overflow-hidden animate-pulse">
      <div className="aspect-square bg-zinc-100" />
      <div className="h-[104px] px-3 pt-2.5 pb-3 flex flex-col">
        <div className="space-y-1.5">
          <div className="h-3.5 bg-zinc-100 rounded w-4/5" />
          <div className="h-3.5 bg-zinc-100 rounded w-3/5" />
        </div>
        <div className="mt-auto flex gap-1.5">
          <div className="flex-1 h-6 bg-zinc-100 rounded-lg" />
          <div className="flex-1 h-6 bg-zinc-100 rounded-lg" />
          <div className="flex-1 h-6 bg-zinc-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export interface ProductsPageProps {
  /**
   * The product catalog to browse in non-search mode.
   * When omitted, ProductsPage fetches the default OFF Canada catalog
   * automatically — no extra code needed.
   * Pass `[]` explicitly to suppress the default fetch (e.g. search-only UIs).
   */
  products?: OFFProduct[];

  // ── Header ───────────────────────────────────────────────────────────
  heading?: string;
  countryTag?: string;
  subtitle?: string;

  // ── Search ───────────────────────────────────────────────────────────
  /**
   * Override the search function. Receives the raw query string; should
   * return a promise that resolves to matching OFFProduct[].
   * Defaults to the Open Food Facts text-search API.
   */
  searchFn?: (query: string) => Promise<OFFProduct[]>;

  /** Pre-fill the search bar with this query on mount. */
  initialQuery?: string;

  /**
   * When false, the product grid is hidden until the user types a search
   * query (useful for search-only UIs). Defaults to true.
   */
  showResultsOnMount?: boolean;

  // ── Toolbar ──────────────────────────────────────────────────────────
  /** Show the category filter pills in browse mode. Defaults to true. */
  showCategories?: boolean;

  /** Show the sort dropdown. Defaults to true. */
  showSort?: boolean;

  /**
   * Tailwind top-* class for the sticky toolbar position.
   * Defaults to "top-14" (below a 56px nav).
   */
  stickyTop?: string;

  // ── Card rendering ───────────────────────────────────────────────────
  /**
   * Completely replaces the default ProductCard.
   * The function receives the product and its index.
   */
  renderCard?: (product: OFFProduct, index: number) => React.ReactNode;

  /**
   * Override the link href for each default ProductCard.
   * Defaults to `/products/${product.code}`.
   */
  cardHref?: (product: OFFProduct) => string;

  // ── Slots ─────────────────────────────────────────────────────────────
  /**
   * Rendered in place of the grid when showResultsOnMount=false and no
   * search has been entered yet. Receives a `setQuery` function so you
   * can wire up suggestion chips.
   */
  idleSlot?: (setQuery: (q: string) => void) => React.ReactNode;
}

export function ProductsPage({
  products,
  heading = "Browse",
  countryTag,
  subtitle,
  searchFn,
  initialQuery = "",
  showResultsOnMount = true,
  showCategories = true,
  showSort = true,
  stickyTop = "top-14",
  renderCard,
  cardHref,
  idleSlot,
}: ProductsPageProps) {
  const isSelfFetching = products === undefined;

  // Seed from cache so remounts after plugin switches are instant
  const [fetchedProducts, setFetchedProducts] = useState<OFFProduct[] | null>(() => {
    if (!isSelfFetching) return products ?? [];
    if (_catalogCache?.url === DEFAULT_FETCH_URL) return _catalogCache.products;
    return null;
  });
  const [fetchError, setFetchError] = useState(false);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    if (!isSelfFetching) return;
    // Cache hit on initial mount — state was already seeded, nothing to fetch
    if (fetchKey === 0 && _catalogCache?.url === DEFAULT_FETCH_URL) return;

    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    setFetchError(false);

    fetch(DEFAULT_FETCH_URL, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const list = (data.products ?? []).filter(
          (p: OFFProduct) => !!(p.product_name || p.product_name_en)
        );
        _catalogCache = { url: DEFAULT_FETCH_URL, products: list };
        setFetchedProducts(list);
      })
      .catch(() => {
        if (cancelled) return;
        setFetchError(true);
        setFetchedProducts([]);
      })
      .finally(() => clearTimeout(timer));

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [isSelfFetching, fetchKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync when caller swaps the products prop (non-self-fetching mode)
  useEffect(() => {
    if (!isSelfFetching) setFetchedProducts(products ?? []);
  }, [products, isSelfFetching]);

  const effectiveProducts = fetchedProducts ?? [];
  const isLoadingCatalog = isSelfFetching && fetchedProducts === null;

  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState<SortKey>("default");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<OFFProduct[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestQueryRef = useRef("");

  const isSearchMode = searchQuery.trim().length > 0;
  const isBarcode = /^\d{8,14}$/.test(searchQuery.trim());

  useEffect(() => {
    const trimmed = searchQuery.trim();
    latestQueryRef.current = trimmed;

    if (timerRef.current) clearTimeout(timerRef.current);

    if (!trimmed) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    timerRef.current = setTimeout(async () => {
      const fn = searchFn ?? defaultSearchFn;
      const results = await fn(trimmed);
      if (latestQueryRef.current === trimmed) {
        setSearchResults(results);
        setIsSearching(false);
      }
    }, 420);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [searchQuery, searchFn]);

  const autoCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of effectiveProducts) {
      const cat = getBroadCategory(p);
      if (cat !== "Other") counts[cat] = (counts[cat] ?? 0) + 1;
    }
    const top = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([k]) => k);
    return ["All", ...top];
  }, [effectiveProducts]);

  const categories = autoCategories;

  const sourceProducts = isSearchMode ? (searchResults ?? []) : effectiveProducts;

  const filtered = useMemo(() => {
    if (isSearchMode || activeCategory === "All") return sourceProducts;
    return sourceProducts.filter((p) => getBroadCategory(p) === activeCategory);
  }, [sourceProducts, activeCategory, isSearchMode]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "name":
          return getProductName(a).localeCompare(getProductName(b));
        case "nutriscore": {
          const ga = NUTRISCORE_ORDER[a.nutriscore_grade?.toLowerCase() ?? ""] ?? 99;
          const gb = NUTRISCORE_ORDER[b.nutriscore_grade?.toLowerCase() ?? ""] ?? 99;
          return ga - gb;
        }
        case "calories": {
          const ca = a.nutriments?.energy_kcal_100g ?? Infinity;
          const cb = b.nutriments?.energy_kcal_100g ?? Infinity;
          return ca - cb;
        }
        default:
          return 0;
      }
    });
  }, [filtered, sort]);

  const isIdle = !showResultsOnMount && !isSearchMode;
  const totalCount = isSearchMode ? (searchResults?.length ?? 0) : effectiveProducts.length;

  function retry() {
    _catalogCache = null;
    setFetchedProducts(null);
    setFetchError(false);
    setFetchKey((k) => k + 1);
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <PageHeader heading={heading} countryTag={countryTag} subtitle={subtitle} />

      <ProductsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearching={isSearching}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sort={sort}
        onSortChange={setSort}
        isSearchMode={isSearchMode}
        isBarcode={isBarcode}
        resultCount={sorted.length}
        totalCount={totalCount}
        stickyTop={stickyTop}
        showCategories={showCategories}
        showSort={showSort}
      />

      {isIdle ? (
        idleSlot ? idleSlot(setSearchQuery) : null
      ) : isLoadingCatalog || isSearching ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : sorted.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sorted.map((product, i) =>
            renderCard ? (
              <Fragment key={product.code}>{renderCard(product, i)}</Fragment>
            ) : (
              <ProductCard
                key={product.code}
                product={product}
                cardHref={cardHref}
              />
            )
          )}
        </div>
      ) : (
        <div className="text-center py-20 space-y-3">
          {isSearchMode ? (
            <>
              <p className="text-zinc-500 font-medium">No results found</p>
              <p className="text-sm text-zinc-400">Try a different name or check the barcode</p>
            </>
          ) : fetchError ? (
            <>
              <p className="text-zinc-500 font-medium">Could not load products</p>
              <p className="text-sm text-zinc-400">Check your connection or try again.</p>
              <button
                onClick={retry}
                className="text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors"
              >
                Retry
              </button>
            </>
          ) : effectiveProducts.length === 0 ? (
            <>
              <p className="text-zinc-500 font-medium">No products found</p>
              <p className="text-sm text-zinc-400">The catalog appears to be empty.</p>
            </>
          ) : (
            <>
              <p className="text-zinc-500 font-medium">No products in {activeCategory}</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors"
              >
                Clear filter
              </button>
            </>
          )}
        </div>
      )}
    </main>
  );
}

async function defaultSearchFn(query: string): Promise<OFFProduct[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const isBarcode = /^\d{8,14}$/.test(query);
    if (isBarcode) {
      const res = await fetch(
        `${OFF_API_BASE}/product/${encodeURIComponent(query)}.json`,
        { signal: controller.signal }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return data.status === 1 && data.product ? [data.product as OFFProduct] : [];
    }
    // v2 /search only handles facet filtering, not free-text search_terms —
    // cgi/search.pl is the endpoint that actually performs full-text search.
    const params = new URLSearchParams({
      action: "process",
      json: "1",
      search_terms: query,
      page_size: "24",
      fields: DEFAULT_FIELDS,
    });
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`,
      { signal: controller.signal }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products ?? []) as OFFProduct[];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}
