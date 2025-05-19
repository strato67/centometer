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
import { useContext, useEffect, useState } from "react";
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
import { PutCallObject } from "./stockType";

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
  const [putCallRatio, setPutCallRatio] = useState<PutCallObject>()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (symbol) {
        const stockMap = {
          indexName: symbol?.includes(":") ? symbol.split(":")[0] : "",
          symbolName: symbol?.includes(":") ? symbol.split(":")[1] : symbol,
        };
        const optionsData = await getStockOptions(stockMap);

        if (Object.keys(optionsData).length === 0) {
          setLoading(false);
          return
        }

        setExpiryDates(optionsData.optionsChain.option_dates);
        setExpiryDate(optionsData.optionsChain.option_dates[0]);
        setPutCallRatio(optionsData.putCallRatio)

        console.log(optionsData);
      }

      setLoading(false);
    })();
  }, [symbol]);

  if (loading) {
    return <LoadingCard className="max-h-[36rem]" />;
  }

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
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {putCallRatio && <PutCallCard putCallRatio={putCallRatio} />}
            <Card className="bg-secondary">
              <CardHeader className="pb-2">
                <CardTitle>Market Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Underlying Price:
                    </span>
                    <span className="font-medium">$124.68</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Daily Change:</span>
                    <span className="font-medium text-emerald-500">
                      +1.24 (1.01%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Call OI:
                    </span>
                    <span className="font-medium">124,568</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Put OI:</span>
                    <span className="font-medium">105,932</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Call Volume:</span>
                    <span className="font-medium">45,321</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Put Volume:</span>
                    <span className="font-medium">38,754</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-secondary">
              <CardHeader>
                <CardTitle>Open Interest Analysis</CardTitle>
                <CardDescription>
                  Call vs Put open interest by strike price
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]"></div>
              </CardContent>
            </Card>

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
      </Card>
    </>
  );
}
