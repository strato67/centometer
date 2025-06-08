'use client'

import { useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { useEffect, useMemo, useState } from "react";
import { getStockOptions } from "@/app/actions/stock-info";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import LoadingCard from "../loading-card";
import IVAnalysisCard from "./options-card-components/iv-analysis-card";
import MarketSummaryCard from "./options-card-components/market-summary-card";
import OpenInterestCard from "./options-card-components/open-interest-card";
import PutCallCard from "./options-card-components/put-call-card";
import { PutCallObject, IVDataPoint, OpenInterestData } from "./stockType";

const getDateString = (timeString: string) => {
  const date = new Date(timeString);

  const readable = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return readable;
};

export default function StockAnalysisCard() {

  const searchParams = useSearchParams();
  const symbol = searchParams.get("tvwidgetsymbol");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryDates, setExpiryDates] = useState<string[]>([]);
  const [putCallRatio, setPutCallRatio] = useState<PutCallObject>();
  const [ivData, setIVData] = useState<IVDataPoint[]>();
  const [oiAnalysis, setOIAnalysis] = useState<OpenInterestData>();
  const [loading, setLoading] = useState(true);

    const stockMap = useMemo(
      () => ({
        indexName: symbol!.includes(":") ? symbol!.split(":")[0] : "",
        symbolName: symbol!.includes(":") ? symbol!.split(":")[1] : symbol!,
      }),
      [symbol]
    );
  

  useEffect(() => {
    (async () => {
      const optionsData = await getStockOptions(stockMap);

      if (Object.keys(optionsData).length === 0) {
        setLoading(false);
        return;
      }

      setExpiryDates(optionsData.optionsChain.option_dates);
      setExpiryDate(optionsData.optionsChain.option_dates[0]);

      setPutCallRatio(optionsData.putCallRatio);
      setOIAnalysis(optionsData.openInterestAnalysis);
      setIVData(optionsData.ivData);

      setLoading(false);
    })();
  }, [symbol, stockMap]);

  useEffect(() => {
    const updateOptions = async (date: string) => {
      setLoading(true);
      const optionsData = await getStockOptions(stockMap, date);

      setPutCallRatio(optionsData.putCallRatio);
      setOIAnalysis(optionsData.openInterestAnalysis);
      setIVData(optionsData.ivData);
      setLoading(false);
    };
    updateOptions(expiryDate);
  }, [expiryDate, stockMap]);

  if (!loading && expiryDates.length === 0) {
    return (
      <Card className="max-h-[60rem] overflow-scroll ">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>Analysis data unavailable for {symbol}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="max-h-[60rem] overflow-scroll ">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Analysis</CardTitle>
          </div>

          <Select value={expiryDate} onValueChange={setExpiryDate}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Expiry Date" />
            </SelectTrigger>
            <SelectContent>
              {expiryDates.map((date, _) => (
                <SelectItem value={date} key={_}>
                  {getDateString(date)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        {loading ? (
          <LoadingCard className="max-h-[36rem]" />
        ) : (
          <CardContent className="space-y-2">
            {putCallRatio && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PutCallCard putCallRatio={putCallRatio} />
                <MarketSummaryCard putCallRatio={putCallRatio} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {oiAnalysis && <OpenInterestCard oiAnalysis={oiAnalysis} />}
              {ivData && <IVAnalysisCard ivData={ivData} />}
            </div>

          </CardContent>
        )}
      </Card>
    </>
  );
}
