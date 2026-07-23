import Image from "next/image";
import Link from "next/link";
import { SettingsButton } from "@/components/settings-button";

export function ProductsPageNav() {
  return (
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
          <span className="text-sm font-medium text-foreground">Products</span>
        </div>
      </div>
    </nav>
  );
}
