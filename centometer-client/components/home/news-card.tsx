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
import { useEffect, useState } from "react";
import LoadingCard from "../loading-card";
import { GripIcon, MoveDiagonal2Icon } from "lucide-react";

type NewsArticle = {
  title: string;
  source: string;
  date: string;
  url: string;
};

interface NewsCardProps {
  title: string;
  description: string;
  newsType: NewsType;
}

export default function NewsCard(props: NewsCardProps) {
  const [articles, setArticles] = useState<NewsArticle[]>();
  const [loading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    (async () => {
      setArticles(await getCardNews(props.newsType));
      setLoading(false)
    })();
  }, [props.newsType]);


  if(loading){
    return(<LoadingCard className="md:w-full rounded-2xl pt-2 h-[30rem]" />)
  }

  return (
    <>
        <Card className="md:w-full rounded-2xl ">
        <GripIcon size={20} className="mx-4 mt-4 mb-0 drag-handle cursor-grab"/>
          <CardHeader className="-mt-2">
            <CardTitle>{props.title}</CardTitle>
            <CardDescription>{props.description}</CardDescription>
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
            <MoveDiagonal2Icon size={20}/>
          </CardFooter>
        </Card>
    </>
  );
}

function NewsLink(props:NewsArticle) {
  const { getRelativeTime } = DateConverter();
  const relativeTime = getRelativeTime(props.date);

  return (
    <>
      <Link
        href={props.url}
        target="about:blank"
        className=" flex items-center space-x-4  p-4 -z-10"
      >
        <div className="flex-1 space-y-2 h-auto">
          <div className=" font-medium leading-none">{props.title}</div>
          <div className="text-sm text-muted-foreground overflow-y-hidden text-ellipsis select-none ">
            <p>
              {props.source} &#x2022; {relativeTime}
            </p>
          </div>
        </div>
      </Link>
      <Separator />
    </>
  );
}
