import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsReel from "./news-reel";

export default function MobileNewsView() {
  return (
    <Tabs defaultValue="pinned" className="w-full h-full ">
      <TabsList className="grid w-full grid-cols-3 ">
        <TabsTrigger value="pinned">Pinned</TabsTrigger>
        <TabsTrigger value="business">Business</TabsTrigger>
        <TabsTrigger value="world">World</TabsTrigger>
      </TabsList>
      <TabsContent value="pinned">
        <NewsReel newsType="watchlist" />
      </TabsContent>
      <TabsContent value="business">
        <NewsReel newsType="business" />
      </TabsContent>
      <TabsContent value="world">
        <NewsReel newsType="world" />
      </TabsContent>
    </Tabs>
  );
}
