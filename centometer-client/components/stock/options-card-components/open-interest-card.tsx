import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { OpenInterestData } from "../stockType";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function OpenInterestCard({
  oiAnalysis,
}: {
  oiAnalysis: OpenInterestData;
}) {
  const { support, resistance } = oiAnalysis;
  const sortedSupport = [...support].sort((a, b) => a.strike - b.strike);
  const sortedResistance = [...resistance].sort((a, b) => a.strike - b.strike);

  if (support.length === 0 || resistance.length === 0) {
    return (
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle>Open Interest Analysis</CardTitle>
          <CardDescription>
            Current top support and resistance levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-80">
            Open interest analysis not available.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>Open Interest Analysis</CardTitle>
        <CardDescription>
          Top support and resistance levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="support" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="resistance">Resistance</TabsTrigger>
          </TabsList>
          <TabsContent value="support" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedSupport}
                layout="horizontal"
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis dataKey="strike">
                  <Label
                    style={{
                      textAnchor: "middle",
                      fontSize: "100%",
                    }}
                    value={"Strike Price ($)"}
                    dy={30}
                  />
                </XAxis>
                <YAxis type="number">
                  <Label
                    style={{
                      textAnchor: "middle",
                      fontSize: "100%",
                    }}
                    angle={270}
                    value={"Open Interest"}
                    dx={-40}
                    dy={20}
                  />
                </YAxis>
                <Tooltip />
                <Bar
                  dataKey="openInterest"
                  fill="#22c55e"
                  name="Open Interest"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="resistance" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedResistance}
                layout="horizontal"
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis dataKey="strike">
                  <Label
                    style={{
                      textAnchor: "middle",
                      fontSize: "100%",
                    }}
                    value={"Strike Price ($)"}
                    dy={30}
                  />
                </XAxis>
                <YAxis type="number">
                  <Label
                    style={{
                      textAnchor: "middle",
                      fontSize: "100%",
                    }}
                    angle={270}
                    value={"Open Interest"}
                    dx={-40}
                    dy={20}
                  />
                </YAxis>
                <Tooltip />
                <Bar
                  dataKey="openInterest"
                  fill="#ef4444"
                  name="Open Interest"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <div className="italic text-sm">*Support and resistance levels are derived from top put and call open interest, in relation to the current stock price.</div>
      </CardFooter>
    </Card>
  );
}
