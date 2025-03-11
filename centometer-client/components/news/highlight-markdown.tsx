"use client";

import {
  generateAIStreamSummary,
  generateAISummary,
  NewsType,
} from "@/app/actions/news";
import { getUserPinnedStocks } from "@/app/actions/stock-info";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { LoadingSpinner } from "../ui/loading-spinner";
import { readStreamableValue } from "ai/rsc";

export default function HighlightMarkdown({
  newsType,
}: {
  newsType: NewsType;
}) {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let prompt = "";

      if (newsType === "watchlist") {
        const watchlist = await getUserPinnedStocks();
        prompt = `For each stock symbol in this list: ${watchlist} list 1 key point about its latest news. Use external sources`;
      } else {
        prompt = `List exactly 4 points about current ${newsType} news. Use external sources `;
      }
      const { output } = await generateAIStreamSummary(prompt);
      let accumulatedText = "";
      setSummary("");
      for await (const delta of readStreamableValue(output)) {
        accumulatedText += delta;
        setSummary(accumulatedText);
      }
      setLoading(false);
    })();
  }, [newsType]);

  if (loading) {
    return (
      <div className="flex gap-2 w-full justify-center h-full items-center ">
        <LoadingSpinner />
        <p className="text-lg font-medium">Generating summary...</p>
      </div>
    );
  }

  return (
    <ReactMarkdown
      className="overflow-auto"
      components={{
        li: ({ node, ...props }) => (
          <li style={{ display: "block", marginTop: "0.75em" }} {...props} />
        ),
      }}
    >
      {summary}
    </ReactMarkdown>
  );
}
