import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
  } from "../ui/card";
import MarketScreener from "../widgets/market-screener";
  
  export default function MarketScreenerCard() {
    return (
      <>
        <Card className="md:w-full rounded-2xl pt-2 ">
          <CardHeader>
            <CardTitle>Market Screener</CardTitle>
            <CardDescription>An overview of the market</CardDescription>
          </CardHeader>
          <CardContent className="h-[36rem]">
            <MarketScreener/>
          </CardContent>
        </Card>
      </>
    );
  }
  