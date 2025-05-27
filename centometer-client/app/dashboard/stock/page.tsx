"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { getStockOverview, getWatchlistItem } from "../../actions/stock-info";
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
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnalysisSection from "@/components/stock/analysis-section";
import { StockContext, LoadingContext } from "@/utils/hooks/stockinfo";

export default function Page() {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("tvwidgetsymbol");
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<StockInfo>({});
  const [added, setAdded] = useState<null | boolean>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (symbol) {
        const stockMap = {
          indexName: symbol?.includes(":") ? symbol.split(":")[0] : "",
          symbolName: symbol?.includes(":") ? symbol.split(":")[1] : symbol,
        };
        setCompanyInfo(await getStockOverview(stockMap));
        setAdded(await getWatchlistItem(stockMap));
        setLoading(false);

        console.log(await getStockOverview(stockMap))
      }
    })();
  }, [symbol]);

  if (!symbol) {
    return notFound();
  }

  return (
    <LoadingContext.Provider value={loading}>
      <StockContext.Provider value={companyInfo}>
      <div className="my-4 md:my-6 md:px-1 w-full">
        <StockBreadCrumb currentStock={symbol} />
        <div className="flex flex-col mt-4 mb-2 max-w-fit gap-2">
          <div className="text-3xl font-semibold flex gap-4 items-center">
            <Button
              variant={"ghost"}
              onClick={() => {

                  if (window.history.length <= 1) {
                    router.push('/dashboard/search')
                  } else {
                    router.back()
                  }
          
              }}
              className="rounded-full p-2 -mr-1"
            >
              <ArrowLeft />
            </Button>

            {symbol}
            {(companyInfo.currentPrice || companyInfo.regularMarketPrice) && (
              <Badge className="w-fit text-xl">
                ${companyInfo.currentPrice?.toFixed(2) || companyInfo.regularMarketPrice?.toFixed(2)}
              </Badge>
            )}
          </div>

          <Separator />
          {!companyInfo || added === null ? (
            <Skeleton className="flex gap-x-4 w-64 h-6 rounded-full" />
          ) : (
            <CardDescription className="flex items-baseline gap-x-4">
              {companyInfo.longName || companyInfo.symbol} -{" "}
              {companyInfo.quoteType}
              {added !== null && (
                <AddStockButton
                  isAdded={added}
                  setAdded={setAdded}
                  symbol={symbol}
                />
              )}
            </CardDescription>
          )}
        </div>

        <div className="grid xl:grid-cols-3 xl:gap-5 gap-4 mb-4">
          <div className="flex flex-col xl:col-span-2 xl:h-auto">
            <div className="h-96">
              <StockChart
                symbolChange={false}
                ticker={
                  symbol.includes(":") && symbol.split(":")[0] === "FOREX"
                    ? symbol.split(":")[1]
                    : symbol
                }
              />
            </div>

            <OverviewCard />
          </div>

          <CompanyInfo />
        </div>
        <AnalysisSection />
      </div>
      </StockContext.Provider>
    </LoadingContext.Provider>
  );
}
