import Link from "next/link"
import LandingNavbar from "@/components/landing-nav"
import Footer from "@/components/footer"
import Image from "next/image"

export default function Page() {
  return (
    <>
    <LandingNavbar/>
    <div className="flex flex-col min-h-[100dvh]">

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock the Power of Stock Sentiment
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our platform analyzes millions of data points to provide you with real-time insights into the
                    sentiment surrounding your favorite stocks.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <Image
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a suite of powerful features to help you make informed investment decisions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Real-Time Sentiment</div>
                <h3 className="text-xl font-bold">Stay Ahead of the Curve</h3>
                <p className="text-muted-foreground">
                  Our platform analyzes millions of data points in real-time to provide you with up-to-the-minute
                  insights into the sentiment surrounding your favorite stocks.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Customizable Alerts</div>
                <h3 className="text-xl font-bold">Never Miss a Beat</h3>
                <p className="text-muted-foreground">
                  Set custom alerts to stay informed about the latest sentiment shifts, so you can make timely
                  investment decisions.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Detailed Analytics</div>
                <h3 className="text-xl font-bold">Uncover Insights</h3>
                <p className="text-muted-foreground">
                  Dive deep into the data with our comprehensive analytics tools, and uncover the trends and patterns
                  that can give you an edge in the market.
                </p>
              </div>
            </div>
          </div>
        </section>
       
      </main>
      <Footer/>
    </div>
    </>
    
  )
}