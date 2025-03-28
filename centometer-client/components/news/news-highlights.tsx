"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
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
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";

export default function NewsHighlights() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-purple-900 text-white  mx-2 ">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
        <CollapsibleTrigger asChild className="cursor-pointer">
            <CardTitle>
              <div className="flex select-none items-center">
              <Button variant={"ghost"} className="hover:bg-inherit -ml-3">
                {isOpen ? <ChevronUp /> : <ChevronDown />}

              </Button>
                AI Summary
              </div>


            </CardTitle>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent className="-mt-4">
        <CardContent className="flex items-center mx-2">
          <Carousel className="w-full ">
            <CarouselContent className="h-72">
              <CarouselItem className="flex flex-col">
                <h3 className="font-semibold text-xl">Pinned Summary</h3>
                <HighlightMarkdown newsType="watchlist" />
              </CarouselItem>
              <CarouselItem className="flex flex-col">
                <h3 className="font-semibold text-xl mb-2">Business Summary</h3>
                <HighlightMarkdown newsType="business" />
              </CarouselItem>
              <CarouselItem className="flex flex-col">
                <h3 className="font-semibold text-xl">World Summary</h3>
                <HighlightMarkdown newsType="world" />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-muted-foreground border-muted-foreground hover:border-background ml-1" />
            <CarouselNext className="bg-muted-foreground border-muted-foreground hover:border-background mr-1" />
          </Carousel>
        </CardContent>

        <CardFooter>
          <div className="text-sm">
            Generative AI can make mistakes, verify your info.
          </div>
        </CardFooter>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
