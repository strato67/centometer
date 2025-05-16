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

export default function StockOptionsCard() {

  const searchParams = useSearchParams();
  const symbol = searchParams.get("tvwidgetsymbol");
  const [expiryDate, setExpiryDate] = useState("2024-05-17");
  useEffect(()=>{
    (async () => {

      if (symbol) {
        const stockMap = {
          indexName: symbol?.includes(":") ? symbol.split(":")[0] : "",
          symbolName: symbol?.includes(":") ? symbol.split(":")[1] : symbol,
        };
        const optionsData = await getStockOptions(stockMap)

        console.log(optionsData)
      }
    

    })()
  },[symbol])


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
              <SelectItem value="2024-05-17">May 17, 2024</SelectItem>
              <SelectItem value="2024-05-24">May 24, 2024</SelectItem>
              <SelectItem value="2024-05-31">May 31, 2024</SelectItem>
              <SelectItem value="2024-06-21">Jun 21, 2024</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 bg-secondary">
              <CardHeader className="pb-2">
                <CardTitle>Put-Call Ratio</CardTitle>
                <CardDescription>Current ratio: {1}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pt-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-emerald-500 rounded-full"
                      style={{ width: `${(1 / 2) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>0.0 (Bullish)</span>
                    <span>1.0 (Neutral)</span>
                    <span>2.0 (Bearish)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
