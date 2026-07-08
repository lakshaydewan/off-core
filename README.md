# OFF Canada P3 — UI/UX Prototype

A modern product experience built on top of [Open Food Facts](https://world.openfoodfacts.org/) data.

## What This Is

A UI/UX prototype exploring what a cleaner, more modern Open Food Facts product page could look like — with a focus on:

- **Information architecture** — presenting dense nutrition data without overwhelming the user
- **Plugin-based insight cards** — contextual views like Gym Mode, Parent Mode, Allergy Mode
- **Mobile-first design** — inspired by Apple Health, Linear, and modern nutrition apps

This is a frontend-only exploration. No backend, no database, no search engine — just real OFF API data presented through a thoughtful UI.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx                   # Homepage — concept intro
  products/
    page.tsx                 # Product listing (5 curated products)
    [barcode]/
      page.tsx               # Product detail page
components/
  hero-section.tsx           # Product image, name, brand, labels
  nutrition-overview.tsx     # Calories, macros, visual indicators
  ingredients-panel.tsx      # Ingredients with allergen/additive highlights
  plugin-cards.tsx           # Gym / Parent / Allergy insight cards
  product-card.tsx           # Listing card
lib/
  off-api.ts                 # Open Food Facts API helpers
  types.ts                   # Shared TypeScript types
```

## Sample Products

| Product | Barcode |
|---|---|
| Kirkland Peanut Butter | 0096619872831 |
| Clif Bar (Chocolate Chip) | 0722252100061 |
| Cheerios | 0016000275287 |
| Coca-Cola Classic | 4056489174448 |
| Activia Strawberry Yogurt | 0056800370933 |

## Design Principles

- **Clarity over completeness** — surface what matters, hide the noise
- **Progressive disclosure** — key info upfront, details on demand
- **Contextual insights** — plugin cards adapt tone to the user's lens
- **Mobile-first** — layouts that work on a phone before a desktop

## Success Criteria

1. Can OFF data be presented more clearly?
2. How should plugin insights appear in the experience?
3. What does a modern OFF product page look like?
4. Which UI patterns improve product understanding and transparency?
