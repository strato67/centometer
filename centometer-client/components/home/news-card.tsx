'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import Link from "next/link";
import DateConverter from "@/utils/hooks/dateconverter";
import { NewsType } from "@/app/actions/news";
import { getCardNews } from "@/app/actions/news";
import { useState, useEffect } from "react";

type NewsArticle = {
  title: string;
  source: string;
  date: string;
  url: string;
}

export default function NewsCard({
  title,
  description,
  newsType,
}: {
  title: string;
  description: string;
  newsType: NewsType;
}) {

  const [articles, setArticles] = useState<NewsArticle[]>()

  useEffect(()=>{
    (async () => {
      setArticles(await getCardNews(newsType))
    })();
  }, [newsType])

  return (
    <>
      <Card className="md:w-full rounded-2xl pt-2 ">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72 w-full rounded-md border">
            {articles && articles.map((article, index) => {
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
      </Card>
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
              {relativeTime} &#x2022; {source}
            </p>
          </div>
        </div>
      </Link>
      <Separator />
    </>
  );
}
