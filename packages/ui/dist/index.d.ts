import * as react from 'react';
import { ReactNode } from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { useRender } from '@base-ui/react/use-render';
import { VariantProps } from 'class-variance-authority';
import { Button as Button$1 } from '@base-ui/react/button';
import { Progress as Progress$1 } from '@base-ui/react/progress';
import { Separator as Separator$1 } from '@base-ui/react/separator';
import { Tabs as Tabs$1 } from '@base-ui/react/tabs';
import { ClassValue } from 'clsx';

declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Badge({ className, variant, render, ...props }: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>): react.ReactElement<unknown, string | react.JSXElementConstructor<any>>;

declare const buttonVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Button({ className, variant, size, ...props }: Button$1.Props & VariantProps<typeof buttonVariants>): react.JSX.Element;

declare function Card({ className, size, ...props }: react.ComponentProps<"div"> & {
    size?: "default" | "sm";
}): react.JSX.Element;
declare function CardHeader({ className, ...props }: react.ComponentProps<"div">): react.JSX.Element;
declare function CardTitle({ className, ...props }: react.ComponentProps<"div">): react.JSX.Element;
declare function CardDescription({ className, ...props }: react.ComponentProps<"div">): react.JSX.Element;
declare function CardAction({ className, ...props }: react.ComponentProps<"div">): react.JSX.Element;
declare function CardContent({ className, ...props }: react.ComponentProps<"div">): react.JSX.Element;
declare function CardFooter({ className, ...props }: react.ComponentProps<"div">): react.JSX.Element;

declare function Progress({ className, children, value, ...props }: Progress$1.Root.Props): react.JSX.Element;
declare function ProgressTrack({ className, ...props }: Progress$1.Track.Props): react.JSX.Element;
declare function ProgressIndicator({ className, ...props }: Progress$1.Indicator.Props): react.JSX.Element;
declare function ProgressLabel({ className, ...props }: Progress$1.Label.Props): react.JSX.Element;
declare function ProgressValue({ className, ...props }: Progress$1.Value.Props): react.JSX.Element;

declare function Separator({ className, orientation, ...props }: Separator$1.Props): react.JSX.Element;

declare function Skeleton({ className, ...props }: react.ComponentProps<"div">): react.JSX.Element;

