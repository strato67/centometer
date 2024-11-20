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

const articles = [
  {
    "title": "Global Markets Rally as Tech Stocks Surge",
    "description": "Global markets saw a significant rebound today, driven by a surge in major tech stocks, including companies in the semiconductor, software, and cloud computing sectors. Investors regained confidence as corporate earnings exceeded expectations and the tech sector showed resilience in the face of rising interest rates. Analysts predict this rally could continue, particularly if tech companies continue to innovate and diversify into emerging markets like AI and renewable energy. However, experts caution that macroeconomic uncertainties remain, including inflation and geopolitical tensions, which could impact future market trends.",
    "link": "https://www.example.com/global-markets-tech-stocks-surge"
  },
  {
    "title": "New Climate Deal Reached at Global Summit",
    "description": "World leaders concluded the international climate summit by agreeing on a new climate deal aimed at limiting global warming to 1.5°C. The agreement includes commitments to reduce greenhouse gas emissions, transition to renewable energy, and provide financial aid to developing nations affected by climate change. Environmental advocates praised the deal, although some critics argue that more immediate actions are needed to meet these ambitious targets. The summit highlighted the growing consensus among nations to combat climate change, but also revealed divisions over how quickly wealthier countries should phase out fossil fuels.",
    "link": "https://www.example.com/global-summit-climate-deal"
  },
  {
    "title": "Breakthrough in Cancer Research Announced",
    "description": "Scientists at a leading medical research institute have announced a major breakthrough in the treatment of aggressive cancers. The new therapy, which targets cancer cells at a genetic level, has shown promising results in early clinical trials, significantly extending survival rates for patients with previously untreatable forms of the disease. Researchers believe this could revolutionize the way cancer is treated, offering hope to millions worldwide. While the treatment is still in its experimental stages, the discovery has been hailed as a significant step forward in oncology, with potential for broader applications in the future.",
    "link": "https://www.example.com/breakthrough-cancer-research-2024"
  },
  {
    "title": "Electric Vehicles Dominate Auto Sales in 2024",
    "description": "Electric vehicles (EVs) have officially overtaken gasoline-powered cars in terms of global sales in 2024, signaling a pivotal moment in the automotive industry. Major automakers reported that demand for EVs has surged due to advances in battery technology, lower prices, and increasing consumer awareness of environmental issues. Governments worldwide are also offering incentives and infrastructure improvements to support the transition to greener transportation. Industry experts predict that the trend will continue, with EVs expected to dominate the auto market in the coming years, as traditional internal combustion engines gradually phase out.",
    "link": "https://www.example.com/electric-vehicles-dominate-2024"
  },
  {
    "title": "AI Revolutionizes Healthcare Diagnostics",
    "description": "Artificial intelligence (AI) is transforming the healthcare industry, particularly in diagnostics, where AI-driven tools are enabling faster, more accurate disease detection. Hospitals and medical centers worldwide are adopting AI-powered systems that analyze medical images, laboratory results, and patient data to diagnose conditions ranging from cancers to heart disease. This technology reduces human error and allows doctors to make better-informed decisions, leading to improved patient outcomes. While the adoption of AI raises concerns about data privacy and job displacement, its potential to revolutionize healthcare is undeniable, making diagnosis quicker and more reliable.",
    "link": "https://www.example.com/ai-healthcare-diagnostics"
  }
]

export default function NewsCard({
  title,
  description,
}: {
  title: string;
  description: string;
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
                  description={article.description}
                  link={article.link}
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
  description,
  link,
}: {
  title: string;
  description: string;
  link: string
}) {
  return (
    <>
      <div className=" flex items-center space-x-4  p-4">
        <div className="flex-1 space-y-2 h-auto">
          <Link href={link} target="about:blank" className="text-lg font-medium leading-none">{title}</Link>
          <p className="text-sm text-muted-foreground overflow-y-hidden text-ellipsis select-none h-10 ">
            {description}
          </p>
        </div>
      </div>
      <Separator />
    </>
  );
}
