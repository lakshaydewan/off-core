import { Badge } from "./badge";
import {
  getNutriScoreColor,
  extractLabels,
  getProductName,
  getBrand,
  getCategory,
} from "../lib/off-utils";
import type { OFFProduct } from "../lib/off-types";

export interface ProductHeroProps {
  product: OFFProduct;
}

const NOVA_LABELS: Record<number, { label: string; color: string; desc: string }> = {
  1: { label: "Unprocessed", color: "bg-green-100 text-green-800", desc: "Minimal processing" },
  2: { label: "Culinary Ingredient", color: "bg-lime-100 text-lime-800", desc: "Basic culinary ingredient" },
  3: { label: "Processed", color: "bg-yellow-100 text-yellow-800", desc: "Added salt, sugar, or fat" },
  4: { label: "Ultra-Processed", color: "bg-red-100 text-red-800", desc: "Industrial additives" },
};

const NUTRI_DESCRIPTIONS: Record<string, string> = {
  a: "Excellent nutritional quality",
  b: "Good nutritional quality",
  c: "Average nutritional quality",
  d: "Poor nutritional quality",
  e: "Bad nutritional quality — high in fat, sugar, or salt",
};

const ECO_DESCRIPTIONS: Record<string, string> = {
  a: "Very low environmental impact",
  b: "Low environmental impact",
  c: "Moderate environmental impact",
  d: "High environmental impact",
  e: "Very high environmental impact",
};

export function ProductHero({ product }: ProductHeroProps) {
  const name = getProductName(product);
  const brand = getBrand(product);
  const category = getCategory(product);
  const labels = extractLabels(product);
  const VALID_GRADES = new Set(["a", "b", "c", "d", "e"]);
  const rawNutri = product.nutriscore_grade?.toLowerCase() ?? "";
  const rawEco   = product.ecoscore_grade?.toLowerCase().replace("a-plus", "a") ?? "";

  const grade   = VALID_GRADES.has(rawNutri) ? rawNutri : null;
  const ecoGrade = VALID_GRADES.has(rawEco) ? rawEco : null;
  const nova    = typeof product.nova_group === "number" &&
                  product.nova_group >= 1 &&
                  product.nova_group <= 4
                  ? product.nova_group : null;
  const imageUrl = product.image_front_url || product.image_url;

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
      {/* Product image */}
      <div className="relative w-full md:w-72 md:shrink-0">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-contain p-6"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>
        {product.quantity && (
          <p className="text-xs text-muted-foreground text-center mt-2">{product.quantity}</p>
        )}
      </div>

      {/* Product info */}
      <div className="flex-1 space-y-4">
        {brand && (
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{brand}</p>
        )}
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight tracking-tight">{name}</h1>
        {category && (
          <p className="text-base text-muted-foreground">{category}</p>
        )}

        {/* Scores card */}
        {(grade || nova || ecoGrade) && (
          <div className="rounded-xl border border-border bg-muted grid grid-cols-3 divide-x divide-border mt-2">

            {/* Nutri-Score */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                {grade ? (
                  <div className={`w-8 h-8 shrink-0 rounded-full ${getNutriScoreColor(grade)} flex items-center justify-center shadow-sm`}>
                    <span className="text-white text-sm font-bold">{grade.toUpperCase()}</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 shrink-0 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-muted-foreground text-sm font-bold">?</span>
                  </div>
                )}
                <p className="text-xs font-semibold text-foreground">Nutri-Score</p>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {NUTRI_DESCRIPTIONS[grade ?? ""] ?? "Not rated"}
              </p>
            </div>

            {/* NOVA */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                {nova ? (
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${NOVA_LABELS[nova]?.color ?? "bg-accent text-muted-foreground"}`}>
                    <span className="text-sm font-bold">{nova}</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 shrink-0 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-muted-foreground text-sm font-bold">?</span>
                  </div>
                )}
                <p className="text-xs font-semibold text-foreground">NOVA</p>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {nova ? NOVA_LABELS[nova]?.desc ?? "Unknown" : "Not rated"}
              </p>
            </div>

            {/* Eco-Score */}
            <div className="flex flex-col gap-2 p-4">
              <div className="flex items-center gap-2">
                {ecoGrade ? (
                  <div className="w-8 h-8 shrink-0 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary text-sm font-bold uppercase">{ecoGrade}</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 shrink-0 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-muted-foreground text-sm font-bold">?</span>
                  </div>
                )}
                <p className="text-xs font-semibold text-foreground">Eco-Score</p>
              </div>
              <p className="text-[11px] text-muted-foreground leading-snug">
                {ECO_DESCRIPTIONS[ecoGrade ?? ""] ?? "Not rated"}
              </p>
            </div>

          </div>
        )}

        {/* Labels */}
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <Badge key={label} variant="outline" className="text-xs font-normal rounded-full border-border">
                {label}
              </Badge>
            ))}
          </div>
        )}

        {/* Quick stats */}
        {product.serving_size && (
          <p className="text-xs text-muted-foreground">
            Serving size: <span className="font-medium text-foreground">{product.serving_size}</span>
          </p>
        )}
      </div>
    </div>
  );
}
