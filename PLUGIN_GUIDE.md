# Plugin Guide

Plugins are independent web apps built and deployed by separate teams. The core OFF app knows nothing about their internals — it just renders them in a full-page `<iframe>` when the user activates that mode. Teams own their entire product experience: their own stack, their own deployment, their own data fetching.

---

## How it works

When the user selects a plugin (e.g. "Gym"), the core app replaces the browse page content with an `<iframe>` pointing to that plugin's deployed URL. The core nav stays fixed at the top (56px). The plugin fills the remaining viewport height.

```
┌─────────────────────────────────────┐
│  OFF Nav  (core app, always visible) │  56px
├─────────────────────────────────────┤
│                                     │
│   <iframe src="https://gym.app" />  │  calc(100vh - 56px)
│                                     │
│   (plugin team's full-page app)     │
│                                     │
└─────────────────────────────────────┘
```

The product detail page (`/products/[barcode]`) is core-only — no plugin injection. If a plugin wants a custom product view, it handles routing internally within its iframe. It can still match the core look exactly by using the `ProductDetailPage` component from `@lakshaydewan/off-ui` — see [Using the OFF design system](#using-the-off-design-system-lakshaydewanoff-ui) below.

---

## The Plugin interface

```ts
// lib/plugin-types.ts

export interface Plugin {
  id: string;          // unique slug, e.g. "gym"
  name: string;        // shown in the mode selector in the nav
  description?: string;

  // Replaces the browse page with an iframe to the plugin's deployed app.
  PageOverride?: React.FC;
}
```

---

## Step-by-step: registering a new plugin

### Step 1 — Create the folder

```
lib/plugins/
  your-plugin/
    page-override.tsx
    index.ts
```

### Step 2 — Write `page-override.tsx`

```tsx
"use client";

export function YourPluginPageOverride() {
  const src = process.env.NEXT_PUBLIC_YOUR_PLUGIN_URL ?? "http://localhost:3004";
  return (
    <iframe
      src={src}
      className="w-full border-0"
      style={{ height: "calc(100vh - 56px)" }}
      title="Your Plugin Name"
    />
  );
}
```

Use an env var so the URL is configurable per environment without code changes. The fallback `localhost` port is used during development.

### Step 3 — Write `index.ts`

```ts
import { YourPluginPageOverride } from "./page-override";
import type { Plugin } from "@/lib/plugin-types";

export const yourPlugin: Plugin = {
  id: "your-plugin",      // unique, URL-safe, lowercase
  name: "Your Plugin",    // shown in the mode selector
  description: "One-line description of what this plugin does.",
  PageOverride: YourPluginPageOverride,
};
```

### Step 4 — Register it

Open `lib/plugin-registry.ts` and add one import and one array entry:

```ts
import { gymPlugin } from "./plugins/gym";
import { nlSearchPlugin } from "./plugins/nl-search";
import { compareProductsPlugin } from "./plugins/compare-products";
import { yourPlugin } from "./plugins/your-plugin"; // ← add this
import type { Plugin } from "./plugin-types";

export const ALL_PLUGINS: Plugin[] = [
  gymPlugin,
  nlSearchPlugin,
  compareProductsPlugin,
  yourPlugin, // ← add this
];
```

### Step 5 — Set the env var

In `.env.local` (dev) or your deployment environment:

```
NEXT_PUBLIC_YOUR_PLUGIN_URL=https://your-plugin.example.com
```

---

## Building the plugin app (independent team)

The plugin is a fully independent web app — any stack, any framework. It is deployed at its own URL and has no build-time dependency on the core OFF app.

**Recommended starting point:** Create Next.js App

```bash
npx create-next-app@latest gym-plugin
```

**Things the plugin app is responsible for:**
- Fetching product data (directly from the Open Food Facts API, or from its own backend)
- Its own routing (if it has multiple screens)
- Its own auth, state management, and UI
- Its own deployment pipeline

**Communicating with the host (if needed):**

The host currently passes no data to the iframe. If your plugin needs context from the host (e.g. the user's country), use `postMessage`:

```ts
// In the host app (core OFF):
iframeRef.current?.contentWindow?.postMessage({ country: "CA" }, pluginOrigin);

// In the plugin app:
window.addEventListener("message", (e) => {
  if (e.origin !== "https://off-app.example.com") return;
  const { country } = e.data;
});
```

For product-specific data, use the Open Food Facts API directly from within the plugin:

```ts
const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
const { product } = await res.json();
```

---

## Using the OFF design system (`@lakshaydewan/off-ui`)

You don't have to build your product UI from scratch. The core app's own browse and
product-detail pages are just thin wrappers around components published in
`@lakshaydewan/off-ui` — the same package is available to plugin teams, so your
iframe'd app can match the core look with almost no code.

```bash
npm install @lakshaydewan/off-ui
```

**Required:** import the design tokens once in your global CSS, or font sizes and
theme tokens will be wrong:

```css
/* globals.css */
@import "@lakshaydewan/off-ui/styles.css";
```

### Browse view — `ProductsPage`

Self-fetches the OFF Canada catalog and gives you search, category filters, and
sort for free:

```tsx
"use client";
import { ProductsPage } from "@lakshaydewan/off-ui";

export default function BrowsePage() {
  return <ProductsPage heading="Browse" countryTag="Canada" />;
}
```

Every layer is overridable if you need to diverge — see `ProductsPageProps`
(`searchFn`, `renderCard`, `cardHref`, `idleSlot`, `showCategories`, `showSort`, etc.).

### Product detail view — `ProductDetailPage`

The core app's `/products/[barcode]` route is core-only routing-wise (see above),
but as of `off-ui@1.6.0` the same visual page — hero, Nutri-Score/NOVA/Eco-Score,
nutrition breakdown, ingredients with allergen highlighting — is exported so your
plugin can build its own detail route with visual parity:

```tsx
"use client";
import { ProductDetailPage } from "@lakshaydewan/off-ui";

export default function PluginProductPage({ params }: { params: { barcode: string } }) {
  // barcode prop → self-fetches from the Open Food Facts API client-side.
  // Pass `product` instead if you already fetched it yourself (e.g. server-side).
  return <ProductDetailPage barcode={params.barcode} backHref="/" />;
}
```

**Injecting plugin-specific content:** use `extraSections` to add a contextual
card — e.g. a Gym plugin's "fits your macros" insight — without forking the page.
It's rendered after Ingredients, before the attribution footer, and `SectionCard`
is exported so it matches the surrounding visual rhythm:

```tsx
import { ProductDetailPage, SectionCard } from "@lakshaydewan/off-ui";

<ProductDetailPage
  barcode={barcode}
  extraSections={(product) => (
    <SectionCard label="Gym Mode">
      <p className="text-sm text-zinc-600">
        {product.nutriments?.proteins_100g ?? 0}g protein per 100g — fits your macros.
      </p>
    </SectionCard>
  )}
/>
```

Other useful escape hatches on `ProductDetailPageProps`: `renderHero` /
`renderNutrition` / `renderIngredients` (full replacement of a section),
`showNutrition` / `showIngredients` / `showAttribution` (hide a section entirely),
and `fetchFn` (override how the product is fetched). The individual sections —
`ProductHero`, `ProductNutrition`, `ProductIngredients` — are also exported
standalone if you'd rather compose your own layout than use the full page.

---

## Existing plugins

| Plugin | Dev URL | Env var |
|---|---|---|
| NL Search | `http://localhost:3001` | `NEXT_PUBLIC_NL_SEARCH_URL` *(unused, hardcoded)* |
| Gym | `http://localhost:3002` | `NEXT_PUBLIC_GYM_PLUGIN_URL` |
| Compare Products | `http://localhost:3004` | `NEXT_PUBLIC_COMPARE_PRODUCTS_PLUGIN_URL` |
