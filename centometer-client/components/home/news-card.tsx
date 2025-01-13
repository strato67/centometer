"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import Link from "next/link";
import DateConverter from "@/utils/hooks/dateconverter";
import { NewsType } from "@/app/actions/news";
import { getCardNews } from "@/app/actions/news";
import { Suspense, useEffect, useState } from "react";
import LoadingCard from "../loading-card";
import ResizeHandle from "../resize-handle";

type NewsArticle = {
  title: string;
  source: string;
  date: string;
  url: string;
};

export default function NewsCard({
  title,
  description,
  newsType,
}: {
  title: string;
  description: string;
  newsType: NewsType;
}) {
  const [articles, setArticles] = useState<NewsArticle[]>();
  //const articles: NewsArticle[] = await getCardNews(newsType);
  useEffect(() => {
    (async () => {
      setArticles(await getCardNews(newsType));
    })();
  }, [newsType]);

  return (
    <>
      <Suspense
        fallback={<LoadingCard className="md:w-full rounded-2xl pt-2" />}
      >
        <Card className="md:w-full rounded-2xl ">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 w-full rounded-md border">
              {articles &&
                articles.map((article, index) => {
                  return (
                    <NewsLink
                      title={article.title}
                      source={article.source}
                      date={article.date}
                      url={article.url}
                      key={index}
                    />
                  );
                })}
            </ScrollArea>
          </CardContent>
          <CardFooter className="p-2 mb-1 pr-1  flex w-full items-end flex-col">
            <ResizeHandle />
          </CardFooter>
        </Card>
      </Suspense>
    </>
  );
}

function NewsLink({
  title,
  source,
  date,
  url,
}: {
  title: string;
  source: string;
  date: string;
  url: string;
}) {
  const { getRelativeTime } = DateConverter();
  const relativeTime = getRelativeTime(date);

  return (
    <>
      <Link
        href={url}
        target="about:blank"
        className=" flex items-center space-x-4  p-4"
      >
        <div className="flex-1 space-y-2 h-auto">
          <div className=" font-medium leading-none">{title}</div>
          <div className="text-sm text-muted-foreground overflow-y-hidden text-ellipsis select-none ">
            <p>
              {source} &#x2022; {relativeTime}
            </p>
          </div>
        </div>
      </Link>
      <Separator />
    </>
  );
}