declare function Tabs({ className, orientation, ...props }: Tabs$1.Root.Props): react.JSX.Element;
declare const tabsListVariants: (props?: ({
    variant?: "default" | "line" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function TabsList({ className, variant, ...props }: Tabs$1.List.Props & VariantProps<typeof tabsListVariants>): react.JSX.Element;
declare function TabsTrigger({ className, ...props }: Tabs$1.Tab.Props): react.JSX.Element;
declare function TabsContent({ className, ...props }: Tabs$1.Panel.Props): react.JSX.Element;

declare function cn(...inputs: ClassValue[]): string;

type SortKey = "default" | "name" | "nutriscore" | "calories";
interface ProductsToolbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isSearching: boolean;
    categories: string[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    sort: SortKey;
    onSortChange: (sort: SortKey) => void;
    isSearchMode: boolean;
    isBarcode: boolean;
    resultCount: number;
    totalCount: number;
    /** Tailwind top-* class for the sticky position. Defaults to "top-14" (below a 56px nav). */
    stickyTop?: string;
    /** Show the category filter pills in browse mode. Defaults to true. */
    showCategories?: boolean;
    /** Show the sort dropdown. Defaults to true. */
    showSort?: boolean;
}
declare function ProductsToolbar({ searchQuery, onSearchChange, isSearching, categories, activeCategory, onCategoryChange, sort, onSortChange, isSearchMode, isBarcode, resultCount, totalCount, stickyTop, showCategories, showSort, }: ProductsToolbarProps): react.JSX.Element;

interface PageHeaderProps {
    heading: string;
    countryTag?: string;
    subtitle?: string;
}
declare function PageHeader({ heading, countryTag, subtitle }: PageHeaderProps): react.JSX.Element;

interface Nutriments {
    energy_kcal_100g?: number;
    proteins_100g?: number;
    carbohydrates_100g?: number;
    sugars_100g?: number;
    fat_100g?: number;
    saturated_fat_100g?: number;
    fiber_100g?: number;
    sodium_100g?: number;
    salt_100g?: number;
    [key: string]: number | undefined;
}
interface OFFProduct {
    code: string;
    product_name: string;
    product_name_en?: string;
    brands?: string;
    categories?: string;
    categories_tags?: string[];
    image_url?: string;
    image_front_url?: string;
    image_front_small_url?: string;
    nutriscore_grade?: string;
    ecoscore_grade?: string;
    nova_group?: number;
    nutriments?: Nutriments;
    ingredients_text?: string;
    ingredients_text_en?: string;
    allergens?: string;
    allergens_tags?: string[];
    allergens_hierarchy?: string[];
    additives_tags?: string[];
    additives_original_tags?: string[];
    labels?: string;
    labels_tags?: string[];
    serving_size?: string;
    serving_quantity?: number;
    quantity?: string;
    packaging?: string;
    countries?: string;
    stores?: string;
}

interface ProductCardProps {
    product: OFFProduct;
    cardHref?: (product: OFFProduct) => string;
}
declare function ProductCard({ product, cardHref }: ProductCardProps): react.JSX.Element;

interface ProductsPageProps {
    /**
     * The product catalog to browse in non-search mode.
     * When omitted, ProductsPage fetches the default OFF Canada catalog
     * automatically — no extra code needed.
     * Pass `[]` explicitly to suppress the default fetch (e.g. search-only UIs).
     */
    products?: OFFProduct[];
    heading?: string;
    countryTag?: string;
    subtitle?: string;
    /**
     * Override the search function. Receives the raw query string; should
     * return a promise that resolves to matching OFFProduct[].
     * Defaults to the Open Food Facts text-search API.
     */
    searchFn?: (query: string) => Promise<OFFProduct[]>;
    /** Pre-fill the search bar with this query on mount. */
    initialQuery?: string;
    /**
     * When false, the product grid is hidden until the user types a search
     * query (useful for search-only UIs). Defaults to true.
     */
    showResultsOnMount?: boolean;
    /** Show the category filter pills in browse mode. Defaults to true. */
    showCategories?: boolean;
    /** Show the sort dropdown. Defaults to true. */
    showSort?: boolean;
    /**
     * Tailwind top-* class for the sticky toolbar position.
     * Defaults to "top-14" (below a 56px nav).
     */
    stickyTop?: string;
    /**
     * Completely replaces the default ProductCard.
     * The function receives the product and its index.
     */
    renderCard?: (product: OFFProduct, index: number) => React.ReactNode;
    /**
     * Override the link href for each default ProductCard.
     * Defaults to `/products/${product.code}`.
     */
    cardHref?: (product: OFFProduct) => string;
    /**
     * Rendered in place of the grid when showResultsOnMount=false and no
     * search has been entered yet. Receives a `setQuery` function so you
     * can wire up suggestion chips.
     */
    idleSlot?: (setQuery: (q: string) => void) => React.ReactNode;
}
declare function ProductsPage({ products, heading, countryTag, subtitle, searchFn, initialQuery, showResultsOnMount, showCategories, showSort, stickyTop, renderCard, cardHref, idleSlot, }: ProductsPageProps): react.JSX.Element;

interface SectionCardProps {
    label: string;
    children: ReactNode;
}
declare function SectionCard({ label, children }: SectionCardProps): react.JSX.Element;

interface ProductHeroProps {
    product: OFFProduct;
}
declare function ProductHero({ product }: ProductHeroProps): react.JSX.Element;

interface ProductNutritionProps {
    product: OFFProduct;
}
declare function ProductNutrition({ product }: ProductNutritionProps): react.JSX.Element;

interface ProductIngredientsProps {
    product: OFFProduct;
}
declare function ProductIngredients({ product }: ProductIngredientsProps): react.JSX.Element;

interface ProductDetailPageProps {
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
    /** Show the nutrition section. Defaults to true. */
    showNutrition?: boolean;
    /** Show the ingredients section. Defaults to true. */
    showIngredients?: boolean;
    /** Show the barcode/attribution footer. Defaults to true. */
    showAttribution?: boolean;
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
    /** Href for the "back to products" link. Defaults to "/products". */
    backHref?: string;
    /** Label for the back link. Defaults to "Back to all products". */
    backLabel?: string;
    /** Rendered while self-fetching. Defaults to a skeleton matching the layout. */
    loadingSlot?: React.ReactNode;
    /** Rendered when the product can't be found. */
    notFoundSlot?: React.ReactNode;
}
declare function ProductDetailPage({ product, barcode, fetchFn, showNutrition, showIngredients, showAttribution, renderHero, renderNutrition, renderIngredients, extraSections, backHref, backLabel, loadingSlot, notFoundSlot, }: ProductDetailPageProps): react.JSX.Element;

declare const NUTRISCORE_ORDER: Record<string, number>;
declare function getProductName(product: OFFProduct): string;
declare function getBrand(product: OFFProduct): string;
declare function getCategory(product: OFFProduct): string;
declare function extractLabels(product: OFFProduct): string[];
declare function extractAllergens(product: OFFProduct): string[];
declare function extractAdditives(product: OFFProduct): string[];
declare function getNutriScoreColor(grade?: string): string;
declare function getNutriScoreTextColor(grade?: string): string;
declare function fetchProductByBarcode(barcode: string): Promise<OFFProduct | null>;
declare function getNutriScorePillStyle(grade?: string): string;
declare function getEcoScoreBadgeStyle(grade?: string): string;
declare function getNovaBadgeStyle(nova?: number): string;
declare function getBroadCategory(product: OFFProduct): string;

export { Badge, Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, NUTRISCORE_ORDER, type Nutriments, type OFFProduct, PageHeader, type PageHeaderProps, ProductCard, type ProductCardProps, ProductDetailPage, type ProductDetailPageProps, ProductHero, type ProductHeroProps, ProductIngredients, type ProductIngredientsProps, ProductNutrition, type ProductNutritionProps, ProductsPage, type ProductsPageProps, ProductsToolbar, type ProductsToolbarProps, Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue, SectionCard, type SectionCardProps, Separator, Skeleton, type SortKey, Tabs, TabsContent, TabsList, TabsTrigger, badgeVariants, buttonVariants, cn, extractAdditives, extractAllergens, extractLabels, fetchProductByBarcode, getBrand, getBroadCategory, getCategory, getEcoScoreBadgeStyle, getNovaBadgeStyle, getNutriScoreColor, getNutriScorePillStyle, getNutriScoreTextColor, getProductName, tabsListVariants };
