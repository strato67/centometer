"use client";

import GridLayout from "react-grid-layout";

import PinnedCard from "@/components/home/pinned-card";
import NewsCard from "@/components/home/news-card";
import Heatmap from "@/components/widgets/heatmap";
import TrendingStocksCard from "@/components/home/trending-card";
import MarketScreenerCard from "@/components/home/market-screener-card";

export default function DashboardCanvas() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 12, h: 10, static: true },
    { i: "b", x: 0, y: 0, w: 6, h: 21 },
    { i: "c", x: 6, y: 0, w: 6, h: 21 },
    { i: "d", x: 0, y: 0, w: 6, h: 13 },
    { i: "e", x: 6, y: 0, w: 6, h: 13 },
    { i: "f", x: 0, y: 0, w: 6, h: 13 },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Home</h1>
      <GridLayout
        className="layout sticky"
        layout={layout}
        cols={12}
        width={1610}
        rowHeight={23}
        isResizable
      >
        <div className="" key={"a"}>
          <PinnedCard />
        </div>
        <div key={"b"}>
          <TrendingStocksCard />
        </div>
        <div key={"c"}>
          <MarketScreenerCard />
        </div>
        <div key={"d"}>
          <NewsCard
            title="Watchlist News"
            description="The latest news on your watchlist stocks"
            newsType="watchlist"
          />
        </div>
        <div key={"e"}>
          <NewsCard
            title="Business News"
            description="The latest business stories"
            newsType="business"
          />
        </div>

        <div key={"f"}>
          <NewsCard
            title="World News"
            description="Trending stories from around the world"
            newsType="world"
          />
        </div>
        <Heatmap />
      </GridLayout>
    </>
  );
}
