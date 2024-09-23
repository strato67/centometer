import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { StockInfo } from "./stockType";
import LoadingCard from "../loading-card";
import Link from "next/link";

export default function CompanyInfo({
  companyInfo,
  loading,
}: {
  companyInfo: StockInfo;
  loading: boolean;
}) {
  if (loading) {
    return <LoadingCard className="w-full rounded-2xl p-2 pb-12" />;
  }

  if (!loading && Object.keys(companyInfo).length === 0) {
    return (
      <>
        <Card className="w-full rounded-2xl p-2 pb-12">
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
      <Card className="w-full rounded-2xl p-4  ">
        <CardHeader className="flex flex-row w-full justify-between">
          <div className="space-y-1.5">
            <CardTitle>{companyInfo.shortName || companyInfo.symbol}</CardTitle>
            <Separator className="my-4" />
            <CardDescription>
              {companyInfo.sector && companyInfo.industry
                ? `${companyInfo.sector} - ${companyInfo.industry}`
                : companyInfo.quoteType}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 grid-flow-row">
            <ScrollArea className="max-h-64 rounded-md leading-relaxed tracking-wide col-span-2 mb-2">
              {companyInfo.longBusinessSummary}
            </ScrollArea>

            <div className="flex flex-col border rounded-2xl p-6 bg-background text-neutral  text-sm text-pretty overflow-hidden text-ellipsis items-center text-center ">
              <div className="text-lg mb-2 font-semibold">
                Analyst Consensus
              </div>
              <div className="capitalize">{companyInfo.recommendationKey}</div>
            </div>

            <div className="flex flex-col border rounded-2xl p-6 bg-background text-neutral  text-sm text-pretty overflow-hidden text-ellipsis max-h-56 overflow-y-auto ">
              <div className="text-lg mb-2 font-semibold">Contact Info</div>
              <div>{companyInfo.address1},</div>
              <div>
                {companyInfo.city}, {companyInfo.country}
              </div>
              <div>{companyInfo.phone}</div>
              {companyInfo.website && (
                <Link
                  href={companyInfo.website}
                  target="about:blank"
                  className="mt-2  underline text-ellipsis overflow-clip "
                >
                  {companyInfo.website}
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
