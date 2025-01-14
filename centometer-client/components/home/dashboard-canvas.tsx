"use client";

import { Responsive, WidthProvider } from "react-grid-layout";
import PinnedCard from "@/components/home/pinned-card";
import NewsCard from "@/components/home/news-card";
import Heatmap from "@/components/widgets/heatmap";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DataCard from "./data-card";
import TrendingStocks from "../widgets/trending-stocks";
import MarketScreener from "../widgets/market-screener";

export default function DashboardCanvas() {
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const largeLayout = [
    { i: "a", x: 0, y: 0, w: 12, h: 10, static: true },
    { i: "b", x: 0, y: 0, w: 6, h: 22, minH: 22, minW: 3, maxH: 22 },
    { i: "c", x: 6, y: 0, w: 6, h: 22, minH: 22, minW: 3, maxH: 22 },
    { i: "d", x: 0, y: 0, w: 6, h: 14, minH: 14, minW: 3, maxH: 14 },
    { i: "e", x: 6, y: 0, w: 6, h: 14, minH: 14, minW: 3, maxH: 14 },
    { i: "f", x: 0, y: 0, w: 6, h: 14, minH: 14, minW: 3, maxH: 14 },
    { i: "g", x: 6, y: 0, w: 6, h: 22, minH: 22, minW: 3, maxH: 22 },
  ];

  const smallLayout = [
    { i: "a", x: 0, y: 0, w: 12, h: 10, static: true },
    { i: "b", x: 0, y: 0, w: 6, h: 22, maxH: 22, maxW: 6, minH: 22, minW: 6 },
    { i: "c", x: 6, y: 0, w: 6, h: 22, maxH: 22, maxW: 6, minH: 22, minW: 6 },
    { i: "d", x: 0, y: 0, w: 6, h: 14, maxH: 13, maxW: 6, minH: 14, minW: 6 },
    { i: "e", x: 6, y: 0, w: 6, h: 14, maxH: 13, maxW: 6, minH: 14, minW: 6 },
    { i: "f", x: 0, y: 0, w: 6, h: 14, maxH: 13, maxW: 6, minH: 14, minW: 6 },
    { i: "g", x: 6, y: 0, w: 6, h: 22, maxH: 22, maxW: 6, minH: 22, minW: 6 },
  ];

  const layouts = {
    lg: largeLayout,
    sm: smallLayout,
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Home</h1>
      <ResponsiveGridLayout
        className="layout sticky overflow-hidden"
        layouts={layouts}
        rowHeight={23}
        isResizable={true}
        resizeHandles={["se"]}
        breakpoints={{ lg: 1200, sm: 768 }}
        cols={{ lg: 12, sm: 6 }}
      >
        <div className="" key={"a"}>
          <PinnedCard />
        </div>
        <div key={"b"}>
          <DataCard
            title="Trending Symbols"
            description="The most active stocks today"
          >
            <TrendingStocks />
          </DataCard>
        </div>
        <div key={"c"}>
          <DataCard
            title="Market Screener"
            description="An overview of the market"
          >
            <MarketScreener />
          </DataCard>
        </div>
        <div key={"d"} className="z-10">
          <NewsCard
            title="Watchlist News"
            description="The latest news on your watchlist stocks"
            newsType="watchlist"
          />
        </div>
        <div key={"e"} className="z-10">
          <NewsCard
            title="Business News"
            description="The latest business stories"
            newsType="business"
          />
        </div>

        <div key={"f"} className="z-10">
          <NewsCard
            title="World News"
            description="Trending stories from around the world"
            newsType="world"
          />
        </div>
        <div key={"g"}>
          <DataCard
            title="Heatmap"
            description="Market activity visualized"
          >
            <Heatmap/>
          </DataCard>
        </div>
        

      </ResponsiveGridLayout>
    </>
  );
}
