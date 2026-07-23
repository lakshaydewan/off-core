import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetailPage as OffProductDetailPage } from "@off/ui";
import { SettingsButton } from "@/components/settings-button";
import { fetchProduct, CURATED_PRODUCTS } from "@/lib/off-api";

export const revalidate = 3600;

export async function generateStaticParams() {
  return CURATED_PRODUCTS.map((p) => ({ barcode: p.barcode }));
}

interface PageProps {
  params: Promise<{ barcode: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { barcode } = await params;
  const product = await fetchProduct(barcode);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border sticky top-0 bg-card z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Image
              src="https://static.openfoodfacts.org/images/logos/off-logo-horizontal-dark.svg"
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
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Products
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <OffProductDetailPage product={product} backHref="/products" />
      </main>
    </div>
  );
}
