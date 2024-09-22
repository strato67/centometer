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
        <OverviewTable />
      </Card>
    </>
  );
}

function OverviewTable({ }) {
  const data = { "Previous Close": 242, Test: 222 };

  return (
    <>
      <CardContent>
        <div className="grid  grid-cols-2 md:grid-cols-4 md:gap-x-12 gap-y-2 gap-x-6">
          {Object.entries(data).map(([key, value], index) => {
            return (
              <div
                className="flex justify-between border-b border-b-card-foreground items-center"
                key={index}
              >
                <p>{key}</p>
                <p className="font-bold">{value}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </>
  );
}
