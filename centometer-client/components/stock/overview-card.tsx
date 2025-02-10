import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockInfo } from "./stockType";
import LoadingCard from "../loading-card";
import { useContext } from "react";
import { StockContext, LoadingContext } from "@/utils/hooks/stockinfo";

export default function OverviewCard() {

  const loading = useContext(LoadingContext)
  const companyInfo = useContext(StockContext)

  if (loading) {
    return (
      <LoadingCard className="w-full rounded-b-2xl rounded-t-none pt-2 md:px-2 pb-12" />
    );
  }

  if (!loading && Object.keys(companyInfo).length === 0) {
    return (
      <>
        <Card className="w-full rounded-b-2xl rounded-t-none pt-2 md:px-2 pb-12">
          <CardHeader className="flex flex-row w-full justify-between">
            <div className="space-y-1.5">
              <CardTitle>No Data Available</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card className="w-full rounded-b-2xl rounded-t-none pt-2 md:px-2 pb-12">
        <CardHeader className="flex flex-row w-full justify-between">
          <div className="space-y-1.5">
            <CardTitle>Overview</CardTitle>
          </div>
        </CardHeader>
        <OverviewTable companyInfo={companyInfo} />
      </Card>
    </>
  );
}

function OverviewTable({ companyInfo }: { companyInfo: StockInfo }) {
  const roundVal = (value: number) =>
    Intl.NumberFormat("en", { notation: "compact" }).format(value);

  const data = {
    "Previous Close": companyInfo.previousClose?.toFixed(2),
    Open: companyInfo.open?.toFixed(2),
    Bid: companyInfo.bid?.toFixed(2),
    Ask: companyInfo.ask?.toFixed(2),
    "Day Range":
      companyInfo.dayLow && companyInfo.dayHigh
        ? `${companyInfo.dayLow?.toFixed(2)} - ${companyInfo.dayHigh?.toFixed(
            2
          )}`
        : "N/A",
    "52 Week Range":
      companyInfo.fiftyTwoWeekLow && companyInfo.fiftyTwoWeekHigh
        ? `${companyInfo.fiftyTwoWeekLow?.toFixed(
            2
          )} - ${companyInfo.fiftyTwoWeekHigh?.toFixed(2)}`
        : "N/A",
    "Avg. Volume":
      companyInfo.averageVolume && roundVal(companyInfo.averageVolume),
    "Market Cap": companyInfo.marketCap && roundVal(companyInfo.marketCap),
    "P/E Ratio": companyInfo.pegRatio,
    EPS: companyInfo.trailingEps,
    Dividend: companyInfo.dividendRate
      ? `${companyInfo.dividendRate?.toFixed(2)} (${
          companyInfo.dividendYield
            ? (companyInfo.dividendYield * 100).toFixed(2)
            : "N/A"
        }%)`
      : "N/A",
  };

  return (
    <>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-12 gap-y-6 gap-x-6">
          {Object.entries(data).map(([key, value], index) => {
            return (
              <div
                className="flex justify-between border-b border-b-neutral-700 items-center text-sm"
                key={index}
              >
                <p>{key}</p>
                <p className="font-bold text-right">{value || "N/A"}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </>
  );
}
