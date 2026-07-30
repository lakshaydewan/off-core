import { CompareProductsPageOverride } from "./page-override";
import type { Plugin } from "@/lib/plugin-types";

export const compareProductsPlugin: Plugin = {
  id: "compare-products",
  name: "Compare Products",
  description: "Pick 2-4 products and compare Nutri-Score, NOVA, Eco-Score, and nutrition side by side.",
  PageOverride: CompareProductsPageOverride,
};
