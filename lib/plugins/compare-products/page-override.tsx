"use client";

export function CompareProductsPageOverride() {
  const src =
    process.env.NEXT_PUBLIC_COMPARE_PRODUCTS_PLUGIN_URL ??
    "https://compare-products-plugin.vercel.app";
  return (
    <iframe
      src={src}
      className="w-full border-0"
      style={{ height: "calc(100vh - 56px)" }}
      title="Compare Products"
    />
  );
}
