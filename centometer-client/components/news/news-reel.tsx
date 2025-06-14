"use client";

import { NewsArticle, NewsLink } from "../home/news-card";
import { NewsType } from "@/app/actions/news";
import { useEffect, useRef, useState } from "react";
import { getNewsFeed } from "@/app/actions/news";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Separator } from "../ui/separator";
import React from "react";

interface NewsReelProps {
  newsType: NewsType;
}

export default function NewsReel(props: NewsReelProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [lastKey, setLastKey] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (async () => {
      const newsFeed = await getNewsFeed(props.newsType);
      if (Array.isArray(newsFeed)) {
        setArticles(newsFeed);
        setLastKey("");
      } else {
        setArticles(newsFeed.data);
        setLastKey(newsFeed.LastEvaluatedKey || "");
      }
      setLoading(false);
    })();
  }, [props.newsType]);

  const updateArticles = async () => {
    setLoading(true);

    const newsFeed = await getNewsFeed(props.newsType, lastKey);
    setTimeout(() => {
      if (!Array.isArray(newsFeed)) {
        setArticles((prevArticles) => [...prevArticles, ...newsFeed.data]);
        setLastKey(newsFeed.LastEvaluatedKey || "");
      }
      setLoading(false);
    }, 800);
  };

  const handleScroll = async (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isBottom =
      target.scrollHeight - target.scrollTop <= target.clientHeight + 1;

    if (isBottom) {
      await updateArticles();
    }
  };

  return (
    <>
      <div
        className=" w-full border-none h-[33rem] md:h-[40rem] lg:h-[48rem] overflow-auto"
        onScroll={handleScroll}
        ref={scrollRef}
      >
        {articles &&
          articles.map((article) => (
            <React.Fragment key={crypto.randomUUID()}>
              <NewsLink
                
                title={article.title}
                source={article.source}
                date={article.date}
                url={article.url}
              />
              <Separator />
              </React.Fragment>
          ))}
        {loading && (
          <div className="mt-4 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </>
  );
}
