import { gymPlugin } from "./plugins/gym";
import { nlSearchPlugin } from "./plugins/nl-search";
import { compareProductsPlugin } from "./plugins/compare-products";
import type { Plugin } from "./plugin-types";

export const ALL_PLUGINS: Plugin[] = [gymPlugin, nlSearchPlugin, compareProductsPlugin];

export function getPlugin(id: string | null): Plugin | null {
  if (!id) return null;
  return ALL_PLUGINS.find((p) => p.id === id) ?? null;
}
