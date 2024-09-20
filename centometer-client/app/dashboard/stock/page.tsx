"use client"

import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { getStockOverview } from "./stock-info";
import StockBreadCrumb from "@/components/stock/stock-breadcrumb";
import StockChart from "@/components/widgets/stock-chart"
import OverviewCard from "@/components/stock/overview-card";
import CompanyInfo from "@/components/stock/company-info";
import { StockInfo } from "@/components/stock/stockType";

export default function Page() {
    const searchParams = useSearchParams();
    const symbol = searchParams.get("tvwidgetsymbol");
    const [loading, setLoading] = useState(true)
    const [companyInfo, setCompanyInfo] = useState<StockInfo>({})


    useEffect(() => {
        (async () => {
            if (symbol) {
                const stockMap = {
                    indexName: symbol?.includes(":") ? symbol.split(":")[0] : undefined,
                    symbolName: symbol?.includes(":") ? symbol.split(":")[1] : symbol
                }
                setCompanyInfo(await getStockOverview(stockMap))
                setLoading(false)
                console.log(await getStockOverview(stockMap))
            }
        })();
    }, [symbol])


    if (symbol) {
        return (<>
            <div className="px-4 mt-6 w-full">
                <StockBreadCrumb currentStock={symbol} />
                <h1 className="text-3xl font-semibold my-4">{symbol}</h1>
                <div className="grid xl:grid-cols-3 xl:gap-5">

                    <div className="flex flex-col xl:col-span-2">
                        <div className="h-96">
                            <StockChart ticker={symbol} />
                        </div>
                        <div>
                            <OverviewCard ticker={symbol} />
                        </div>
                    </div>

                <CompanyInfo companyInfo={companyInfo} loading={loading}/>
                </div>
            </div>

        </>)
    }

    return (notFound())


}