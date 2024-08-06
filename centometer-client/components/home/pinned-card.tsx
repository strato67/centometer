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


export default function PinnedCard() {
    return (
        <>
            <Card className="w-96 md:w-full rounded-3xl ">
                <CardHeader className="flex flex-row w-full justify-between">
                    <div className="space-y-1.5">
                        <CardTitle>Pinned Stocks</CardTitle>
                        <CardDescription>
                            Follow the latest activity of your pinned tickers.
                        </CardDescription>
                    </div>
                    <Button className="">Add Ticker</Button>
                </CardHeader>
                <CardContent className="flex flex-col md:flex-row gap-6 ">
                    <SymbolOverview />
                    <SymbolOverview />
                    <SymbolOverview />
                    <SymbolOverview />

                    <SymbolOverview />
                </CardContent>

            </Card>
        </>
    );
}
