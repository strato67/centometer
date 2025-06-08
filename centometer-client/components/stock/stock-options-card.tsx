"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/card";
import { useEffect, useMemo, useState } from "react";
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
import { OptionsChain } from "./stockType";
import OptionChainTable from "./options-card-components/option-chain-table";

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
  const [optionList, setOptionList] = useState<OptionsChain>();
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

      setOptionList(optionsData.optionsChain)

      setLoading(false);
    })();
  }, [symbol, stockMap]);

  useEffect(() => {
    const updateOptions = async (date: string) => {
      setLoading(true);
      const optionsData = await getStockOptions(stockMap, date);


      setOptionList(optionsData.optionsChain)
      setLoading(false);
    };
    updateOptions(expiryDate);
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
          <div>Options data unavailable for {symbol}</div>
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

            <div>
              {optionList && <OptionChainTable optionsChain={optionList} />}
            </div>

          </CardContent>
        )}
      </Card>
    </>
  );
}
