import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StockInfo } from "./stockType";
import LoadingCard from "../loading-card";

export default function OverviewCard({
  companyInfo,
  loading,
}: {
  companyInfo: StockInfo;
  loading: boolean;
}) {
  if (loading) {
    return (
      <LoadingCard className="w-full rounded-b-2xl rounded-t-none p-2 pb-12" />
    );
  }

  if (!loading && Object.keys(companyInfo).length === 0) {
    return (
      <>
        <Card className="w-full rounded-b-2xl rounded-t-none p-2 pb-12">
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
      <Card className="w-full rounded-b-2xl rounded-t-none p-2 pb-12">
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
  const data = {
    "Previous Close": companyInfo.previousClose,
    Open: companyInfo.open,
    Bid: companyInfo.bid,
    Ask: companyInfo.ask,
    "Day Range": `${companyInfo.dayLow} - ${companyInfo.dayHigh}`,
    "52 Week Range": `${companyInfo.fiftyTwoWeekLow} - ${companyInfo.fiftyTwoWeekHigh}`,
    "Avg. Volume": companyInfo.averageVolume,
    "Market Cap": companyInfo.marketCap,
    "P/E Ratio": companyInfo.pegRatio,
    EPS: companyInfo.trailingEps,
    Dividend: `${companyInfo.dividendRate} (${
      companyInfo.dividendYield && (companyInfo.dividendYield * 100).toFixed(2)
    }%)`,
  };

  return (
    <>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-x-12 gap-y-6 gap-x-6">
          {Object.entries(data).map(([key, value], index) => {
            return (
              <div
                className="flex justify-between border-b border-b-neutral-700 items-center"
                key={index}
              >
                <p>{key}</p>
                <p className="font-bold text-right">{value}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </>
  );
}
