import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsReel from "./news-reel";

export default function MobileNewsView() {
  return (
    <Tabs defaultValue="pinned" className="w-[400px] ">
      <TabsList className="grid w-full grid-cols-3 ">
        <TabsTrigger value="pinned">Pinned</TabsTrigger>
        <TabsTrigger value="business">Business</TabsTrigger>
        <TabsTrigger value="world">World</TabsTrigger>
      </TabsList>
      <TabsContent value="pinned">
        <NewsReel />
      </TabsContent>
      <TabsContent value="business">
        <NewsReel />
      </TabsContent>
      <TabsContent value="world">
        <NewsReel />
      </TabsContent>
    </Tabs>
  );
}
