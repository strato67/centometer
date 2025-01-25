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
import { useEffect, useState } from "react";
import {
  loadLayout,
  saveLayout,
} from "@/utils/hooks/dashboardlayout";
import { Layouts } from "react-grid-layout";
import Loading from "@/app/dashboard/loading";

export default function DashboardCanvas() {
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const [layouts, setLayouts] = useState<Layouts | null>();
  useEffect(() => {
    const fetchLayout = async () => {
      const loadedLayout = await loadLayout();
      setLayouts(loadedLayout);
    };

    fetchLayout();
  }, []);

  if (!layouts) {
    return <Loading />;
  }

  return (
    <>
      <ResponsiveGridLayout
        className="layout sticky overflow-hidden"
        layouts={layouts}
        rowHeight={23}
        isResizable={true}
        resizeHandles={["se"]}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        draggableHandle=".drag-handle"
        onLayoutChange={async (_, allLayouts) => {
          await saveLayout(allLayouts);
        }}
        cols={{ lg: 12, md: 10, sm: 6 }}
      >
        <div className="" key={"pinned_card"}>
          <PinnedCard />
        </div>
        <div key={"trending_symbols"}>
          <DataCard
            title="Trending Symbols"
            description="The most active stocks today"
          >
            <TrendingStocks />
          </DataCard>
        </div>
        <div key={"market_screener"}>
          <DataCard
            title="Market Screener"
            description="An overview of the market"
          >
            <MarketScreener />
          </DataCard>
        </div>
        <div key={"watchlist_news"}>
          <NewsCard
            title="Watchlist News"
            description="The latest news on your watchlist stocks"
            newsType="watchlist"
          />
        </div>
        <div key={"business_news"}>
          <NewsCard
            title="Business News"
            description="The latest business stories"
            newsType="business"
          />
        </div>

        <div key={"world_news"}>
          <NewsCard
            title="World News"
            description="Trending stories from around the world"
            newsType="world"
          />
        </div>
        <div key={"heatmap"}>
          <DataCard title="Heatmap" description="Market activity visualized">
            <Heatmap />
          </DataCard>
        </div>
      </ResponsiveGridLayout>
    </>
  );
}
