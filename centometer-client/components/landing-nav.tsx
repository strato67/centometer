import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function LandingNavbar(){
    return (
        <header className="bg-background sticky top-0 z-40 w-full border-b border-border">
          <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="font-bold">Acme Inc</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
                About
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
                Services
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="hidden rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:inline-flex"
                prefetch={false}
              >
                Get Started
              </Link>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <MenuIcon className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-xs">
                  <div className="flex flex-col gap-6 p-6">
                    <Link href="#" className="flex items-center gap-2" prefetch={false}>
                      <MountainIcon className="h-6 w-6" />
                      <span className="font-bold">Acme Inc</span>
                    </Link>
                    <nav className="grid gap-4">
                      <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
                        Home
                      </Link>
                      <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
                        About
                      </Link>
                      <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
                        Services
                      </Link>
                      <Link href="#" className="text-sm font-medium hover:text-primary" prefetch={false}>
                        Contact
                      </Link>
                    </nav>
                    <Link
                      href="#"
                      className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      prefetch={false}
                    >
                      Get Started
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>
      )
}

function MenuIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }
  
  
  function MountainIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }
  
  
  function XIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }