import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import TrendingStocks from "../widgets/trending-stocks";

export default function TrendingStocksCard() {
  return (
    <>
      <Card className="md:w-full rounded-2xl pt-2 ">
        <CardHeader>
          <CardTitle>Trending Symbols</CardTitle>
          <CardDescription>The most active stocks today</CardDescription>
        </CardHeader>
        <CardContent className="h-[36rem]">
          <TrendingStocks />
        </CardContent>
      </Card>
    </>
  );
}
