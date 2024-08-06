"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SymbolOverview from "../widgets/symbol-overview";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function PinnedCard() {

    return (
        <>
            <Card className="w-96 md:w-full rounded-3xl p-4 ">
                <CardHeader className="flex flex-row w-full justify-between">
                    <div className="space-y-1.5">
                        <CardTitle>Pinned Stocks</CardTitle>
                        <CardDescription>
                            Five day activity of your pinned tickers.
                        </CardDescription>
                    </div>
                    <Button className="">Add Ticker</Button>
                </CardHeader>
                <CardContent>
                    <Carousel className="w-full ">
                        <CarouselContent>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <SymbolOverview ticker="NVDA"/>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <SymbolOverview ticker="AMD"/>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <SymbolOverview ticker="MSFT"/>
                            </CarouselItem>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <SymbolOverview ticker="AAPL"/>
                            </CarouselItem>
                        </CarouselContent>


                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </CardContent>

            </Card>
        </>
    );
}
