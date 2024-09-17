"use client"

import { useSearchParams } from "next/navigation";
import StockBreadCrumb from "@/components/stock/stock-breadcrumb";
import StockChart from "@/components/widgets/stock-chart"
import OverviewCard from "@/components/stock/overview-card";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { getStockOverview } from "./stock-info";

export default function Page() {
    const searchParams = useSearchParams();
    const symbol = searchParams.get("tvwidgetsymbol");

    const stockMap = {
        indexName: symbol?.includes(":") ? symbol.split(":")[0] : undefined,
        symbolName: symbol?.includes(":") ? symbol.split(":")[1] : symbol
    }

    useEffect(() => {
        (async () => {
            if (symbol) {
                console.log(await getStockOverview(symbol))

            }
        })();
    }, [symbol])


    if (symbol) {
        return (<>
            <div className="px-4 mt-6 w-full">
                <StockBreadCrumb currentStock={symbol} />
                <h1 className="text-3xl font-semibold my-4">{symbol}</h1>
                <div className="grid">

                    <div className="flex flex-col">
                        <div className="h-96">
                            <StockChart ticker={symbol} />
                        </div>
                        <div>
                            <OverviewCard ticker={symbol} />
                        </div>
                    </div>

                </div>
            </div>

        </>)
    }

    return (notFound())


}