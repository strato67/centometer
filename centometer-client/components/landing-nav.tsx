import Link from "next/link";
import { ToggleMode } from "./toggle-mode";
import { BarChartIcon } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b border-border">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BarChartIcon className="h-6 w-6" />
          <span className="font-bold">Centometer</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            prefetch={false}
          >
            Get Started
          </Link>
          <ToggleMode />
        </div>
      </div>
    </header>
  );
}

