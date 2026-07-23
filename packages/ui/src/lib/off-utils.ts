import type { OFFProduct } from "./off-types";

export const NUTRISCORE_ORDER: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, e: 4 };

const OFF_API_BASE = "https://world.openfoodfacts.org/api/v2";

export function getProductName(product: OFFProduct): string {
  return product.product_name_en || product.product_name || "Unknown Product";
}

export function getBrand(product: OFFProduct): string {
  if (!product.brands) return "";
  return product.brands.split(",")[0].trim();
}

export function getCategory(product: OFFProduct): string {
  if (!product.categories_tags || product.categories_tags.length === 0) {
    return product.categories ?? "";
  }
  const tag = product.categories_tags[product.categories_tags.length - 1];
  return tag.replace(/^en:/, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function extractLabels(product: OFFProduct): string[] {
  if (!product.labels_tags) return [];
  return product.labels_tags
    .map((tag) => tag.replace("en:", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .slice(0, 6);
}

export function extractAllergens(product: OFFProduct): string[] {
  if (!product.allergens_tags) return [];
  return product.allergens_tags.map((tag) =>
    tag.replace("en:", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function extractAdditives(product: OFFProduct): string[] {
  if (!product.additives_tags) return [];
  return product.additives_tags.map((tag) => tag.replace("en:", "").toUpperCase());
}

const NUTRISCORE_SOLID: Record<string, string> = {
  a: "bg-green-500",
  b: "bg-lime-400",
  c: "bg-yellow-400",
  d: "bg-orange-400",
  e: "bg-red-500",
};

export function getNutriScoreColor(grade?: string): string {
  return NUTRISCORE_SOLID[grade?.toLowerCase() ?? ""] ?? "bg-gray-300";
}

const NUTRISCORE_TEXT: Record<string, string> = {
  a: "text-green-600",
  b: "text-lime-600",
  c: "text-yellow-600",
  d: "text-orange-600",
  e: "text-red-600",
};

export function getNutriScoreTextColor(grade?: string): string {
  return NUTRISCORE_TEXT[grade?.toLowerCase() ?? ""] ?? "text-gray-500";
}

// Client-safe fetch (no Next-specific caching options) — mirrors the fetch
// pattern ProductsPage already uses for its self-fetching catalog mode, so
// this can be called from either a client component or a plain browser fetch.
// Only successful lookups are cached — a transient failure or genuine
// "not found" is retried on the next call instead of being stuck forever.
const _productCache = new Map<string, OFFProduct>();

export async function fetchProductByBarcode(barcode: string): Promise<OFFProduct | null> {
  const cached = _productCache.get(barcode);
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${OFF_API_BASE}/product/${encodeURIComponent(barcode)}.json`, {
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    const product = data.product as OFFProduct;
    _productCache.set(barcode, product);
    return product;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const GRADE_BADGE: Record<string, string> = {
  a: "bg-green-600 text-white",
  b: "bg-lime-500 text-white",
  c: "bg-yellow-400 text-gray-800",
  d: "bg-orange-500 text-white",
  e: "bg-red-500 text-white",
};
const GRADE_BADGE_MISSING = "bg-muted text-muted-foreground";

export function getNutriScorePillStyle(grade?: string): string {
  return GRADE_BADGE[grade?.toLowerCase() ?? ""] ?? GRADE_BADGE_MISSING;
}

export function getEcoScoreBadgeStyle(grade?: string): string {
  const g = grade?.toLowerCase().replace("a-plus", "a") ?? "";
  return GRADE_BADGE[g] ?? GRADE_BADGE_MISSING;
}

export function getNovaBadgeStyle(nova?: number): string {
  const styles: Record<number, string> = {
    1: "bg-green-600 text-white",
    2: "bg-lime-500 text-white",
    3: "bg-yellow-400 text-gray-800",
    4: "bg-red-500 text-white",
  };
  return nova != null ? (styles[nova] ?? GRADE_BADGE_MISSING) : GRADE_BADGE_MISSING;
}

const BROAD_CATEGORY_PATTERNS: [RegExp, string][] = [
  [/beverages|soft-drinks|sodas|juices|waters|water|drinks|coffee|tea|energy-drinks|smoothies|milkshakes/, "Beverages"],
  [/dairy|milks|cheeses|yogurts|butter|creams|kefir|fromage/, "Dairy"],
  [/cereals|breakfasts|granola|oatmeal|porridge|muesli/, "Cereals"],
  [/protein-bars|energy-bars|granola-bars|cereal-bars|nutrition-bars/, "Bars"],
  [/snacks|chips|crisps|crackers|popcorn|pretzels|puffed/, "Snacks"],
  [/chocolates|candies|sweets|confectioneries|biscuits|cookies|cakes|pastries|desserts|ice-creams/, "Sweets"],
  [/breads|pastas|rice|grains|flours|noodles|tortillas|wraps|flatbreads/, "Grains"],
  [/condiments|sauces|dressings|spreads|dips|mustards|ketchups|mayonnaise|jams|nut-butters|peanut-butter/, "Condiments"],
  [/meats|fishes|seafoods|poultries|chicken|beef|pork|salmon|tuna/, "Meat & Fish"],
  [/fruits|vegetables|produce|salads|legumes|beans/, "Produce"],
  [/frozen/, "Frozen"],
  [/nuts|seeds|trail-mix/, "Nuts & Seeds"],
  [/supplements|protein-powders|vitamins/, "Supplements"],
];

export function getBroadCategory(product: OFFProduct): string {
  const tags = (product.categories_tags ?? []).join(" ");
  if (!tags) return "Other";
  for (const [pattern, label] of BROAD_CATEGORY_PATTERNS) {
    if (pattern.test(tags)) return label;
  }
  return "Other";
}
