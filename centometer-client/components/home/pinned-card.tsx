"use client";
import { Button } from "@/components/ui/button";
import SymbolOverview from "../widgets/symbol-overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function PinnedCard() {
  const tickers = ["NASDAQ:NVDA", "NASDAQ:AMD", "NASDAQ:INTC", "NASDAQ:AAPL", "NASDAQ:GOOGL", "NASDAQ:META"];

  return (
    <>
      <Card className="w-96 md:w-full rounded-2xl p-4 pb-12 ">
        <CardHeader className="flex flex-row w-full justify-between">
          <div className="space-y-1.5">
            <CardTitle>Pinned Stocks</CardTitle>
            <CardDescription>
              One day activity of your pinned stocks
            </CardDescription>
          </div>
          <Button className="ml-6">Add Ticker</Button>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full h-full ">
            <CarouselContent>
              {tickers.map((ticker, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <SymbolOverview ticker={ticker} />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </CardContent>
      </Card>
    </>
  );
}
