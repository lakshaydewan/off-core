import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { NutritionOverview } from "@/components/nutrition-overview";
import { IngredientsPanel } from "@/components/ingredients-panel";
import { SettingsButton } from "@/components/settings-button";
import { fetchProduct, CURATED_PRODUCTS } from "@/lib/off-api";

export const revalidate = 3600;

export async function generateStaticParams() {
  return CURATED_PRODUCTS.map((p) => ({ barcode: p.barcode }));
}

interface PageProps {
  params: Promise<{ barcode: string }>;
}

function SectionCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-zinc-200/60 bg-white p-6">
      <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest mb-5">{label}</p>
      {children}
    </div>
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { barcode } = await params;
  const product = await fetchProduct(barcode);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Nav */}
      <nav className="border-b border-zinc-200/60 sticky top-0 bg-white z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image
              src="https://static.openfoodfacts.org/images/logos/off-logo-horizontal-light.svg"
              alt="Open Food Facts"
              width={120}
              height={30}
              className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>
          <div className="flex items-center gap-4">
            <SettingsButton />
            <Link
              href="/products"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              ← Products
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-4">
        {/* Hero */}
        <div className="rounded-2xl border border-zinc-200/60 bg-white p-6">
          <HeroSection product={product} />
        </div>

        {/* Nutrition */}
        <SectionCard label="Nutrition">
          <NutritionOverview product={product} />
        </SectionCard>

        {/* Ingredients */}
        <SectionCard label="Ingredients">
          <IngredientsPanel product={product} />
        </SectionCard>

        {/* Attribution */}
        <div className="pt-2 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1 text-xs text-zinc-400">
            <p>
              Barcode: <span className="font-mono font-medium text-zinc-600">{barcode}</span>
            </p>
            <p>
              Data from{" "}
              <a
                href={`https://world.openfoodfacts.org/product/${barcode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-zinc-700 transition-colors"
              >
                Open Food Facts ↗
              </a>{" "}
              · ODbL license
            </p>
          </div>
          <Link href="/products" className="text-xs text-zinc-400 hover:text-zinc-700 transition-colors">
            ← Back to all products
          </Link>
        </div>
      </main>
    </div>
  );
}
