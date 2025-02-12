import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AsteriskIcon } from "lucide-react";

export default function StockNewsSummary() {
  return (
    <Card className="bg-gradient-to-r from-indigo-600 to-cyan-600">
      <CardHeader>
        <CardTitle className="flex gap-1">
          <AsteriskIcon />
          AI Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc ml-4 text-left text-opacity-100">
          <li>
            Now this is a story all about how, my life got flipped-turned upside
            down
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
