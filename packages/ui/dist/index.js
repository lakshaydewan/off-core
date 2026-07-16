"use client";

// src/components/badge.tsx
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

// src/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/badge.tsx
var badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant = "default",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps(
      {
        className: cn(badgeVariants({ variant }), className)
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant
    }
  });
}

// src/components/button.tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva as cva2 } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva2(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost: "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs": "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ButtonPrimitive,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// src/components/card.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Card({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card",
      "data-size": size,
      className: cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-title",
      className: cn(
        "font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className
      ),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-(--card-spacing)", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "card-footer",
      className: cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      ),
      ...props
    }
  );
}

// src/components/progress.tsx
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function Progress({
  className,
  children,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    ProgressPrimitive.Root,
    {
      value,
      "data-slot": "progress",
      className: cn("flex flex-wrap gap-3", className),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx3(ProgressTrack, { children: /* @__PURE__ */ jsx3(ProgressIndicator, {}) })
      ]
    }
  );
}
function ProgressTrack({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    ProgressPrimitive.Track,
    {
      className: cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      ),
      "data-slot": "progress-track",
      ...props
    }
  );
}
function ProgressIndicator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx3(
    ProgressPrimitive.Indicator,
    {
      "data-slot": "progress-indicator",
      className: cn("h-full bg-primary transition-all", className),
      ...props
    }
  );
}
function ProgressLabel({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    ProgressPrimitive.Label,
    {
      className: cn("text-sm font-medium", className),
      "data-slot": "progress-label",
      ...props
    }
  );
}
function ProgressValue({ className, ...props }) {
  return /* @__PURE__ */ jsx3(
    ProgressPrimitive.Value,
    {
      className: cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className
      ),
      "data-slot": "progress-value",
      ...props
    }
  );
}

// src/components/separator.tsx
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { jsx as jsx4 } from "react/jsx-runtime";
function Separator({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx4(
    SeparatorPrimitive,
    {
      "data-slot": "separator",
      orientation,
      className: cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      ),
      ...props
    }
  );
}

// src/components/skeleton.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx5(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("animate-pulse rounded-md bg-muted", className),
      ...props
    }
  );
}

// src/components/tabs.tsx
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx6 } from "react/jsx-runtime";
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    TabsPrimitive.Root,
    {
      "data-slot": "tabs",
      "data-orientation": orientation,
      className: cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      ),
      ...props
    }
  );
}
var tabsListVariants = cva3(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function TabsList({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx6(
    TabsPrimitive.List,
    {
      "data-slot": "tabs-list",
      "data-variant": variant,
      className: cn(tabsListVariants({ variant }), className),
      ...props
    }
  );
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsx6(
    TabsPrimitive.Tab,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-sm group-data-[variant=line]/tabs-list:data-active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      ),
      ...props
    }
  );
}
function TabsContent({ className, ...props }) {
  return /* @__PURE__ */ jsx6(
    TabsPrimitive.Panel,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 text-sm outline-none", className),
      ...props
    }
  );
}

// src/components/products-toolbar.tsx
import { useRef } from "react";
import { jsx as jsx7, jsxs as jsxs2 } from "react/jsx-runtime";
function SearchIcon({ className }) {
  return /* @__PURE__ */ jsxs2("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ jsx7("circle", { cx: "11", cy: "11", r: "8" }),
    /* @__PURE__ */ jsx7("path", { d: "m21 21-4.35-4.35" })
  ] });
}
function XIcon({ className }) {
  return /* @__PURE__ */ jsx7("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx7("path", { d: "M18 6 6 18M6 6l12 12" }) });
}
function ChevronIcon({ className }) {
  return /* @__PURE__ */ jsx7("svg", { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx7("path", { d: "m6 9 6 6 6-6" }) });
}
function ProductsToolbar({
  searchQuery,
  onSearchChange,
  isSearching,
  categories,
  activeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  isSearchMode,
  isBarcode,
  resultCount,
  totalCount,
  stickyTop = "top-14",
  showCategories = true,
  showSort = true
}) {
  const inputRef = useRef(null);
  const sortControl = /* @__PURE__ */ jsxs2("div", { className: "relative shrink-0", children: [
    /* @__PURE__ */ jsxs2(
      "select",
      {
        value: sort,
        onChange: (e) => onSortChange(e.target.value),
        className: "appearance-none bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700 text-xs font-medium pl-3 pr-6 py-1.5 rounded-full cursor-pointer focus:outline-none transition-colors",
        children: [
          /* @__PURE__ */ jsx7("option", { value: "default", children: "Popular" }),
          /* @__PURE__ */ jsx7("option", { value: "name", children: "A \u2013 Z" }),
          /* @__PURE__ */ jsx7("option", { value: "nutriscore", children: "Nutri-Score" }),
          /* @__PURE__ */ jsx7("option", { value: "calories", children: "Calories" })
        ]
      }
    ),
    /* @__PURE__ */ jsx7(ChevronIcon, { className: "absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-400 pointer-events-none" })
  ] });
  return /* @__PURE__ */ jsxs2("div", { className: `sticky ${stickyTop} z-20 bg-zinc-50 pt-2 pb-4 space-y-3 -mx-4 px-4 sm:-mx-6 sm:px-6`, children: [
    /* @__PURE__ */ jsxs2("div", { className: "relative", children: [
      /* @__PURE__ */ jsx7(SearchIcon, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" }),
      /* @__PURE__ */ jsx7(
        "input",
        {
          ref: inputRef,
          type: "text",
          value: searchQuery,
          onChange: (e) => onSearchChange(e.target.value),
          placeholder: "Search by name or barcode\u2026",
          className: "w-full h-10 bg-white rounded-xl border border-zinc-200 pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FFA551]/20 focus:border-[#FFA551]/50 transition-colors shadow-sm"
        }
      ),
      isSearching ? /* @__PURE__ */ jsx7("div", { className: "absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-zinc-200 border-t-[#FFA551] animate-spin" }) : searchQuery ? /* @__PURE__ */ jsx7(
        "button",
        {
          onClick: () => {
            onSearchChange("");
            inputRef.current?.focus();
          },
          className: "absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-zinc-200 hover:bg-zinc-300 transition-colors",
          children: /* @__PURE__ */ jsx7(XIcon, { className: "w-3 h-3 text-zinc-600" })
        }
      ) : null
    ] }),
    isSearchMode ? (showSort || !isSearching) && /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx7("p", { className: "text-sm text-zinc-500", children: isSearching ? "Searching\u2026" : isBarcode ? resultCount === 0 ? `No product found for barcode ${searchQuery.trim()}` : "Barcode result" : `${resultCount} result${resultCount !== 1 ? "s" : ""} for "${searchQuery}"` }),
      showSort && sortControl
    ] }) : showCategories || showSort ? /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3", children: [
      showCategories && /* @__PURE__ */ jsx7("div", { className: "flex gap-1.5 overflow-x-auto scrollbar-none flex-1 min-w-0 pb-0.5", children: categories.map((cat) => /* @__PURE__ */ jsx7(
        "button",
        {
          onClick: () => onCategoryChange(cat),
          className: cn(
            "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
            activeCategory === cat ? "bg-[#FFA551] text-white shadow-sm" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
          ),
          children: cat
        },
        cat
      )) }),
      showSort && sortControl
    ] }) : null,
    /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx7("div", { className: "flex-1 h-px bg-zinc-200" }),
      !isSearchMode && /* @__PURE__ */ jsx7("p", { className: "text-[11px] text-zinc-400 shrink-0", children: resultCount === totalCount ? `${totalCount} products` : `${resultCount} of ${totalCount}` })
    ] })
  ] });
}

