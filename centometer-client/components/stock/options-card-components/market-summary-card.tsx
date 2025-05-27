import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StockContext } from "@/utils/hooks/stockinfo";
import { useContext } from "react";
import { PutCallObject } from "../stockType";

export default function MarketSummaryCard({putCallRatio}: {putCallRatio: PutCallObject}) {
  const companyInfo = useContext(StockContext);
  
  const priceChange = () => {
    const currentPrice = companyInfo.currentPrice || companyInfo.regularMarketPrice;
    const prevClose = companyInfo.previousClose;

    if (!currentPrice || !prevClose) {
      return { change: 0, percent: 0 };
    }

    const delta = currentPrice! - prevClose!;
    const deltaPercent = (delta / prevClose!) * 100;

    return { change: delta, percent: deltaPercent.toFixed(2) };
  };

  return (
    <Card className="bg-secondary">
      <CardHeader className="pb-2">
        <CardTitle>Market Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Underlying Price:</span>
            <span className="font-medium">
              $
              {companyInfo.currentPrice?.toFixed(2) ||
                companyInfo.regularMarketPrice?.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Daily Change:</span>
            <span className={`font-medium ${priceChange().change > 0 ? "text-emerald-500" : priceChange().change < 0 ? "text-red-500" : ""}`}>
              {priceChange().change > 0 && "+"}
              {priceChange().change.toFixed(2)} ({priceChange().percent}%)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Call OI:</span>
            <span className="font-medium">{putCallRatio.total_call_oi}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Put OI:</span>
            <span className="font-medium">{putCallRatio.total_put_oi}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Call Volume:</span>
            <span className="font-medium">{putCallRatio.total_call_vol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Put Volume:</span>
            <span className="font-medium">{putCallRatio.total_put_vol}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
