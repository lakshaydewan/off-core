import { ProductsPageNav } from "@/components/products-page-nav";
import { ProductsPageContent } from "@/components/products-page-content";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <ProductsPageNav />
      <ProductsPageContent />
    </div>
  );
}
