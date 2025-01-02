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


const articles = [
  {
    title:
      "The best after-Christmas Amazon deals: Score Apple AirTags for a near record low and more - Yahoo Life",
    source: "Yahoo Life",
    date: "2024-12-29T19:00:35Z",
    url: "https://news.google.com/rss/articles/CBMi1wFBVV95cUxOZ2NheUs3NEo2aUlWaDk2cEpybFZNUDhDUk0zekZfaDlxUVhZenpYTGxYallRQzdXNEgwQWZROUZRLXRSZmtoeUVpRklDSmNGaVhGdU1oM29IZGlyNElrdzFjRHpUNU5XRnhCVWRNRE4wNjNZdV9MVVYySzk0TGpqSDZQbXhrZHh0ZTZzdWNUSWIzX1QyaVl2b1llTVJjV0p6MVlTMEN3TWQyTW5PVGY3akQzTlZGQXN5cVd2dHhDNFllVVRheDlRUmJpbUtEUEFoMVpROHVhRQ?oc=5",
  },
];

export default function NewsCard({
  title,
  description,
  newsType,
}: {
  title: string;
  description: string;
  newsType: NewsType;
}) {
  return (
    <>
      <Card className="md:w-full rounded-2xl pt-2 ">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72 w-full rounded-md border">
            {articles.map((article, index) => {
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
