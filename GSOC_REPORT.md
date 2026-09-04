# GSoC Work Product — OFF Canada Plugin Ecosystem & Design System

**Contributor:** [lakshaydewan](https://github.com/lakshaydewan)
**Organization:** Open Food Facts
**Mentor:** Louis Bastarache
**Program:** Google Summer of Code, 2026
**Repository:** https://github.com/lakshaydewan/off-core
**Package:** https://www.npmjs.com/package/@lakshaydewan/off-ui
**Live app:** https://off-core-95u1.vercel.app/

---

## Project Description

Open Food Facts wanted a way for independent teams — regional efforts like OFF Canada, and feature-specific experiments like "Gym Mode" or product comparison — to ship their own product experiences without forking or coordinating releases with the core app, while still looking and feeling like one product.

This project delivers that: a core Next.js app (`off-core`) that hosts third-party "plugins" as full-page iframes behind a mode switcher, plus a shared design-system package, `@lakshaydewan/off-ui`, that any plugin team can install to get the core's browse and product-detail UI — Nutri-Score, NOVA, Eco-Score, nutrition breakdown, allergen-highlighted ingredients — with almost no code of their own.

**Goals:**
1. Let plugin teams own their entire stack, deployment, and release cycle independently of the core app.
2. Give those teams a drop-in design system so their plugin still looks like part of Open Food Facts.
3. Prove the model with real, working plugins, not just the scaffolding.

## Architecture

```
┌─────────────────────────────────────┐
│  OFF Nav  (core app, always visible) │  56px
├─────────────────────────────────────┤
│   <iframe src="https://gym.app" />   │  calc(100vh - 56px)
│   (plugin team's independently       │
│    deployed app — any stack)         │
└─────────────────────────────────────┘
```

- The core app knows nothing about a plugin's internals — it renders a full-page `<iframe>` to that plugin's deployed URL, keyed off a `Plugin` interface (`id`, `name`, `description`, `PageOverride`) registered in `lib/plugin-registry.ts`.
- `@lakshaydewan/off-ui` exports `ProductsPage` (self-fetching browse view with search/category/sort) and `ProductDetailPage` (hero, scores, nutrition, ingredients), plus an `extraSections` slot (`SectionCard`) so a plugin can inject its own contextual card — e.g. "12g protein per 100g — fits your macros" — without forking the page.
- The core app is the design system's own first consumer: `app/products/[barcode]/page.tsx` renders `ProductDetailPage` from the package, not a hand-rolled copy, so the core team feels any breaking change before a plugin team does.
- The model is validated by three independent consumers — [`gym-plugin-prototype`](https://github.com/lakshaydewan/gym-plugin-prototype), [`nl-search-prototype`](https://github.com/lakshaydewan/nl-search-prototype), and [`compare-products-plugin`](https://github.com/lakshaydewan/compare-products-plugin) — each a separate repository and Vercel deployment that installs `@lakshaydewan/off-ui@1.7.0` from npm like any third-party team would, rather than importing from this monorepo.

Full design rationale and integration steps for plugin teams: [`PLUGIN_GUIDE.md`](./PLUGIN_GUIDE.md).

## Accomplishments

| Milestone | Commit |
|---|---|
| Bootstrapped the core app — product browse & detail pages, curated OFF Canada catalog, settings — plus the plugin architecture (`Plugin` interface, registry, context) and the first `@lakshaydewan/off-ui` package (`ProductsPage` and primitives: `Button`, `Card`, `Badge`, `Tabs`, etc.) | [`1a00b41`](https://github.com/lakshaydewan/off-core/commit/1a00b41ed8c4eef1416a4a1f3cdba1fd44f15e73) |
| Registered the first two plugins — **Gym** (macro/protein insights) and **NL Search** (natural-language browse) | [`1a00b41`](https://github.com/lakshaydewan/off-core/commit/1a00b41ed8c4eef1416a4a1f3cdba1fd44f15e73), [`1ad8a4d`](https://github.com/lakshaydewan/off-core/commit/1ad8a4d9315b3afb75cbb497d73da4a4adb5cf95) |
| Shipped `ProductDetailPage` in `off-ui` (v1.6.0) — ported the hero/nutrition/ingredients sections into the package behind an `extraSections` extension point, and migrated the core app's own product page onto it, retiring the hand-rolled version | [`4b24dfc`](https://github.com/lakshaydewan/off-core/commit/4b24dfc2fd9f81ed51e78b3e69fda226bebae883) |
| Reskinned `off-ui` to a warm dark theme (`#211B16` bg / `#EAC2A8` accent) across every component, and made `ProductsPage` self-contain its own themed background so consumers don't have to hand-wrap it (v1.7.0) | [`813c368`](https://github.com/lakshaydewan/off-core/commit/813c368fa96029d4ed842fa71d2f6edecbc386cf) |
| Registered the third plugin — **Compare Products** (side-by-side Nutri-Score/NOVA/Eco-Score/nutrition for 2–4 products), source in [compare-products-plugin](https://github.com/lakshaydewan/compare-products-plugin) | [`1d5c22c`](https://github.com/lakshaydewan/off-core/commit/1d5c22cb64b24902635e1667480fca07115517e3) |

All commits merged directly to `main` in the project repository: https://github.com/lakshaydewan/off-core/commits/main

## Current State

Working today:
- Core app: browse page (search, category filter, sort) and product detail page for a curated OFF Canada catalog, backed live by the Open Food Facts API.
- Three registered, independently-deployed plugins, switchable from the nav: Gym, NL Search, Compare Products.
- `@lakshaydewan/off-ui@1.7.0`, published and installable from npm, documented in `PLUGIN_GUIDE.md` for any team wanting to build a fourth.

Live links:
- Core app: https://off-core-95u1.vercel.app/
- Gym plugin: https://gym-plugin-prototype.vercel.app/ — source: [gym-plugin-prototype](https://github.com/lakshaydewan/gym-plugin-prototype), built against `@lakshaydewan/off-ui@1.7.0`
- NL Search plugin: https://nl-search-prototype.vercel.app/ — source: [nl-search-prototype](https://github.com/lakshaydewan/nl-search-prototype), also built against `@lakshaydewan/off-ui@1.7.0`
- Compare Products plugin: https://compare-products-plugin.vercel.app/ — source: [compare-products-plugin](https://github.com/lakshaydewan/compare-products-plugin), also built against `@lakshaydewan/off-ui@1.7.0`

## Known Limitations / Remaining Work

- This is a frontend-only prototype: no backend, no database, no custom search index — everything reads live from the public OFF API, so it's scoped to demonstrating the UI/plugin model, not production data infrastructure.
- The host currently passes no context (e.g. user country) into plugin iframes; `PLUGIN_GUIDE.md` documents a `postMessage` pattern for this but no plugin uses it yet.
- No automated tests; correctness has been verified manually against the live API.

## Lessons Learned

- Iframe isolation is a cheap, effective way to let independent teams ship at their own pace without a shared build/release pipeline — the cost is that the core app can only offer conventions (a design-system package, a documented interface), not enforcement.
- Making the core app consume its own design-system package (rather than just publishing it for others) caught integration issues — like the dark-theme reskin's ripple effects — before any plugin team would have hit them.
- Ported components needed their styling decoupled from the app's local Tailwind config (hardcoded `zinc`/`orange` classes) into theme tokens shipped with the package itself — without that, "drop-in" for a plugin team would have meant "drop-in, then re-theme by hand."

---
*Format follows [Google's GSoC work product guidelines](https://developers.google.com/open-source/gsoc/help/work-product).*
