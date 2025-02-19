"use client";

import { StockContext } from "@/utils/hooks/stockinfo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useContext, useEffect, useState } from "react";
import { NewsArticle, NewsLink } from "../home/news-card";
import LoadingCard from "../loading-card";
import { getStockNews } from "@/app/actions/news";
import StockSummary from "./stock-news-summary";
import { Separator } from "../ui/separator";

export default function StockNewsCard() {
  const companyInfo = useContext(StockContext);
  const [articles, setArticles] = useState<NewsArticle[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (companyInfo.symbol) {
        setArticles(await getStockNews(companyInfo.symbol));
      }
      setLoading(false)
    })();
  }, [companyInfo]);

  if (loading) {
    return <LoadingCard className="max-h-[36rem]" />;
  }

  return (
    <>
      <Card className="max-h-[60rem] overflow-scroll">
        <CardHeader>
          <CardTitle>News</CardTitle>
          <CardDescription>
            Top articles for {companyInfo.symbol}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <StockSummary/>
          <Separator/>
          <div className="grid md:grid-cols-2 col-span-1 gap-x-4 gap-y-4">
          {!articles || articles.length === 0 ? (
            <div>No articles found</div>
          ) : (
            articles.map((article, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <NewsLink
                  title={article.title}
                  source={article.source}
                  date={article.date}
                  url={article.url}
                />
              </div>
            ))
          )}
          </div>

        </CardContent>
      </Card>
    </>
  );
}
