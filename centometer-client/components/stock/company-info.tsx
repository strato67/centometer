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
import { Badge } from "../ui/badge";
import { AnalystConsensus } from "./stockType";

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

  const contactInfo = {
    address: companyInfo.address1,
    city: companyInfo.city,
    country: companyInfo.country,
    website: companyInfo.website,
    phone: companyInfo.phone,
  };

  const hasContactInfo = Object.values(contactInfo).some((value) => value);

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

            {companyInfo.recommendationKey && companyInfo.numberOfAnalystOpinions && (
              <div className="flex flex-col border rounded-2xl p-6 bg-background text-neutral gap-3  text-sm text-pretty overflow-hidden text-ellipsis max-h-56 overflow-y-auto items-center text-center  ">
                <div className="text-lg font-semibold">
                  Analyst Consensus
                </div>
                <RecommendationBadge
                  consensus={companyInfo.recommendationKey}
                />
                <div>{companyInfo.numberOfAnalystOpinions} Analysts</div>
              </div>
            )}

            {hasContactInfo && (
              <div className="flex flex-col border rounded-2xl p-6 bg-background text-neutral  text-sm text-pretty overflow-hidden text-ellipsis max-h-56 overflow-y-auto ">
                <div className="text-lg mb-2 font-semibold">Contact Info</div>

                {contactInfo.city &&
                  contactInfo.country &&
                  contactInfo.address && (
                    <>
                      <div>{contactInfo.address},</div>
                      <div>
                        {contactInfo.city?.concat(", ", contactInfo.country)}
                      </div>
                    </>
                  )}
                <div>{contactInfo.phone}</div>
                {contactInfo.website && (
                  <Link
                    href={contactInfo.website}
                    target="about:blank"
                    className="mt-2  underline text-ellipsis overflow-clip "
                  >
                    {contactInfo.website}
                  </Link>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function RecommendationBadge({
  consensus,
}: {
  consensus: keyof typeof analystConsensus;
}) {
  const analystConsensus: Record<string, AnalystConsensus> = {
    strong_buy: {
      name: "Strong Buy",
      colour: "bg-green-900",
      text: "",
    },
    buy: {
      name: "Buy",
      colour: "bg-green-600",
      text: "",
    },
    hold: {
      name: "Hold",
      colour: "bg-yellow-400",
      text: "text-black",
    },
    sell: {
      name: "Sell",
      colour: "bg-orange-500",
      text: "",
    },
    strong_sell: {
      name: "Strong Sell",
      colour: "bg-red-800",
      text: "",
    },
  };

  return (
    <Badge
      className={`${analystConsensus[consensus].colour} mt-2 text-lg min-w-fit max-w-full  px-6 py-2 hover:${analystConsensus[consensus].colour} ${analystConsensus[consensus].text}`}
    >
      {analystConsensus[consensus].name}
    </Badge>
  );
}
