"use client";

import { usePluginContext } from "@/lib/plugin-context";
import { getPlugin } from "@/lib/plugin-registry";
import { ProductsPage } from "@off/ui";

export function ProductsPageContent() {
  const { pluginId, hydrated } = usePluginContext();

  if (!hydrated) return null;

  const plugin = getPlugin(pluginId);
  if (plugin?.PageOverride) return <plugin.PageOverride />;

  return (
    <ProductsPage
      heading="Browse"
      countryTag="Canada"
      subtitle="Open Food Facts"
    />
  );
}
