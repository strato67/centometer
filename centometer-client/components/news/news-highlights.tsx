import { AsteriskIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import HighlightMarkdown from "./highlight-markdown";

export default function NewsHighlights() {
  
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-purple-900 text-white h-[27rem] mx-2 ">
      <CardHeader>
        <CardTitle className="flex gap-1">
          <AsteriskIcon />
          Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center mx-2">
        <Carousel className="w-full ">
          <CarouselContent className="h-72">
            <CarouselItem className="flex flex-col">
              <h3 className="font-semibold text-xl">Pinned Summary</h3>
              <HighlightMarkdown newsType="watchlist"/>
            </CarouselItem>
            <CarouselItem className="flex flex-col">
              <h3 className="font-semibold text-xl">Business Summary</h3>
              <HighlightMarkdown newsType="business"/>
            </CarouselItem>
            <CarouselItem className="flex flex-col">
              <h3 className="font-semibold text-xl">World Summary</h3>
              <HighlightMarkdown newsType="world"/>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="bg-muted-foreground border-muted-foreground hover:border-background"  />
          <CarouselNext className="bg-muted-foreground border-muted-foreground hover:border-background" />
        </Carousel>
      </CardContent>

      <CardFooter>
        <div className="text-sm">
          Generative AI can make mistakes, verify your info.
        </div>
      </CardFooter>
    </Card>
  );
}


