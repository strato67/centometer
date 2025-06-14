import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PutCallObject } from "../stockType";

export default function PutCallCard({
  putCallRatio,
}: {
  putCallRatio: PutCallObject;
}) {
  const pcrVolumeProgress = (putCallRatio.volume / 2) * 100;
  const pcrOIProgress = (putCallRatio.open_interest / 2) * 100;

  return (
    <Card className="md:col-span-2 bg-secondary">
      <CardHeader className="pb-2">
        <CardTitle>Put-Call Ratio</CardTitle>
      </CardHeader>
      <CardContent className=" grid gap-4">
        <div className="relative pt-2">
          <p className="mb-1">
            Open Interest Ratio: {putCallRatio.open_interest.toFixed(3)}
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-emerald-500 rounded-full"
              style={{ width: `${pcrOIProgress}%`, maxWidth: "100%" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>0.0 (Bullish)</span>
            <span>1.0 (Neutral)</span>
            <span>2.0 (Bearish)</span>
          </div>
        </div>
        <div className="relative pt-2">
          <p className="mb-1">Volume Ratio: {putCallRatio.volume.toFixed(3)}</p>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-emerald-500 rounded-full"
              style={{ width: `${pcrVolumeProgress}%`, maxWidth: "100%" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>0.0 (Bullish)</span>
            <span>1.0 (Neutral)</span>
            <span>2.0 (Bearish)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
