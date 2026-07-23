import Link from "next/link";
import {
  getNutriScorePillStyle,
  getEcoScoreBadgeStyle,
  getNovaBadgeStyle,
  getProductName,
} from "../lib/off-utils";
import type { OFFProduct } from "../lib/off-types";

interface TooltipContent { title: string; desc: string }

const NUTRI_TIPS: Record<string, TooltipContent> = {
  a: { title: "Nutri-Score A", desc: "Excellent nutritional quality" },
  b: { title: "Nutri-Score B", desc: "Good nutritional quality" },
  c: { title: "Nutri-Score C", desc: "Average nutritional quality" },
  d: { title: "Nutri-Score D", desc: "Poor nutritional quality" },
  e: { title: "Nutri-Score E", desc: "Bad nutritional quality" },
};
const NOVA_TIPS: Record<number, TooltipContent> = {
  1: { title: "NOVA 1", desc: "Unprocessed food" },
  2: { title: "NOVA 2", desc: "Culinary ingredient" },
  3: { title: "NOVA 3", desc: "Processed food" },
  4: { title: "NOVA 4", desc: "Ultra-processed food" },
};
const ECO_TIPS: Record<string, TooltipContent> = {
  a: { title: "Eco-Score A", desc: "Very low environmental impact" },
  b: { title: "Eco-Score B", desc: "Low environmental impact" },
  c: { title: "Eco-Score C", desc: "Moderate environmental impact" },
  d: { title: "Eco-Score D", desc: "High environmental impact" },
  e: { title: "Eco-Score E", desc: "Very high environmental impact" },
};

interface ScoreBadgeProps {
  label: string;
  value: string;
  style: string;
  tip: TooltipContent;
}

function ScoreBadge({ label, value, style, tip }: ScoreBadgeProps) {
  const isMissing = value === "—";

  return (
    <div className="relative group/score flex-1">
      {isMissing ? (
        <div className="flex items-center justify-center py-1.5 rounded-lg bg-muted w-full">
          <span className="text-[10px] font-medium text-muted-foreground">?</span>
        </div>
      ) : (
        <div className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-[10px] w-full ${style}`}>
          <span className="font-medium opacity-70">{label}</span>
          <span className="font-bold">{value}</span>
        </div>
      )}
      <div
        className="
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50
          pointer-events-none select-none
          opacity-0 group-hover/score:opacity-100
          scale-95 group-hover/score:scale-100
          transition-all duration-150 ease-out
        "
      >
        <div className="bg-foreground text-background rounded-xl px-3 py-2 shadow-xl shadow-black/20 text-center whitespace-nowrap">
          <p className="text-[11px] font-semibold leading-none">{tip.title}</p>
          <p className="text-[10px] text-background/60 mt-1 leading-none">{tip.desc}</p>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-foreground" />
      </div>
    </div>
  );
}

export interface ProductCardProps {
  product: OFFProduct;
  cardHref?: (product: OFFProduct) => string;
}

export function ProductCard({ product, cardHref }: ProductCardProps) {
  const code = product.code;
  const name = getProductName(product);
  const imageUrl = product.image_front_url ?? product.image_url;
  const href = cardHref ? cardHref(product) : `/products/${code}`;

  const VALID = new Set(["a", "b", "c", "d", "e"]);
  const rawNutri = product.nutriscore_grade?.toLowerCase() ?? "";
  const rawEco   = product.ecoscore_grade?.toLowerCase().replace("a-plus", "a") ?? "";
  const nova     = typeof product.nova_group === "number" && product.nova_group >= 1 && product.nova_group <= 4
    ? product.nova_group : null;

  const nutriGrade = VALID.has(rawNutri) ? rawNutri : null;
  const ecoGrade   = VALID.has(rawEco)   ? rawEco   : null;

  const nutriValue = nutriGrade ? nutriGrade.toUpperCase() : "—";
  const novaValue  = nova !== null ? String(nova) : "—";
  const ecoValue   = ecoGrade
    ? (product.ecoscore_grade?.toLowerCase() === "a-plus" ? "A+" : ecoGrade.toUpperCase())
    : "—";

  return (
    <Link
      href={href}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-2xl"
    >
      <div className="rounded-2xl bg-card border border-border shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200">
        <div className="relative aspect-square bg-muted overflow-hidden rounded-t-2xl">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={name}
              loading="lazy"
              className="w-full h-full object-contain p-2 group-hover:scale-[1.04] transition-transform duration-300 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>

        <div className="h-[104px] px-3 pt-2.5 pb-3 flex flex-col">
          <p className="text-[14px] font-semibold text-foreground line-clamp-2 leading-[1.3]">
            {name}
          </p>

          <div className="mt-auto flex gap-1.5">
            <ScoreBadge
              label="Nutri" value={nutriValue}
              style={getNutriScorePillStyle(nutriGrade ?? undefined)}
              tip={NUTRI_TIPS[nutriGrade ?? ""] ?? { title: "Nutri-Score", desc: "Not available" }}
            />
            <ScoreBadge
              label="Nova" value={novaValue}
              style={getNovaBadgeStyle(nova ?? undefined)}
              tip={NOVA_TIPS[nova ?? 0] ?? { title: "NOVA Group", desc: "Not available" }}
            />
            <ScoreBadge
              label="Eco" value={ecoValue}
              style={getEcoScoreBadgeStyle(ecoGrade ?? undefined)}
              tip={ECO_TIPS[ecoGrade ?? ""] ?? { title: "Eco-Score", desc: "Not available" }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
