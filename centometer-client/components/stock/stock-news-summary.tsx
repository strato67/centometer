"use client";

import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { AsteriskIcon, ChevronDown, ChevronUp } from "lucide-react";
import { StockContext } from "@/utils/hooks/stockinfo";
import { generateAIStreamSummary } from "@/app/actions/news";
import { readStreamableValue } from "ai/rsc";
import ReactMarkdown from "react-markdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";

export default function StockNewsSummary() {
  const companyInfo = useContext(StockContext);
  const [summary, setSummary] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      if (companyInfo.symbol) {
        setSummary("");
        const prompt = `List 4 key points about the latest news on the ${companyInfo.symbol} stock symbol.`;
        const { output } = await generateAIStreamSummary(prompt);
        let accumulatedText = "";

        for await (const delta of readStreamableValue(output)) {
          accumulatedText += delta;
          setSummary(accumulatedText);
        }
      } else {
        setSummary("Could not generate summary.");
      }
    })();
  }, [companyInfo, companyInfo.symbol]);

  return (
    <Card className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white max-h-96">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger asChild className="cursor-pointer">
            <CardTitle className="flex items-center justify-between">
              <div className="flex gap-1 select-none ">
                <AsteriskIcon />
                AI Summary
              </div>

              <Button variant={"ghost"} className="hover:bg-inherit">
                {isOpen ? <ChevronUp /> : <ChevronDown />}

              </Button>
            </CardTitle>
          </CollapsibleTrigger>

        </CardHeader>
        <CollapsibleContent>
          <CardContent className="overflow-y-auto max-h-full">
            <ReactMarkdown
              className="flex flex-col "
              components={{
                li: ({ node, ...props }) => (
                  <li
                    style={{ display: "block", marginTop: "0.5em" }}
                    {...props}
                  />
                ),
              }}
            >
              {summary}
            </ReactMarkdown>
          </CardContent>

          <CardFooter>
            <div className="text-sm">
              Generative AI can make mistakes, verify your info.
            </div>
          </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
