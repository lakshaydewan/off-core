"use client";

import { useState } from "react";
import { Badge } from "./badge";
import { extractAllergens, extractAdditives } from "../lib/off-utils";
import type { OFFProduct } from "../lib/off-types";

export interface ProductIngredientsProps {
  product: OFFProduct;
}

const ALLERGEN_HIGHLIGHT_WORDS = [
  "peanut", "milk", "egg", "wheat", "soy", "gluten", "tree nut", "shellfish",
  "fish", "sesame", "almond", "cashew", "walnut", "pecan", "hazelnut", "pistachio",
  "lactose", "dairy",
];

function highlightIngredients(text: string, allergens: string[]): React.ReactElement {
  if (!text) return <></>;

  const lowerText = text.toLowerCase();
  const parts: { text: string; isAllergen: boolean }[] = [];
  let lastIndex = 0;

  const wordsToHighlight = [
    ...ALLERGEN_HIGHLIGHT_WORDS,
    ...allergens.map((a) => a.toLowerCase()),
  ];

  const positions: { start: number; end: number }[] = [];

  for (const word of wordsToHighlight) {
    let idx = lowerText.indexOf(word, 0);
    while (idx !== -1) {
      positions.push({ start: idx, end: idx + word.length });
      idx = lowerText.indexOf(word, idx + 1);
    }
  }

  positions.sort((a, b) => a.start - b.start);

  const merged: { start: number; end: number }[] = [];
  for (const pos of positions) {
    if (merged.length === 0 || pos.start > merged[merged.length - 1].end) {
      merged.push({ ...pos });
    } else {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, pos.end);
    }
  }

  for (const { start, end } of merged) {
    if (start > lastIndex) {
      parts.push({ text: text.slice(lastIndex, start), isAllergen: false });
    }
    parts.push({ text: text.slice(start, end), isAllergen: true });
    lastIndex = end;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isAllergen: false });
  }

  if (parts.length === 0) {
    return <span>{text}</span>;
  }

  return (
    <>
      {parts.map((part, i) =>
        part.isAllergen ? (
          <mark
            key={i}
            className="bg-amber-900/50 text-amber-200 rounded px-0.5 not-italic font-medium"
          >
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}

export function ProductIngredients({ product }: ProductIngredientsProps) {
  const [expanded, setExpanded] = useState(false);
  const allergens = extractAllergens(product);
  const additives = extractAdditives(product);
  const text = product.ingredients_text_en || product.ingredients_text || "";
  const isLong = text.length > 300;

  return (
    <div className="space-y-5">
      {/* Allergen summary */}
      {allergens.length > 0 && (
        <div className="p-4 rounded-xl border border-amber-900/40 bg-amber-950/30 space-y-2">
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
            <p className="text-sm font-semibold text-amber-200">Allergen Information</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allergens.map((a) => (
              <Badge key={a} className="bg-amber-900/50 text-amber-200 hover:bg-amber-900/50 text-xs font-medium border-0">
                {a}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients text */}
      {text ? (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Ingredients</h3>
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p className={!expanded && isLong ? "line-clamp-4" : ""}>
              {highlightIngredients(text, allergens)}
            </p>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-xs text-primary font-medium mt-2 hover:underline"
              >
                {expanded ? "Show less" : "Show full ingredients"}
              </button>
            )}
          </div>
          {allergens.length > 0 && (
            <p className="text-xs text-amber-300 bg-amber-950/30 px-3 py-1.5 rounded-lg inline-block">
              Highlighted ingredients may contain allergens
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Ingredients list not available.</p>
      )}

      {/* Additives */}
      {additives.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Additives</h3>
          <div className="flex flex-wrap gap-1.5">
            {additives.map((a) => (
              <Badge key={a} variant="outline" className="text-xs font-mono text-muted-foreground border-border">
                {a}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{additives.length} additive{additives.length !== 1 ? "s" : ""} detected</p>
        </div>
      )}
    </div>
  );
}
