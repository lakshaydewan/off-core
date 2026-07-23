import { ProductsPageNav } from "@/components/products-page-nav";
import { ProductsPageContent } from "@/components/products-page-content";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProductsPageNav />
      <ProductsPageContent />
    </div>
  );
}
