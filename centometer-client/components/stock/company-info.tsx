import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        return(<LoadingCard className="w-full rounded-2xl p-2 pb-12"/>)
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
                        <CardTitle>{companyInfo.longName}</CardTitle>
                    </div>
                </CardHeader>
            </Card>
        </>
    );
}
