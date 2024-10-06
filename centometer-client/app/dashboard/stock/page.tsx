"use client";

import { useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { getStockOverview, getWatchlistItem } from "./stock-info";
import StockBreadCrumb from "@/components/stock/stock-breadcrumb";
import StockChart from "@/components/widgets/stock-chart";
import OverviewCard from "@/components/stock/overview-card";
import CompanyInfo from "@/components/stock/company-info";
import { StockInfo } from "@/components/stock/stockType";
import { Separator } from "@/components/ui/separator";
import { CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AddStockButton from "@/components/stock/add-stock";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("tvwidgetsymbol");
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<StockInfo>({});
  const [added, setAdded] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      if (symbol) {
        const stockMap = {
          indexName: symbol?.includes(":") ? symbol.split(":")[0] : undefined,
          symbolName: symbol?.includes(":") ? symbol.split(":")[1] : symbol,
        };
        setCompanyInfo(await getStockOverview(stockMap));
        setAdded(await getWatchlistItem(stockMap));
        setLoading(false);
        console.log(await getStockOverview(stockMap));
      }
    })();
  }, [symbol]);

  if (!symbol) {
    return notFound();
  }

  return (
    <>
      <div className="mt-4 md:px-1 w-full">
        <StockBreadCrumb currentStock={symbol} />
        <div className="flex flex-col mt-4 mb-2 max-w-fit gap-2">
          <div className="text-3xl font-semibold flex gap-4 items-center">
            {symbol}
            {companyInfo.currentPrice && (
              <Badge className="w-fit text-xl">
                ${companyInfo.currentPrice.toFixed(2)}
              </Badge>
            )}
          </div>

          <Separator />
          {!companyInfo || added === null ? (
            <Skeleton className="flex gap-x-4 w-64 h-6 rounded-full"/>
          ) : (
            <CardDescription className="flex items-baseline gap-x-4">
              {companyInfo.longName || companyInfo.symbol} - {companyInfo.quoteType}
              {added !== null && (
                <AddStockButton isAdded={added} setAdded={setAdded} symbol={symbol} />
              )}
            </CardDescription>
          )}
        </div>

        <div className="grid xl:grid-cols-3 xl:gap-5 gap-4">
          <div className="flex flex-col xl:col-span-2 xl:h-auto">
            <div className="h-96">
              <StockChart ticker={symbol.includes(":") && symbol.split(":")[0] === "FOREX" ? symbol.split(":")[1] : symbol} />
            </div>

            <OverviewCard companyInfo={companyInfo} loading={loading} />
          </div>

          <CompanyInfo companyInfo={companyInfo} loading={loading} />
        </div>
      </div>
    </>
  );
}
