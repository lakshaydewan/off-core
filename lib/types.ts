import type { OFFProduct, Nutriments } from "@off/ui";
export type { OFFProduct, Nutriments };

export interface NutrimentValue {
  value: number;
  unit: string;
  per100g?: number;
  perServing?: number;
}

export interface OFFApiResponse {
  status: number;
  status_verbose: string;
  product?: OFFProduct;
}

export interface OFFSearchResponse {
  count: number;
  page: number;
  page_size: number;
  products: OFFProduct[];
}

export interface CuratedProduct {
  barcode: string;
  displayName: string;
  category: string;
}
