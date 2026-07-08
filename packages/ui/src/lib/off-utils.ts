import type { OFFProduct } from "./off-types";

export const NUTRISCORE_ORDER: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, e: 4 };

export function getProductName(product: OFFProduct): string {
  return product.product_name_en || product.product_name || "Unknown Product";
}

const GRADE_BADGE: Record<string, string> = {
  a: "bg-green-600 text-white",
  b: "bg-lime-500 text-white",
  c: "bg-yellow-400 text-gray-800",
  d: "bg-orange-500 text-white",
  e: "bg-red-500 text-white",
};
const GRADE_BADGE_MISSING = "bg-zinc-100 text-zinc-400";

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
