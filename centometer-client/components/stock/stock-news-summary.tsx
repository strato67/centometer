"use client";

import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AsteriskIcon } from "lucide-react";
import { StockContext } from "@/utils/hooks/stockinfo";
import { getNewsSummary } from "@/app/actions/news";
import { readStreamableValue } from "ai/rsc";
import ReactMarkdown from "react-markdown";

export default function StockNewsSummary() {
  const companyInfo = useContext(StockContext);
  const [summary, setSummary] = useState<string>("");
  useEffect(() => {
    (async () => {
      if (companyInfo.symbol) {
        setSummary("");
        const { output } = await getNewsSummary(companyInfo.symbol);
        let accumulatedText = "";

        for await (const delta of readStreamableValue(output)) {
          accumulatedText += delta;
          setSummary(accumulatedText);
          //setSummary(currentGeneration => `${currentGeneration} ${delta}`);
        }
      } else {
        setSummary("Could not generate summary.");
      }
    })();
  }, [companyInfo, companyInfo.symbol]);

  return (
    <Card className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
      <CardHeader>
        <CardTitle className="flex gap-1">
          <AsteriskIcon />
          AI Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ReactMarkdown
          className="flex flex-col"
          components={{
            li: ({ node, ...props }) => <li style={{ display: "block", marginTop: "0.5em" }} {...props} />,
          }}
        >
          {summary}
        </ReactMarkdown>
      </CardContent>

      <CardFooter>
        <div className="text-sm">Generative AI can make mistakes, verify your info</div>
      </CardFooter>
    </Card>
  );
}
