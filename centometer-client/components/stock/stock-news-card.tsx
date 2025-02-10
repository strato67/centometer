import { LoadingContext, StockContext } from "@/utils/hooks/stockinfo";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useContext } from "react";
import { NewsLink } from "../home/news-card";
import LoadingCard from "../loading-card";

export default function StockNewsCard() {

  const companyInfo = useContext(StockContext)
  const loading = useContext(LoadingContext)

  


  if(loading){
    return <LoadingCard className="max-h-[36rem]"/>
  }

  return (
    <>
      <Card className="max-h-[36rem] overflow-scroll">
        <CardHeader>
          <CardTitle>News</CardTitle>
          <CardDescription>
            Top articles for {companyInfo.symbol}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 col-span-1 gap-x-4 gap-y-2">

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <NewsLink title="hi" source="fake news" date="2025-01-29T10:01:25Z" url="https://news.google.com/" />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <NewsLink title="hi" source="fake news" date="2025-01-29T10:01:25Z" url="https://news.google.com/" />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <NewsLink title="hi" source="fake news" date="2025-01-29T10:01:25Z" url="https://news.google.com/" />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <NewsLink title="hi" source="fake news" date="2025-01-29T10:01:25Z" url="https://news.google.com/" />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <NewsLink title="hi" source="fake news" date="2025-01-29T10:01:25Z" url="https://news.google.com/" />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <NewsLink title="hi" source="fake news" date="2025-01-29T10:01:25Z" url="https://news.google.com/" />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <NewsLink title="hi" source="fake news" date="2025-01-29T10:01:25Z" url="https://news.google.com/" />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <NewsLink title="hi" source="fake news" date="2025-01-29T10:01:25Z" url="https://news.google.com/" />
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <NewsLink title="hi" source="fake news" date="2025-01-29T10:01:25Z" url="https://news.google.com/" />
          </div>




        </CardContent>

      </Card>
    </>
  );
}
