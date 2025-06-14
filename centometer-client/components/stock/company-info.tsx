import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import LoadingCard from "../loading-card";
import Link from "next/link";
import AnalystBadge from "../analyst-badge";
import { useContext } from "react";
import { LoadingContext, StockContext } from "@/utils/hooks/stockinfo";

export default function CompanyInfo() {

  const loading = useContext(LoadingContext)
  const companyInfo = useContext(StockContext)

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
      <Card className="w-full rounded-2xl pt-2  pb-2">
        <CardHeader className="flex flex-row w-full justify-between">
          <div className="space-y-1.5">
            <CardTitle>{companyInfo.longName || companyInfo.shortName || companyInfo.symbol}</CardTitle>
            <Separator className="my-4" />
            <CardDescription>
              {companyInfo.sector && companyInfo.industry
                ? `${companyInfo.sector} - ${companyInfo.industry}`
                : companyInfo.quoteType}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4 grid-flow-row">
            <ScrollArea className="max-h-64 rounded-md leading-relaxed tracking-wide col-span-2 mb-2">
              {companyInfo.longBusinessSummary}
            </ScrollArea>

            {contactInfo.website && (
              <Link
                href={contactInfo.website}
                target="about:blank"
                className="underline text-ellipsis overflow-clip col-span-2 w-fit"
              >
                {contactInfo.website}
              </Link>
            )}

            {companyInfo &&
              companyInfo.recommendationKey &&
              companyInfo.numberOfAnalystOpinions && 
              companyInfo.recommendationKey &&
              companyInfo.recommendationKey !== "none" &&
              (
                <div className="flex flex-col border rounded-2xl p-6 bg-accent text-neutral gap-3  text-sm text-pretty overflow-hidden text-ellipsis max-h-56 overflow-y-auto items-center text-center  ">
                  <div className="text-lg font-semibold">Analyst Consensus</div>
                  <AnalystBadge consensus={companyInfo.recommendationKey} className="text-md md:text-lg min-w-fit max-w-full  py-2"/>
               
                  <div>{companyInfo.numberOfAnalystOpinions} Analysts</div>
                </div>
              )}

            {hasContactInfo && (
              <div className="flex flex-col border rounded-2xl p-6 bg-accent text-neutral  text-sm text-pretty overflow-hidden text-ellipsis max-h-56 overflow-y-auto ">
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
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
