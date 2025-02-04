"use client";
import { Button } from "@/components/ui/button";
import SymbolOverview from "../widgets/symbol-overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {  GripIcon, MoveDiagonal2Icon } from "lucide-react";
import { LoadingSpinner } from "../ui/loading-spinner";
import CardDropDown from "./card-dropdown";
import { WidgetKeys } from "@/utils/hooks/dashboardlayout";

interface PinnedCardProps {
  onRemove: (widgetKey: WidgetKeys) => Promise<void>;
  widgetKey: WidgetKeys;
}

export default function PinnedCard(props: PinnedCardProps) {
  const [tickers, setTickers] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setTickers(await getUserPinnedStocks());
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Card className="w-full rounded-2xl min-h-80 max-h-fit z-10">
        <div className="flex flex-row px-4 mt-4 mb-0 w-full justify-between">
          <GripIcon size={20} className="drag-handle cursor-grab" />
          <CardDropDown onRemove={props.onRemove} widgetKey={props.widgetKey}/>
        </div>
        <CardHeader className="flex flex-row w-full justify-between -mt-2">
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
          {tickers && tickers.length !== 0 ? (
            <Carousel className="w-full h-full ">
              <CarouselContent>
                {tickers &&
                  tickers.map((ticker, index) => {
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
          ) : (
            <>
              {loading ? (
                <div className="flex items-center justify-center w-full my-16 gap-2">
                  <LoadingSpinner />
                  Loading...
                </div>
              ) : (
                <div className="flex items-center flex-col justify-center w-full my-16">
                  No pinned stocks.
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="p-2 pt-3 ml-1 mt-1 flex w-full items-end flex-col">
          <MoveDiagonal2Icon size={20} />
        </CardFooter>
      </Card>
    </>
  );
}
