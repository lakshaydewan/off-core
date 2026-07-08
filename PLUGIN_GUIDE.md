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

The product detail page (`/products/[barcode]`) is core-only — no plugin injection. If a plugin wants a custom product view, it handles routing internally within its iframe.

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
import { parentPlugin } from "./plugins/parent";
import { nlSearchPlugin } from "./plugins/nl-search";
import { yourPlugin } from "./plugins/your-plugin"; // ← add this
import type { Plugin } from "./plugin-types";

export const ALL_PLUGINS: Plugin[] = [
  gymPlugin,
  parentPlugin,
  nlSearchPlugin,
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

## Existing plugins

| Plugin | Dev URL | Env var |
|---|---|---|
| NL Search | `http://localhost:3001` | `NEXT_PUBLIC_NL_SEARCH_URL` *(unused, hardcoded)* |
| Gym | `http://localhost:3002` | `NEXT_PUBLIC_GYM_PLUGIN_URL` |
| Parent | `http://localhost:3003` | `NEXT_PUBLIC_PARENT_PLUGIN_URL` |
