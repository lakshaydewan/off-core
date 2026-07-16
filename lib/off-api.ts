import type { OFFApiResponse, OFFProduct, OFFSearchResponse, CuratedProduct } from "./types";

const BASE_URL = "https://world.openfoodfacts.org/api/v2";

export async function fetchProduct(barcode: string): Promise<OFFProduct | null> {
  try {
    const res = await fetch(`${BASE_URL}/product/${barcode}.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: OFFApiResponse = await res.json();
    if (data.status !== 1 || !data.product) return null;
    return data.product;
  } catch {
    return null;
  }
}

export const CURATED_PRODUCTS: CuratedProduct[] = [
  { barcode: "0096619872831", displayName: "Kirkland Peanut Butter", category: "Nut Butter" },
  { barcode: "0722252100061", displayName: "Clif Bar (Chocolate Chip)", category: "Protein Bar" },
  { barcode: "0016000275287", displayName: "Cheerios", category: "Breakfast Cereal" },
  { barcode: "049000028928", displayName: "Coca-Cola Classic", category: "Soft Drink" },
  { barcode: "0056800370933", displayName: "Activia Strawberry Yogurt", category: "Yogurt" },
];

export function getNutriScoreTextColor(grade?: string): string {
  const colors: Record<string, string> = {
    a: "text-green-600",
    b: "text-lime-600",
    c: "text-yellow-600",
    d: "text-orange-600",
    e: "text-red-600",
  };
  return colors[grade?.toLowerCase() ?? ""] ?? "text-gray-500";
}

export async function searchProducts(query: string): Promise<OFFProduct[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const isBarcode = /^\d{8,14}$/.test(trimmed);

  if (isBarcode) {
    try {
      const res = await fetch(`${BASE_URL}/product/${trimmed}.json`);
      if (!res.ok) return [];
      const data: OFFApiResponse = await res.json();
      if (data.status !== 1 || !data.product) return [];
      return [data.product];
    } catch {
      return [];
    }
  }

  try {
    // /cgi/search.pl is the correct full-text search endpoint.
    // The v2 /search endpoint only handles facet filtering, not search_terms.
    const params = new URLSearchParams({
      action: "process",
      json: "1",
      search_terms: trimmed,
      page_size: "24",
      sort_by: "unique_scans_n",
      fields: SEARCH_FIELDS,
    });
    const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`);
    if (!res.ok) return [];
    const data: OFFSearchResponse = await res.json();
    return (data.products ?? []).filter((p) => !!(p.product_name || p.product_name_en));
  } catch {
    return [];
  }
}

const SEARCH_FIELDS = [
  "code", "product_name", "product_name_en", "brands",
  "categories_tags", "image_front_url", "image_front_small_url",
  "nutriscore_grade", "ecoscore_grade", "nova_group", "nutriments",
  "allergens_tags", "labels_tags", "quantity",
].join(",");

export async function fetchProducts(count: number = 50): Promise<OFFProduct[]> {
  try {
    const url = `https://world.openfoodfacts.org/api/v2/search?countries_tags=en:canada&page_size=${count}&sort_by=unique_scans_n&fields=${SEARCH_FIELDS}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data: OFFSearchResponse = await res.json();
    return (data.products ?? []).filter((p) => !!(p.product_name || p.product_name_en));
  } catch {
    return [];
  }
}