// src/components/page-header.tsx
import { jsx as jsx8, jsxs as jsxs3 } from "react/jsx-runtime";
function PageHeader({ heading, countryTag, subtitle }) {
  return /* @__PURE__ */ jsxs3("div", { children: [
    /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx8("h1", { className: "text-xl font-semibold text-zinc-900 tracking-tight", children: heading }),
      countryTag && /* @__PURE__ */ jsx8("span", { className: "px-2 py-0.5 rounded-full bg-[#FFA551]/20 text-[#C47A00] text-xs font-medium", children: countryTag })
    ] }),
    subtitle && /* @__PURE__ */ jsx8("p", { className: "text-sm text-zinc-400 mt-0.5", children: subtitle })
  ] });
}

// src/components/product-card.tsx
import Link from "next/link";

// src/lib/off-utils.ts
var NUTRISCORE_ORDER = { a: 0, b: 1, c: 2, d: 3, e: 4 };
var OFF_API_BASE = "https://world.openfoodfacts.org/api/v2";
function getProductName(product) {
  return product.product_name_en || product.product_name || "Unknown Product";
}
function getBrand(product) {
  if (!product.brands) return "";
  return product.brands.split(",")[0].trim();
}
function getCategory(product) {
  if (!product.categories_tags || product.categories_tags.length === 0) {
    return product.categories ?? "";
  }
  const tag = product.categories_tags[product.categories_tags.length - 1];
  return tag.replace(/^en:/, "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function extractLabels(product) {
  if (!product.labels_tags) return [];
  return product.labels_tags.map((tag) => tag.replace("en:", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())).slice(0, 6);
}
function extractAllergens(product) {
  if (!product.allergens_tags) return [];
  return product.allergens_tags.map(
    (tag) => tag.replace("en:", "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}
function extractAdditives(product) {
  if (!product.additives_tags) return [];
  return product.additives_tags.map((tag) => tag.replace("en:", "").toUpperCase());
}
var NUTRISCORE_SOLID = {
  a: "bg-green-500",
  b: "bg-lime-400",
  c: "bg-yellow-400",
  d: "bg-orange-400",
  e: "bg-red-500"
};
function getNutriScoreColor(grade) {
  return NUTRISCORE_SOLID[grade?.toLowerCase() ?? ""] ?? "bg-gray-300";
}
var NUTRISCORE_TEXT = {
  a: "text-green-600",
  b: "text-lime-600",
  c: "text-yellow-600",
  d: "text-orange-600",
  e: "text-red-600"
};
function getNutriScoreTextColor(grade) {
  return NUTRISCORE_TEXT[grade?.toLowerCase() ?? ""] ?? "text-gray-500";
}
var _productCache = /* @__PURE__ */ new Map();
async function fetchProductByBarcode(barcode) {
  const cached = _productCache.get(barcode);
  if (cached) return cached;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1e4);
  try {
    const res = await fetch(`${OFF_API_BASE}/product/${encodeURIComponent(barcode)}.json`, {
      signal: controller.signal
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    const product = data.product;
    _productCache.set(barcode, product);
    return product;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
var GRADE_BADGE = {
  a: "bg-green-600 text-white",
  b: "bg-lime-500 text-white",
  c: "bg-yellow-400 text-gray-800",
  d: "bg-orange-500 text-white",
  e: "bg-red-500 text-white"
};
var GRADE_BADGE_MISSING = "bg-zinc-100 text-zinc-400";
function getNutriScorePillStyle(grade) {
  return GRADE_BADGE[grade?.toLowerCase() ?? ""] ?? GRADE_BADGE_MISSING;
}
function getEcoScoreBadgeStyle(grade) {
  const g = grade?.toLowerCase().replace("a-plus", "a") ?? "";
  return GRADE_BADGE[g] ?? GRADE_BADGE_MISSING;
}
function getNovaBadgeStyle(nova) {
  const styles = {
    1: "bg-green-600 text-white",
    2: "bg-lime-500 text-white",
    3: "bg-yellow-400 text-gray-800",
    4: "bg-red-500 text-white"
  };
  return nova != null ? styles[nova] ?? GRADE_BADGE_MISSING : GRADE_BADGE_MISSING;
}
var BROAD_CATEGORY_PATTERNS = [
  [/beverages|soft-drinks|sodas|juices|waters|water|drinks|coffee|tea|energy-drinks|smoothies|milkshakes/, "Beverages"],
  [/dairy|milks|cheeses|yogurts|butter|creams|kefir|fromage/, "Dairy"],
  [/cereals|breakfasts|granola|oatmeal|porridge|muesli/, "Cereals"],
  [/protein-bars|energy-bars|granola-bars|cereal-bars|nutrition-bars/, "Bars"],
  [/snacks|chips|crisps|crackers|popcorn|pretzels|puffed/, "Snacks"],
  [/chocolates|candies|sweets|confectioneries|biscuits|cookies|cakes|pastries|desserts|ice-creams/, "Sweets"],
  [/breads|pastas|rice|grains|flours|noodles|tortillas|wraps|flatbreads/, "Grains"],
  [/condiments|sauces|dressings|spreads|dips|mustards|ketchups|mayonnaise|jams|nut-butters|peanut-butter/, "Condiments"],
  [/meats|fishes|seafoods|poultries|chicken|beef|pork|salmon|tuna/, "Meat & Fish"],
  [/fruits|vegetables|produce|salads|legumes|beans/, "Produce"],
  [/frozen/, "Frozen"],
  [/nuts|seeds|trail-mix/, "Nuts & Seeds"],
  [/supplements|protein-powders|vitamins/, "Supplements"]
];
function getBroadCategory(product) {
  const tags = (product.categories_tags ?? []).join(" ");
  if (!tags) return "Other";
  for (const [pattern, label] of BROAD_CATEGORY_PATTERNS) {
    if (pattern.test(tags)) return label;
  }
  return "Other";
}

// src/components/product-card.tsx
import { jsx as jsx9, jsxs as jsxs4 } from "react/jsx-runtime";
var NUTRI_TIPS = {
  a: { title: "Nutri-Score A", desc: "Excellent nutritional quality" },
  b: { title: "Nutri-Score B", desc: "Good nutritional quality" },
  c: { title: "Nutri-Score C", desc: "Average nutritional quality" },
  d: { title: "Nutri-Score D", desc: "Poor nutritional quality" },
  e: { title: "Nutri-Score E", desc: "Bad nutritional quality" }
};
var NOVA_TIPS = {
  1: { title: "NOVA 1", desc: "Unprocessed food" },
  2: { title: "NOVA 2", desc: "Culinary ingredient" },
  3: { title: "NOVA 3", desc: "Processed food" },
  4: { title: "NOVA 4", desc: "Ultra-processed food" }
};
var ECO_TIPS = {
  a: { title: "Eco-Score A", desc: "Very low environmental impact" },
  b: { title: "Eco-Score B", desc: "Low environmental impact" },
  c: { title: "Eco-Score C", desc: "Moderate environmental impact" },
  d: { title: "Eco-Score D", desc: "High environmental impact" },
  e: { title: "Eco-Score E", desc: "Very high environmental impact" }
};
function ScoreBadge({ label, value, style, tip }) {
  const isMissing = value === "\u2014";
  return /* @__PURE__ */ jsxs4("div", { className: "relative group/score flex-1", children: [
    isMissing ? /* @__PURE__ */ jsx9("div", { className: "flex items-center justify-center py-1.5 rounded-lg bg-zinc-100 w-full", children: /* @__PURE__ */ jsx9("span", { className: "text-[10px] font-medium text-zinc-300", children: "?" }) }) : /* @__PURE__ */ jsxs4("div", { className: `flex items-center justify-between px-2 py-1.5 rounded-lg text-[10px] w-full ${style}`, children: [
      /* @__PURE__ */ jsx9("span", { className: "font-medium opacity-70", children: label }),
      /* @__PURE__ */ jsx9("span", { className: "font-bold", children: value })
    ] }),
    /* @__PURE__ */ jsxs4(
      "div",
      {
        className: "\n          absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50\n          pointer-events-none select-none\n          opacity-0 group-hover/score:opacity-100\n          scale-95 group-hover/score:scale-100\n          transition-all duration-150 ease-out\n        ",
        children: [
          /* @__PURE__ */ jsxs4("div", { className: "bg-zinc-900 text-white rounded-xl px-3 py-2 shadow-xl shadow-black/20 text-center whitespace-nowrap", children: [
            /* @__PURE__ */ jsx9("p", { className: "text-[11px] font-semibold leading-none", children: tip.title }),
            /* @__PURE__ */ jsx9("p", { className: "text-[10px] text-white/60 mt-1 leading-none", children: tip.desc })
          ] }),
          /* @__PURE__ */ jsx9("div", { className: "absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-zinc-900" })
        ]
      }
    )
  ] });
}
function ProductCard({ product, cardHref }) {
  const code = product.code;
  const name = getProductName(product);
  const imageUrl = product.image_front_url ?? product.image_url;
  const href = cardHref ? cardHref(product) : `/products/${code}`;
  const VALID = /* @__PURE__ */ new Set(["a", "b", "c", "d", "e"]);
  const rawNutri = product.nutriscore_grade?.toLowerCase() ?? "";
  const rawEco = product.ecoscore_grade?.toLowerCase().replace("a-plus", "a") ?? "";
  const nova = typeof product.nova_group === "number" && product.nova_group >= 1 && product.nova_group <= 4 ? product.nova_group : null;
  const nutriGrade = VALID.has(rawNutri) ? rawNutri : null;
  const ecoGrade = VALID.has(rawEco) ? rawEco : null;
  const nutriValue = nutriGrade ? nutriGrade.toUpperCase() : "\u2014";
  const novaValue = nova !== null ? String(nova) : "\u2014";
  const ecoValue = ecoGrade ? product.ecoscore_grade?.toLowerCase() === "a-plus" ? "A+" : ecoGrade.toUpperCase() : "\u2014";
  return /* @__PURE__ */ jsx9(
    Link,
    {
      href,
      className: "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 rounded-2xl",
      children: /* @__PURE__ */ jsxs4("div", { className: "rounded-2xl bg-white shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-200", children: [
        /* @__PURE__ */ jsx9("div", { className: "relative aspect-square bg-[#f8f8f6] overflow-hidden rounded-t-2xl", children: imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          /* @__PURE__ */ jsx9(
            "img",
            {
              src: imageUrl,
              alt: name,
              loading: "lazy",
              className: "w-full h-full object-contain p-2 group-hover:scale-[1.04] transition-transform duration-300 ease-out"
            }
          )
        ) : /* @__PURE__ */ jsx9("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxs4("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1", className: "text-zinc-300", children: [
          /* @__PURE__ */ jsx9("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
          /* @__PURE__ */ jsx9("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
          /* @__PURE__ */ jsx9("path", { d: "m21 15-5-5L5 21" })
        ] }) }) }),
        /* @__PURE__ */ jsxs4("div", { className: "h-[104px] px-3 pt-2.5 pb-3 flex flex-col", children: [
          /* @__PURE__ */ jsx9("p", { className: "text-[14px] font-semibold text-zinc-900 line-clamp-2 leading-[1.3]", children: name }),
          /* @__PURE__ */ jsxs4("div", { className: "mt-auto flex gap-1.5", children: [
            /* @__PURE__ */ jsx9(
              ScoreBadge,
              {
                label: "Nutri",
                value: nutriValue,
                style: getNutriScorePillStyle(nutriGrade ?? void 0),
                tip: NUTRI_TIPS[nutriGrade ?? ""] ?? { title: "Nutri-Score", desc: "Not available" }
              }
            ),
            /* @__PURE__ */ jsx9(
              ScoreBadge,
              {
                label: "Nova",
                value: novaValue,
                style: getNovaBadgeStyle(nova ?? void 0),
                tip: NOVA_TIPS[nova ?? 0] ?? { title: "NOVA Group", desc: "Not available" }
              }
            ),
            /* @__PURE__ */ jsx9(
              ScoreBadge,
              {
                label: "Eco",
                value: ecoValue,
                style: getEcoScoreBadgeStyle(ecoGrade ?? void 0),
                tip: ECO_TIPS[ecoGrade ?? ""] ?? { title: "Eco-Score", desc: "Not available" }
              }
            )
          ] })
        ] })
      ] })
    }
  );
}

// src/components/products-page.tsx
import { useState, useMemo, useEffect, useRef as useRef2, Fragment } from "react";
import { Fragment as Fragment2, jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
var DEFAULT_FIELDS = [
  "code",
  "product_name",
  "product_name_en",
  "brands",
  "categories_tags",
  "image_front_url",
  "nutriscore_grade",
  "ecoscore_grade",
  "nova_group",
  "nutriments"
].join(",");
var OFF_API_BASE2 = "https://world.openfoodfacts.org/api/v2";
var DEFAULT_FETCH_URL = `${OFF_API_BASE2}/search?countries_tags=en:canada&page_size=50&sort_by=unique_scans_n&fields=${DEFAULT_FIELDS}`;
var _catalogCache = null;
function CardSkeleton() {
  return /* @__PURE__ */ jsxs5("div", { className: "rounded-2xl bg-white shadow-sm overflow-hidden animate-pulse", children: [
    /* @__PURE__ */ jsx10("div", { className: "aspect-square bg-zinc-100" }),
    /* @__PURE__ */ jsxs5("div", { className: "h-[104px] px-3 pt-2.5 pb-3 flex flex-col", children: [
      /* @__PURE__ */ jsxs5("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx10("div", { className: "h-3.5 bg-zinc-100 rounded w-4/5" }),
        /* @__PURE__ */ jsx10("div", { className: "h-3.5 bg-zinc-100 rounded w-3/5" })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "mt-auto flex gap-1.5", children: [
        /* @__PURE__ */ jsx10("div", { className: "flex-1 h-6 bg-zinc-100 rounded-lg" }),
        /* @__PURE__ */ jsx10("div", { className: "flex-1 h-6 bg-zinc-100 rounded-lg" }),
        /* @__PURE__ */ jsx10("div", { className: "flex-1 h-6 bg-zinc-100 rounded-lg" })
      ] })
    ] })
  ] });
}
function ProductsPage({
  products,
  heading = "Browse",
  countryTag,
  subtitle,
  searchFn,
  initialQuery = "",
  showResultsOnMount = true,
  showCategories = true,
  showSort = true,
  stickyTop = "top-14",
  renderCard,
  cardHref,
  idleSlot
}) {
  const isSelfFetching = products === void 0;
  const [fetchedProducts, setFetchedProducts] = useState(() => {
    if (!isSelfFetching) return products ?? [];
    if (_catalogCache?.url === DEFAULT_FETCH_URL) return _catalogCache.products;
    return null;
  });
  const [fetchError, setFetchError] = useState(false);
  const [fetchKey, setFetchKey] = useState(0);
  useEffect(() => {
    if (!isSelfFetching) return;
    if (fetchKey === 0 && _catalogCache?.url === DEFAULT_FETCH_URL) return;
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12e3);
    setFetchError(false);
    fetch(DEFAULT_FETCH_URL, { signal: controller.signal }).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    }).then((data) => {
      if (cancelled) return;
      const list = (data.products ?? []).filter(
        (p) => !!(p.product_name || p.product_name_en)
      );
      _catalogCache = { url: DEFAULT_FETCH_URL, products: list };
      setFetchedProducts(list);
    }).catch(() => {
      if (cancelled) return;
      setFetchError(true);
      setFetchedProducts([]);
    }).finally(() => clearTimeout(timer));
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [isSelfFetching, fetchKey]);
  useEffect(() => {
    if (!isSelfFetching) setFetchedProducts(products ?? []);
  }, [products, isSelfFetching]);
  const effectiveProducts = fetchedProducts ?? [];
  const isLoadingCatalog = isSelfFetching && fetchedProducts === null;
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef2(null);
  const latestQueryRef = useRef2("");
  const isSearchMode = searchQuery.trim().length > 0;
  const isBarcode = /^\d{8,14}$/.test(searchQuery.trim());
  useEffect(() => {
    const trimmed = searchQuery.trim();
    latestQueryRef.current = trimmed;
    if (timerRef.current) clearTimeout(timerRef.current);
    if (!trimmed) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    timerRef.current = setTimeout(async () => {
      const fn = searchFn ?? defaultSearchFn;
      const results = await fn(trimmed);
      if (latestQueryRef.current === trimmed) {
        setSearchResults(results);
        setIsSearching(false);
      }
    }, 420);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery, searchFn]);
  const autoCategories = useMemo(() => {
    const counts = {};
    for (const p of effectiveProducts) {
      const cat = getBroadCategory(p);
      if (cat !== "Other") counts[cat] = (counts[cat] ?? 0) + 1;
    }
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([k]) => k);
    return ["All", ...top];
  }, [effectiveProducts]);
  const categories = autoCategories;
  const sourceProducts = isSearchMode ? searchResults ?? [] : effectiveProducts;
  const filtered = useMemo(() => {
    if (isSearchMode || activeCategory === "All") return sourceProducts;
    return sourceProducts.filter((p) => getBroadCategory(p) === activeCategory);
  }, [sourceProducts, activeCategory, isSearchMode]);
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "name":
          return getProductName(a).localeCompare(getProductName(b));
        case "nutriscore": {
          const ga = NUTRISCORE_ORDER[a.nutriscore_grade?.toLowerCase() ?? ""] ?? 99;
          const gb = NUTRISCORE_ORDER[b.nutriscore_grade?.toLowerCase() ?? ""] ?? 99;
          return ga - gb;
        }
        case "calories": {
          const ca = a.nutriments?.energy_kcal_100g ?? Infinity;
          const cb = b.nutriments?.energy_kcal_100g ?? Infinity;
          return ca - cb;
        }
        default:
          return 0;
      }
    });
  }, [filtered, sort]);
  const isIdle = !showResultsOnMount && !isSearchMode;
  const totalCount = isSearchMode ? searchResults?.length ?? 0 : effectiveProducts.length;
  function retry() {
    _catalogCache = null;
    setFetchedProducts(null);
    setFetchError(false);
    setFetchKey((k) => k + 1);
  }
  return /* @__PURE__ */ jsxs5("main", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6", children: [
    /* @__PURE__ */ jsx10(PageHeader, { heading, countryTag, subtitle }),
    /* @__PURE__ */ jsx10(
      ProductsToolbar,
      {
        searchQuery,
        onSearchChange: setSearchQuery,
        isSearching,
        categories,
        activeCategory,
        onCategoryChange: setActiveCategory,
        sort,
        onSortChange: setSort,
        isSearchMode,
        isBarcode,
        resultCount: sorted.length,
        totalCount,
        stickyTop,
        showCategories,
        showSort
      }
    ),
    isIdle ? idleSlot ? idleSlot(setSearchQuery) : null : isLoadingCatalog || isSearching ? /* @__PURE__ */ jsx10("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx10(CardSkeleton, {}, i)) }) : sorted.length > 0 ? /* @__PURE__ */ jsx10("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: sorted.map(
      (product, i) => renderCard ? /* @__PURE__ */ jsx10(Fragment, { children: renderCard(product, i) }, product.code) : /* @__PURE__ */ jsx10(
        ProductCard,
        {
          product,
          cardHref
        },
        product.code
      )
    ) }) : /* @__PURE__ */ jsx10("div", { className: "text-center py-20 space-y-3", children: isSearchMode ? /* @__PURE__ */ jsxs5(Fragment2, { children: [
      /* @__PURE__ */ jsx10("p", { className: "text-zinc-500 font-medium", children: "No results found" }),
      /* @__PURE__ */ jsx10("p", { className: "text-sm text-zinc-400", children: "Try a different name or check the barcode" })
    ] }) : fetchError ? /* @__PURE__ */ jsxs5(Fragment2, { children: [
      /* @__PURE__ */ jsx10("p", { className: "text-zinc-500 font-medium", children: "Could not load products" }),
      /* @__PURE__ */ jsx10("p", { className: "text-sm text-zinc-400", children: "Check your connection or try again." }),
      /* @__PURE__ */ jsx10(
        "button",
        {
          onClick: retry,
          className: "text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors",
          children: "Retry"
        }
      )
    ] }) : effectiveProducts.length === 0 ? /* @__PURE__ */ jsxs5(Fragment2, { children: [
      /* @__PURE__ */ jsx10("p", { className: "text-zinc-500 font-medium", children: "No products found" }),
      /* @__PURE__ */ jsx10("p", { className: "text-sm text-zinc-400", children: "The catalog appears to be empty." })
    ] }) : /* @__PURE__ */ jsxs5(Fragment2, { children: [
      /* @__PURE__ */ jsxs5("p", { className: "text-zinc-500 font-medium", children: [
        "No products in ",
        activeCategory
      ] }),
      /* @__PURE__ */ jsx10(
        "button",
        {
          onClick: () => setActiveCategory("All"),
          className: "text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors",
          children: "Clear filter"
        }
      )
    ] }) })
  ] });
}
async function defaultSearchFn(query) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1e4);
  try {
    const isBarcode = /^\d{8,14}$/.test(query);
    if (isBarcode) {
      const res2 = await fetch(
        `${OFF_API_BASE2}/product/${encodeURIComponent(query)}.json`,
        { signal: controller.signal }
      );
      if (!res2.ok) return [];
      const data2 = await res2.json();
      return data2.status === 1 && data2.product ? [data2.product] : [];
    }
    const params = new URLSearchParams({
      action: "process",
      json: "1",
      search_terms: query,
      page_size: "24",
      fields: DEFAULT_FIELDS
    });
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`,
      { signal: controller.signal }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products ?? [];
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

// src/components/section-card.tsx
import { jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
function SectionCard({ label, children }) {
  return /* @__PURE__ */ jsxs6("div", { className: "rounded-2xl border border-zinc-200/60 bg-white p-6", children: [
    /* @__PURE__ */ jsx11("p", { className: "text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5", children: label }),
    children
  ] });
}

// src/components/product-hero.tsx
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
var NOVA_LABELS = {
  1: { label: "Unprocessed", color: "bg-green-100 text-green-800", desc: "Minimal processing" },
  2: { label: "Culinary Ingredient", color: "bg-lime-100 text-lime-800", desc: "Basic culinary ingredient" },
  3: { label: "Processed", color: "bg-yellow-100 text-yellow-800", desc: "Added salt, sugar, or fat" },
  4: { label: "Ultra-Processed", color: "bg-red-100 text-red-800", desc: "Industrial additives" }
};
var NUTRI_DESCRIPTIONS = {
  a: "Excellent nutritional quality",
  b: "Good nutritional quality",
  c: "Average nutritional quality",
  d: "Poor nutritional quality",
  e: "Bad nutritional quality \u2014 high in fat, sugar, or salt"
};
var ECO_DESCRIPTIONS = {
  a: "Very low environmental impact",
  b: "Low environmental impact",
  c: "Moderate environmental impact",
  d: "High environmental impact",
  e: "Very high environmental impact"
};
function ProductHero({ product }) {
  const name = getProductName(product);
  const brand = getBrand(product);
  const category = getCategory(product);
  const labels = extractLabels(product);
  const VALID_GRADES = /* @__PURE__ */ new Set(["a", "b", "c", "d", "e"]);
  const rawNutri = product.nutriscore_grade?.toLowerCase() ?? "";
  const rawEco = product.ecoscore_grade?.toLowerCase().replace("a-plus", "a") ?? "";
  const grade = VALID_GRADES.has(rawNutri) ? rawNutri : null;
  const ecoGrade = VALID_GRADES.has(rawEco) ? rawEco : null;
  const nova = typeof product.nova_group === "number" && product.nova_group >= 1 && product.nova_group <= 4 ? product.nova_group : null;
  const imageUrl = product.image_front_url || product.image_url;
  return /* @__PURE__ */ jsxs7("div", { className: "flex flex-col md:flex-row gap-8 md:gap-12 items-start", children: [
    /* @__PURE__ */ jsxs7("div", { className: "relative w-full md:w-72 md:shrink-0", children: [
      /* @__PURE__ */ jsx12("div", { className: "relative aspect-square rounded-2xl overflow-hidden bg-[#f8f8f6] border border-zinc-200/60", children: imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        /* @__PURE__ */ jsx12(
          "img",
          {
            src: imageUrl,
            alt: name,
            className: "w-full h-full object-contain p-6"
          }
        )
      ) : /* @__PURE__ */ jsx12("div", { className: "w-full h-full flex items-center justify-center text-zinc-200", children: /* @__PURE__ */ jsxs7("svg", { width: "80", height: "80", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1", children: [
        /* @__PURE__ */ jsx12("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2" }),
        /* @__PURE__ */ jsx12("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
        /* @__PURE__ */ jsx12("path", { d: "m21 15-5-5L5 21" })
      ] }) }) }),
      product.quantity && /* @__PURE__ */ jsx12("p", { className: "text-xs text-zinc-400 text-center mt-2", children: product.quantity })
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "flex-1 space-y-4", children: [
      brand && /* @__PURE__ */ jsx12("p", { className: "text-sm font-medium text-zinc-500 uppercase tracking-widest", children: brand }),
      /* @__PURE__ */ jsx12("h1", { className: "text-3xl md:text-4xl font-semibold text-zinc-900 leading-tight tracking-tight", children: name }),
      category && /* @__PURE__ */ jsx12("p", { className: "text-base text-zinc-500", children: category }),
      (grade || nova || ecoGrade) && /* @__PURE__ */ jsxs7("div", { className: "rounded-xl border border-zinc-200/60 bg-zinc-50 grid grid-cols-3 divide-x divide-zinc-200/60 mt-2", children: [
        /* @__PURE__ */ jsxs7("div", { className: "flex flex-col gap-2 p-4", children: [
          /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2", children: [
            grade ? /* @__PURE__ */ jsx12("div", { className: `w-8 h-8 shrink-0 rounded-full ${getNutriScoreColor(grade)} flex items-center justify-center shadow-sm`, children: /* @__PURE__ */ jsx12("span", { className: "text-white text-sm font-bold", children: grade.toUpperCase() }) }) : /* @__PURE__ */ jsx12("div", { className: "w-8 h-8 shrink-0 rounded-full bg-zinc-200 flex items-center justify-center", children: /* @__PURE__ */ jsx12("span", { className: "text-zinc-400 text-sm font-bold", children: "?" }) }),
            /* @__PURE__ */ jsx12("p", { className: "text-xs font-semibold text-zinc-700", children: "Nutri-Score" })
          ] }),
          /* @__PURE__ */ jsx12("p", { className: "text-[11px] text-zinc-400 leading-snug", children: NUTRI_DESCRIPTIONS[grade ?? ""] ?? "Not rated" })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "flex flex-col gap-2 p-4", children: [
          /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2", children: [
            nova ? /* @__PURE__ */ jsx12("div", { className: `w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${NOVA_LABELS[nova]?.color ?? "bg-zinc-200 text-zinc-400"}`, children: /* @__PURE__ */ jsx12("span", { className: "text-sm font-bold", children: nova }) }) : /* @__PURE__ */ jsx12("div", { className: "w-8 h-8 shrink-0 rounded-full bg-zinc-200 flex items-center justify-center", children: /* @__PURE__ */ jsx12("span", { className: "text-zinc-400 text-sm font-bold", children: "?" }) }),
            /* @__PURE__ */ jsx12("p", { className: "text-xs font-semibold text-zinc-700", children: "NOVA" })
          ] }),
          /* @__PURE__ */ jsx12("p", { className: "text-[11px] text-zinc-400 leading-snug", children: nova ? NOVA_LABELS[nova]?.desc ?? "Unknown" : "Not rated" })
        ] }),
        /* @__PURE__ */ jsxs7("div", { className: "flex flex-col gap-2 p-4", children: [
          /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2", children: [
            ecoGrade ? /* @__PURE__ */ jsx12("div", { className: "w-8 h-8 shrink-0 rounded-full bg-[#FFA551]/20 border border-[#FFA551]/30 flex items-center justify-center", children: /* @__PURE__ */ jsx12("span", { className: "text-[#C47A00] text-sm font-bold uppercase", children: ecoGrade }) }) : /* @__PURE__ */ jsx12("div", { className: "w-8 h-8 shrink-0 rounded-full bg-zinc-200 flex items-center justify-center", children: /* @__PURE__ */ jsx12("span", { className: "text-zinc-400 text-sm font-bold", children: "?" }) }),
            /* @__PURE__ */ jsx12("p", { className: "text-xs font-semibold text-zinc-700", children: "Eco-Score" })
          ] }),
          /* @__PURE__ */ jsx12("p", { className: "text-[11px] text-zinc-400 leading-snug", children: ECO_DESCRIPTIONS[ecoGrade ?? ""] ?? "Not rated" })
        ] })
      ] }),
      labels.length > 0 && /* @__PURE__ */ jsx12("div", { className: "flex flex-wrap gap-2", children: labels.map((label) => /* @__PURE__ */ jsx12(Badge, { variant: "outline", className: "text-xs font-normal rounded-full border-zinc-200", children: label }, label)) }),
      product.serving_size && /* @__PURE__ */ jsxs7("p", { className: "text-xs text-zinc-400", children: [
        "Serving size: ",
        /* @__PURE__ */ jsx12("span", { className: "font-medium text-zinc-900", children: product.serving_size })
      ] })
    ] })
  ] });
}

// src/components/product-nutrition.tsx
import { Fragment as Fragment3, jsx as jsx13, jsxs as jsxs8 } from "react/jsx-runtime";
function MacroCard({ label, value, unit, color, max, description }) {
  const displayValue = value != null ? Math.round(value * 10) / 10 : null;
  const percent = value != null ? Math.min(value / max * 100, 100) : 0;
  return /* @__PURE__ */ jsxs8("div", { className: "p-4 rounded-xl border border-zinc-200/60 bg-white space-y-3", children: [
    /* @__PURE__ */ jsxs8("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs8("div", { children: [
        /* @__PURE__ */ jsx13("p", { className: "text-xs text-zinc-500 font-medium uppercase tracking-wide", children: label }),
        description && /* @__PURE__ */ jsx13("p", { className: "text-xs text-zinc-400 mt-0.5", children: description })
      ] }),
      /* @__PURE__ */ jsx13("div", { className: "text-right", children: displayValue != null ? /* @__PURE__ */ jsxs8(Fragment3, { children: [
        /* @__PURE__ */ jsx13("span", { className: "text-xl font-semibold text-zinc-900 tabular-nums", children: displayValue }),
        /* @__PURE__ */ jsx13("span", { className: "text-xs text-zinc-400 ml-1", children: unit })
      ] }) : /* @__PURE__ */ jsx13("span", { className: "text-sm text-zinc-400", children: "\u2014" }) })
    ] }),
    /* @__PURE__ */ jsx13(
      Progress,
      {
        value: percent,
        className: "h-1.5",
        style: { "--progress-color": color }
      }
    ),
    /* @__PURE__ */ jsx13("p", { className: "text-xs text-zinc-400", children: "per 100g" })
  ] });
}
function CalorieRing({ calories }) {
  const dailyTarget = 2e3;
  const percent = Math.min(calories / dailyTarget * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDash = percent / 100 * circumference;
  return /* @__PURE__ */ jsxs8("div", { className: "p-5 rounded-xl border border-zinc-200/60 bg-white flex items-center gap-5", children: [
    /* @__PURE__ */ jsxs8("div", { className: "relative w-24 h-24 shrink-0", children: [
      /* @__PURE__ */ jsxs8("svg", { viewBox: "0 0 100 100", className: "w-full h-full -rotate-90", children: [
        /* @__PURE__ */ jsx13("circle", { cx: "50", cy: "50", r: "40", fill: "none", stroke: "currentColor", strokeWidth: "8", className: "text-zinc-200" }),
        /* @__PURE__ */ jsx13(
          "circle",
          {
            cx: "50",
            cy: "50",
            r: "40",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "8",
            strokeLinecap: "round",
            strokeDasharray: `${strokeDash} ${circumference}`,
            className: "text-orange-400 transition-all duration-700"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs8("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx13("span", { className: "text-lg font-bold tabular-nums", children: Math.round(calories) }),
        /* @__PURE__ */ jsx13("span", { className: "text-xs text-zinc-400", children: "kcal" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsx13("p", { className: "font-semibold text-zinc-900", children: "Calories" }),
      /* @__PURE__ */ jsx13("p", { className: "text-sm text-zinc-500", children: "per 100g" }),
      /* @__PURE__ */ jsxs8("p", { className: "text-xs text-zinc-400", children: [
        Math.round(percent),
        "% of ",
        dailyTarget.toLocaleString(),
        " kcal daily reference"
      ] })
    ] })
  ] });
}
function ProductNutrition({ product }) {
  const n = product.nutriments;
  if (!n) {
    return /* @__PURE__ */ jsx13("div", { className: "text-center py-10 text-zinc-500", children: /* @__PURE__ */ jsx13("p", { children: "Nutrition data not available for this product." }) });
  }
  const calories = n.energy_kcal_100g;
  return /* @__PURE__ */ jsxs8("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx13("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx13("p", { className: "text-xs text-zinc-400", children: "All values per 100g unless noted" }) }),
    calories != null && /* @__PURE__ */ jsx13(CalorieRing, { calories }),
    /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsx13(MacroCard, { label: "Protein", value: n.proteins_100g, unit: "g", color: "#4ade80", max: 30, description: "Muscle & repair" }),
      /* @__PURE__ */ jsx13(MacroCard, { label: "Carbs", value: n.carbohydrates_100g, unit: "g", color: "#60a5fa", max: 100, description: "Primary energy" }),
      /* @__PURE__ */ jsx13(MacroCard, { label: "of which Sugars", value: n.sugars_100g, unit: "g", color: "#f97316", max: 50 }),
      /* @__PURE__ */ jsx13(MacroCard, { label: "Fat", value: n.fat_100g, unit: "g", color: "#a78bfa", max: 50 }),
      /* @__PURE__ */ jsx13(MacroCard, { label: "Saturated Fat", value: n.saturated_fat_100g, unit: "g", color: "#fb7185", max: 20 }),
      /* @__PURE__ */ jsx13(MacroCard, { label: "Fiber", value: n.fiber_100g, unit: "g", color: "#34d399", max: 15, description: "Digestive health" })
    ] }),
    (n.sodium_100g != null || n.salt_100g != null) && /* @__PURE__ */ jsxs8("div", { className: "grid grid-cols-2 gap-3", children: [
      n.sodium_100g != null && /* @__PURE__ */ jsx13(MacroCard, { label: "Sodium", value: n.sodium_100g * 1e3, unit: "mg", color: "#fbbf24", max: 500 }),
      n.salt_100g != null && /* @__PURE__ */ jsx13(MacroCard, { label: "Salt", value: n.salt_100g, unit: "g", color: "#94a3b8", max: 3 })
    ] })
  ] });
}

// src/components/product-ingredients.tsx
import { useState as useState2 } from "react";
import { Fragment as Fragment4, jsx as jsx14, jsxs as jsxs9 } from "react/jsx-runtime";
var ALLERGEN_HIGHLIGHT_WORDS = [
  "peanut",
  "milk",
  "egg",
  "wheat",
  "soy",
  "gluten",
  "tree nut",
  "shellfish",
  "fish",
  "sesame",
  "almond",
  "cashew",
  "walnut",
  "pecan",
  "hazelnut",
  "pistachio",
  "lactose",
  "dairy"
];
function highlightIngredients(text, allergens) {
  if (!text) return /* @__PURE__ */ jsx14(Fragment4, {});
  const lowerText = text.toLowerCase();
  const parts = [];
  let lastIndex = 0;
  const wordsToHighlight = [
    ...ALLERGEN_HIGHLIGHT_WORDS,
    ...allergens.map((a) => a.toLowerCase())
  ];
  const positions = [];
  for (const word of wordsToHighlight) {
    let idx = lowerText.indexOf(word, 0);
    while (idx !== -1) {
      positions.push({ start: idx, end: idx + word.length });
      idx = lowerText.indexOf(word, idx + 1);
    }
  }
  positions.sort((a, b) => a.start - b.start);
  const merged = [];
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
    return /* @__PURE__ */ jsx14("span", { children: text });
  }
  return /* @__PURE__ */ jsx14(Fragment4, { children: parts.map(
    (part, i) => part.isAllergen ? /* @__PURE__ */ jsx14(
      "mark",
      {
        className: "bg-amber-100 text-amber-900 rounded px-0.5 not-italic font-medium",
        children: part.text
      },
      i
    ) : /* @__PURE__ */ jsx14("span", { children: part.text }, i)
  ) });
}
function ProductIngredients({ product }) {
  const [expanded, setExpanded] = useState2(false);
  const allergens = extractAllergens(product);
  const additives = extractAdditives(product);
  const text = product.ingredients_text_en || product.ingredients_text || "";
  const isLong = text.length > 300;
  return /* @__PURE__ */ jsxs9("div", { className: "space-y-5", children: [
    allergens.length > 0 && /* @__PURE__ */ jsxs9("div", { className: "p-4 rounded-xl border border-amber-200 bg-amber-50 space-y-2", children: [
      /* @__PURE__ */ jsxs9("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs9("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-amber-600", children: [
          /* @__PURE__ */ jsx14("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" }),
          /* @__PURE__ */ jsx14("path", { d: "M12 9v4" }),
          /* @__PURE__ */ jsx14("path", { d: "M12 17h.01" })
        ] }),
        /* @__PURE__ */ jsx14("p", { className: "text-sm font-semibold text-amber-800", children: "Allergen Information" })
      ] }),
      /* @__PURE__ */ jsx14("div", { className: "flex flex-wrap gap-1.5", children: allergens.map((a) => /* @__PURE__ */ jsx14(Badge, { className: "bg-amber-200 text-amber-900 hover:bg-amber-200 text-xs font-medium border-0", children: a }, a)) })
    ] }),
    text ? /* @__PURE__ */ jsxs9("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx14("h3", { className: "text-sm font-semibold text-zinc-900", children: "Ingredients" }),
      /* @__PURE__ */ jsxs9("div", { className: "text-sm text-zinc-500 leading-relaxed", children: [
        /* @__PURE__ */ jsx14("p", { className: !expanded && isLong ? "line-clamp-4" : "", children: highlightIngredients(text, allergens) }),
        isLong && /* @__PURE__ */ jsx14(
          "button",
          {
            onClick: () => setExpanded(!expanded),
            className: "text-xs text-[#FFA551] font-medium mt-2 hover:underline",
            children: expanded ? "Show less" : "Show full ingredients"
          }
        )
      ] }),
      allergens.length > 0 && /* @__PURE__ */ jsx14("p", { className: "text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg inline-block", children: "Highlighted ingredients may contain allergens" })
    ] }) : /* @__PURE__ */ jsx14("p", { className: "text-sm text-zinc-400", children: "Ingredients list not available." }),
    additives.length > 0 && /* @__PURE__ */ jsxs9("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx14("h3", { className: "text-sm font-semibold text-zinc-900", children: "Additives" }),
      /* @__PURE__ */ jsx14("div", { className: "flex flex-wrap gap-1.5", children: additives.map((a) => /* @__PURE__ */ jsx14(Badge, { variant: "outline", className: "text-xs font-mono text-zinc-500 border-zinc-200/60", children: a }, a)) }),
      /* @__PURE__ */ jsxs9("p", { className: "text-xs text-zinc-400", children: [
        additives.length,
        " additive",
        additives.length !== 1 ? "s" : "",
        " detected"
      ] })
    ] })
  ] });
}

// src/components/product-detail-page.tsx
import { useEffect as useEffect2, useState as useState3 } from "react";
import { Fragment as Fragment5, jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
function DefaultSkeleton() {
  return /* @__PURE__ */ jsxs10("div", { className: "space-y-4 animate-pulse", children: [
    /* @__PURE__ */ jsx15("div", { className: "rounded-2xl border border-zinc-200/60 bg-white p-6", children: /* @__PURE__ */ jsxs10("div", { className: "flex flex-col md:flex-row gap-8 md:gap-12 items-start", children: [
      /* @__PURE__ */ jsx15("div", { className: "w-full md:w-72 md:shrink-0 aspect-square rounded-2xl bg-zinc-100" }),
      /* @__PURE__ */ jsxs10("div", { className: "flex-1 space-y-4 w-full", children: [
        /* @__PURE__ */ jsx15("div", { className: "h-3 w-24 bg-zinc-100 rounded" }),
        /* @__PURE__ */ jsx15("div", { className: "h-8 w-2/3 bg-zinc-100 rounded" }),
        /* @__PURE__ */ jsx15("div", { className: "h-4 w-1/3 bg-zinc-100 rounded" }),
        /* @__PURE__ */ jsx15("div", { className: "h-20 w-full bg-zinc-100 rounded-xl" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx15("div", { className: "h-40 rounded-2xl bg-zinc-100" }),
    /* @__PURE__ */ jsx15("div", { className: "h-40 rounded-2xl bg-zinc-100" })
  ] });
}
function DefaultNotFound({ backHref, backLabel }) {
  return /* @__PURE__ */ jsxs10("div", { className: "text-center py-20 space-y-3", children: [
    /* @__PURE__ */ jsx15("p", { className: "text-zinc-500 font-medium", children: "Product not found" }),
    /* @__PURE__ */ jsx15("p", { className: "text-sm text-zinc-400", children: "Check the barcode and try again." }),
    /* @__PURE__ */ jsx15(
      "a",
      {
        href: backHref,
        className: "text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors inline-block",
        children: backLabel
      }
    )
  ] });
}
function ProductDetailPage({
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
  notFoundSlot
}) {
  const isSelfFetching = product === void 0;
  const [fetchedProduct, setFetchedProduct] = useState3(
    isSelfFetching ? void 0 : product
  );
  useEffect2(() => {
    if (!isSelfFetching) {
      setFetchedProduct(product);
      return;
    }
    if (!barcode) {
      setFetchedProduct(null);
      return;
    }
    let cancelled = false;
    setFetchedProduct(void 0);
    const fn = fetchFn ?? fetchProductByBarcode;
    fn(barcode).then((result) => {
      if (!cancelled) setFetchedProduct(result);
    });
    return () => {
      cancelled = true;
    };
  }, [isSelfFetching, product, barcode, fetchFn]);
  if (fetchedProduct === void 0) {
    return /* @__PURE__ */ jsx15(Fragment5, { children: loadingSlot ?? /* @__PURE__ */ jsx15(DefaultSkeleton, {}) });
  }
  if (fetchedProduct === null) {
    return /* @__PURE__ */ jsx15(Fragment5, { children: notFoundSlot ?? /* @__PURE__ */ jsx15(DefaultNotFound, { backHref, backLabel }) });
  }
  const resolvedProduct = fetchedProduct;
  return /* @__PURE__ */ jsxs10("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx15("div", { className: "rounded-2xl border border-zinc-200/60 bg-white p-6", children: renderHero ? renderHero(resolvedProduct) : /* @__PURE__ */ jsx15(ProductHero, { product: resolvedProduct }) }),
    showNutrition && /* @__PURE__ */ jsx15(SectionCard, { label: "Nutrition", children: renderNutrition ? renderNutrition(resolvedProduct) : /* @__PURE__ */ jsx15(ProductNutrition, { product: resolvedProduct }) }),
    showIngredients && /* @__PURE__ */ jsx15(SectionCard, { label: "Ingredients", children: renderIngredients ? renderIngredients(resolvedProduct) : /* @__PURE__ */ jsx15(ProductIngredients, { product: resolvedProduct }) }),
    extraSections?.(resolvedProduct),
    showAttribution && /* @__PURE__ */ jsxs10("div", { className: "pt-2 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs10("div", { className: "space-y-1 text-xs text-zinc-400", children: [
        /* @__PURE__ */ jsxs10("p", { children: [
          "Barcode: ",
          /* @__PURE__ */ jsx15("span", { className: "font-mono font-medium text-zinc-600", children: resolvedProduct.code })
        ] }),
        /* @__PURE__ */ jsxs10("p", { children: [
          "Data from",
          " ",
          /* @__PURE__ */ jsx15(
            "a",
            {
              href: `https://world.openfoodfacts.org/product/${resolvedProduct.code}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "underline underline-offset-2 hover:text-zinc-700 transition-colors",
              children: "Open Food Facts \u2197"
            }
          ),
          " ",
          "\xB7 ODbL license"
        ] })
      ] }),
      /* @__PURE__ */ jsxs10("a", { href: backHref, className: "text-xs text-zinc-400 hover:text-zinc-700 transition-colors", children: [
        "\u2190 ",
        backLabel
      ] })
    ] })
  ] });
}
export {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  NUTRISCORE_ORDER,
  PageHeader,
  ProductCard,
  ProductDetailPage,
  ProductHero,
  ProductIngredients,
  ProductNutrition,
  ProductsPage,
  ProductsToolbar,
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
  SectionCard,
  Separator,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  badgeVariants,
  buttonVariants,
  cn,
  extractAdditives,
  extractAllergens,
  extractLabels,
  fetchProductByBarcode,
  getBrand,
  getBroadCategory,
  getCategory,
  getEcoScoreBadgeStyle,
  getNovaBadgeStyle,
  getNutriScoreColor,
  getNutriScorePillStyle,
  getNutriScoreTextColor,
  getProductName,
  tabsListVariants
};
//# sourceMappingURL=index.js.map