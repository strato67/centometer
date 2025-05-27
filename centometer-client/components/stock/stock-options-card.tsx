"use client";

import { StockContext } from "@/utils/hooks/stockinfo";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getStockOptions } from "@/app/actions/stock-info";
import { useSearchParams } from "next/navigation";
import LoadingCard from "../loading-card";
import PutCallCard from "./options-card-components/put-call-card";
import { OpenInterestData, PutCallObject } from "./stockType";
import MarketSummaryCard from "./options-card-components/market-summary-card";
import OpenInterestCard from "./options-card-components/open-interest-card";

const getDateString = (timeString: string) => {
  const date = new Date(timeString);

  const readable = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return readable;
};

export default function StockOptionsCard() {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("tvwidgetsymbol");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryDates, setExpiryDates] = useState<string[]>([]);
  const [putCallRatio, setPutCallRatio] = useState<PutCallObject>();
  const [optionList, setOptionList] = useState();
  const [ivData, setIVData] = useState()
  const [oiAnalysis, setOIAnalysis] = useState<OpenInterestData>()
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
      setOIAnalysis(optionsData.openInterestAnalysis)

      console.log(optionsData);

      setLoading(false);
    })();
  }, [symbol, stockMap]);

  useEffect(() => {
    const updateOptions = async (date: string) => {
      setLoading(true);
      const optionsData = await getStockOptions(stockMap, date);
      setPutCallRatio(optionsData.putCallRatio);
      setLoading(false);
    };
    updateOptions(expiryDate)
  }, [expiryDate, stockMap]);

  if (!loading && expiryDates.length === 0) {
    return (
      <Card className="max-h-[60rem] overflow-scroll ">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Options</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>Options not available for {symbol}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="max-h-[60rem] overflow-scroll ">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <CardTitle>Options</CardTitle>
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
              {oiAnalysis && <OpenInterestCard oiAnalysis={oiAnalysis}/>}
              <Card className="bg-secondary">
                <CardHeader>
                  <CardTitle>IV Analysis</CardTitle>
                  <CardDescription>
                    Implied volatility by strike price
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]"></div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
}
