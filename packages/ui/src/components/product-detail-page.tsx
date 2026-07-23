"use client";

import { useEffect, useState } from "react";
import { SectionCard } from "./section-card";
import { ProductHero } from "./product-hero";
import { ProductNutrition } from "./product-nutrition";
import { ProductIngredients } from "./product-ingredients";
import { fetchProductByBarcode } from "../lib/off-utils";
import type { OFFProduct } from "../lib/off-types";

export interface ProductDetailPageProps {
  /**
   * Pass an already-resolved product for controlled mode — e.g. a Next.js
   * server component that fetched the product itself (with its own ISR/SSG).
   * Takes priority over `barcode`.
   */
  product?: OFFProduct;

  /**
   * Or pass a barcode and let the component self-fetch client-side against
   * the Open Food Facts API. Ignored when `product` is provided.
   */
  barcode?: string;

  /**
   * Override the self-fetch. Receives the barcode; should resolve to the
   * product or null (not found). Defaults to the Open Food Facts API.
   */
  fetchFn?: (barcode: string) => Promise<OFFProduct | null>;

  // ── Section toggles ─────────────────────────────────────────────────────
  /** Show the nutrition section. Defaults to true. */
  showNutrition?: boolean;
  /** Show the ingredients section. Defaults to true. */
  showIngredients?: boolean;
  /** Show the barcode/attribution footer. Defaults to true. */
  showAttribution?: boolean;

  // ── Full overrides ───────────────────────────────────────────────────────
  renderHero?: (product: OFFProduct) => React.ReactNode;
  renderNutrition?: (product: OFFProduct) => React.ReactNode;
  renderIngredients?: (product: OFFProduct) => React.ReactNode;

  /**
   * Rendered after Ingredients, before the attribution footer. This is the
   * hook for plugin-specific content — e.g. a "fits your macros" card —
   * without needing to fork the whole page. Wrap it in `SectionCard` to
   * match the surrounding visual rhythm.
   */
  extraSections?: (product: OFFProduct) => React.ReactNode;

  // ── Footer / navigation ──────────────────────────────────────────────────
  /** Href for the "back to products" link. Defaults to "/products". */
  backHref?: string;
  /** Label for the back link. Defaults to "Back to all products". */
  backLabel?: string;

  // ── States ───────────────────────────────────────────────────────────────
  /** Rendered while self-fetching. Defaults to a skeleton matching the layout. */
  loadingSlot?: React.ReactNode;
  /** Rendered when the product can't be found. */
  notFoundSlot?: React.ReactNode;
}

function DefaultSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div className="w-full md:w-72 md:shrink-0 aspect-square rounded-2xl bg-muted" />
          <div className="flex-1 space-y-4 w-full">
            <div className="h-3 w-24 bg-muted rounded" />
            <div className="h-8 w-2/3 bg-muted rounded" />
            <div className="h-4 w-1/3 bg-muted rounded" />
            <div className="h-20 w-full bg-muted rounded-xl" />
          </div>
        </div>
      </div>
      <div className="h-40 rounded-2xl bg-muted" />
      <div className="h-40 rounded-2xl bg-muted" />
    </div>
  );
}

function DefaultNotFound({ backHref, backLabel }: { backHref: string; backLabel: string }) {
  return (
    <div className="text-center py-20 space-y-3">
      <p className="text-muted-foreground font-medium">Product not found</p>
      <p className="text-sm text-muted-foreground">Check the barcode and try again.</p>
      <a
        href={backHref}
        className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors inline-block"
      >
        {backLabel}
      </a>
    </div>
  );
}

export function ProductDetailPage({
  product,
  barcode,
  fetchFn,
  showNutrition = true,
  showIngredients = true,
  showAttribution = true,
  renderHero,
  renderNutrition,
  renderIngredients,
  extraSections,
  backHref = "/products",
  backLabel = "Back to all products",
  loadingSlot,
  notFoundSlot,
}: ProductDetailPageProps) {
  const isSelfFetching = product === undefined;

  // undefined = loading, null = not found, OFFProduct = resolved
  const [fetchedProduct, setFetchedProduct] = useState<OFFProduct | null | undefined>(
    isSelfFetching ? undefined : product
  );

  useEffect(() => {
    if (!isSelfFetching) {
      setFetchedProduct(product);
      return;
    }
    if (!barcode) {
      setFetchedProduct(null);
      return;
    }

    let cancelled = false;
    setFetchedProduct(undefined);
    const fn = fetchFn ?? fetchProductByBarcode;
    fn(barcode).then((result) => {
      if (!cancelled) setFetchedProduct(result);
    });

    return () => {
      cancelled = true;
    };
  }, [isSelfFetching, product, barcode, fetchFn]); // eslint-disable-line react-hooks/exhaustive-deps

  if (fetchedProduct === undefined) {
    return <>{loadingSlot ?? <DefaultSkeleton />}</>;
  }

  if (fetchedProduct === null) {
    return <>{notFoundSlot ?? <DefaultNotFound backHref={backHref} backLabel={backLabel} />}</>;
  }

  const resolvedProduct = fetchedProduct;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-6">
        {renderHero ? renderHero(resolvedProduct) : <ProductHero product={resolvedProduct} />}
      </div>

      {showNutrition && (
        <SectionCard label="Nutrition">
          {renderNutrition ? renderNutrition(resolvedProduct) : <ProductNutrition product={resolvedProduct} />}
        </SectionCard>
      )}

      {showIngredients && (
        <SectionCard label="Ingredients">
          {renderIngredients ? renderIngredients(resolvedProduct) : <ProductIngredients product={resolvedProduct} />}
        </SectionCard>
      )}

      {extraSections?.(resolvedProduct)}

      {showAttribution && (
        <div className="pt-2 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              Barcode: <span className="font-mono font-medium text-foreground">{resolvedProduct.code}</span>
            </p>
            <p>
              Data from{" "}
              <a
                href={`https://world.openfoodfacts.org/product/${resolvedProduct.code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                Open Food Facts ↗
              </a>{" "}
              · ODbL license
            </p>
          </div>
          <a href={backHref} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← {backLabel}
          </a>
        </div>
      )}
    </div>
  );
}
