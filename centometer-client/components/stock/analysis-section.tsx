import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockNewsCard from "./stock-news-card";
import StockOptionsCard from "./stock-options-card";
import StockAnalysisCard from "./stock-analysis-card";

export default function AnalysisSection() {
  const tabOptions = [
    { tabName: "news", tabTitle: "News", tabComponent: <StockNewsCard/> },
    { tabName: "analysis", tabTitle: "Analysis", tabComponent: <StockAnalysisCard/> },
    { tabName: "options", tabTitle: "Options", tabComponent: <StockOptionsCard/> },
  ];

  return (
    <Tabs defaultValue="news" className="w-full ">
      <TabsList className="grid w-full grid-cols-3">
        {tabOptions.map((tab, index) => (
          <TabsTrigger
            key={index}
            value={tab.tabName}
          >
            {tab.tabTitle}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabOptions.map((tab,index)=> (
        <TabsContent value={tab.tabName} key={index} className="">
          {tab.tabComponent}
        </TabsContent>



      ))}

       

    </Tabs>
  );
}
