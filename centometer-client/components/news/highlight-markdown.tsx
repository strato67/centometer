"use client";

import { generateAISummary, NewsType } from "@/app/actions/news";
import { getUserPinnedStocks } from "@/app/actions/stock-info";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { LoadingSpinner } from "../ui/loading-spinner";

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
        prompt = `For each stock symbol in this list: ${watchlist} list 1 key point about its latest news.`;
      } else {
        prompt = `List 4 key points about current ${newsType} news `;
      }

      setSummary(await generateAISummary(prompt));
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
          <li style={{ display: "block", marginTop: "0.5em" }} {...props} />
        ),
      }}
    >
      {summary}
    </ReactMarkdown>
  );
}
