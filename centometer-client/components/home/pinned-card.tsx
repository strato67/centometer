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
import Link from "next/link";
import { getUserPinnedStocks } from "@/app/actions/stock-info";
import { useEffect, useState } from "react";

export default function PinnedCard() {
  const [tickers, setTickers] = useState<string[]>()

  useEffect(()=>{
    (async () => {
      setTickers(await getUserPinnedStocks())
    })()

  },[])

  return (
    <>
      <Card className="w-full rounded-2xl pb-4 pt-2 min-h-80 max-h-fit">
        <CardHeader className="flex flex-row w-full justify-between">
          <div className="space-y-1.5">
            <CardTitle>Pinned Stocks</CardTitle>
            <CardDescription>
              One day activity of your pinned stocks
            </CardDescription>
          </div>
          <Link href={"/dashboard/watchlist"}>
          <Button className="ml-6">Add Symbol</Button>
          </Link>
        </CardHeader>
        <CardContent className="px-10 md:px-8">
          <Carousel className="w-full h-full ">
            <CarouselContent>
              {tickers && tickers.map((ticker, index) => {
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
