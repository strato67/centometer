import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";
import { StockInfo } from "./stockType";
import LoadingCard from "../loading-card";

export default function CompanyInfo({
    companyInfo,
    loading,
}: {
    companyInfo: StockInfo;
    loading: boolean;
}) {

    if (loading) {
        return (<LoadingCard className="w-full rounded-2xl p-2 pb-12" />)
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
            <Card className="w-full rounded-2xl p-2 pb-12">
                <CardHeader className="flex flex-row w-full justify-between">
                    <div className="space-y-1.5">
                        <CardTitle>{companyInfo.shortName || companyInfo.symbol}</CardTitle>
                        <Separator className="my-4" />
                        <CardDescription>{companyInfo.industry || companyInfo.quoteType}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full gap-4">


                        <ScrollArea className="h-52 rounded-md leading-relaxed tracking-wide">
                            {companyInfo.longBusinessSummary}

                        </ScrollArea>

                        <div className="flex flex-col">
                            <div>{companyInfo.address1},</div>
                            <div>{companyInfo.city}, {companyInfo.country}</div>
                            <div>{companyInfo.phone}</div>
                            <div>{companyInfo.website}</div>

                        </div>




                    </div>
                </CardContent>
            </Card>
        </>
    );
}
