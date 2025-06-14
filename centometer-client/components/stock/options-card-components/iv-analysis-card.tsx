import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Label,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IVDataPoint } from "../stockType";

export default function IVAnalysisCard({ ivData }: { ivData: IVDataPoint[] }) {
  const filteredCallData = ivData
    .filter((d) => d.callIV !== null && d.callIV >= 0.0001)
    .map((d) => ({ strike: d.strike, callIV: d.callIV }));

  const filteredPutData = ivData
    .filter((d) => d.putIV !== null && d.putIV >= 0.0001)
    .map((d) => ({ strike: d.strike, callIV: d.putIV }));

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>IV Analysis</CardTitle>
        <CardDescription>Implied volatility smile</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 5, right: 30, bottom: 25, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="strike" name="Strike Price">
                <Label
                  style={{
                    textAnchor: "middle",
                    fontSize: "100%",
                  }}
                  value={"Strike Price ($)"}
                  dy={20}
                />
              </XAxis>
              <YAxis type="number" dataKey="callIV" name="IV">
                <Label
                  style={{
                    textAnchor: "middle",
                    fontSize: "100%",
                  }}
                  angle={270}
                  value={"Implied Volatility (IV)"}
                  dx={-40}
                  dy={20}
                />
              </YAxis>
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend align="center" verticalAlign="top" wrapperStyle={{top: -10, left: 50, }}/>
              <Scatter name="Call IV" data={filteredCallData} fill="#22c55e" />
              <Scatter name="Put IV" data={filteredPutData} fill="#ef4444" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
