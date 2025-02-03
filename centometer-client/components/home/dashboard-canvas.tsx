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
  defaultCards,
  defaultLayout,
  loadLayout,
  saveLayout,
  VisibleWidgets,
  WidgetKeys,
} from "@/utils/hooks/dashboardlayout";
import { Layouts } from "react-grid-layout";
import Loading from "@/app/dashboard/loading";
import DashboardSettings from "./dashboard-settings";

export default function DashboardCanvas() {
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const [layouts, setLayouts] = useState<Layouts | null>();
  const [visibleWidgets, setVisibleWidgets] = useState<VisibleWidgets | null>(
    defaultCards
  );

  useEffect(() => {
    const fetchLayout = async () => {
      const loadedLayout = await loadLayout();
      setLayouts(loadedLayout.config);
      setVisibleWidgets(loadedLayout.visible_cards);
    };

    fetchLayout();
  }, []);

  const resetDefaultLayout = async () => {
    setLayouts(defaultLayout);
    setVisibleWidgets(defaultCards);
    await saveLayout(defaultLayout, defaultCards);
  };

  const resetCardPosition = (widgetKey: WidgetKeys, layout: Layouts, visible: boolean) => {

    const updatedLayout = { ...layout };

    if (visible) {

      Object.keys(updatedLayout).forEach((breakpoint) => {
        updatedLayout[breakpoint] = updatedLayout[breakpoint].filter(
          (item) => item.i !== widgetKey
        );
      });
    } else {

      Object.keys(defaultLayout).forEach((breakpoint) => {
        if (!updatedLayout[breakpoint]) {
          updatedLayout[breakpoint] = [];
        }
      
        const defaultItems = defaultLayout[breakpoint].filter((item) => item.i === widgetKey);
      
        if (defaultItems.length > 0) {
          const modifiedItems = defaultItems.map((item) => ({ ...item, y: Infinity }));
      
          updatedLayout[breakpoint] = [
            ...updatedLayout[breakpoint].filter((item) => item.i !== widgetKey),
            ...modifiedItems,
          ];
        }
      });

    }

    return updatedLayout;
  };

  const toggleWidget = async (widgetKey: WidgetKeys) => {
    if (!visibleWidgets || !layouts) {
      return;
    }
    const visible = visibleWidgets[widgetKey];
    const newVisibleWidgets = {
      ...visibleWidgets,
      [widgetKey]: !visibleWidgets[widgetKey],
    };
    
    const newLayout = resetCardPosition(widgetKey, layouts, visible);
    setVisibleWidgets(newVisibleWidgets);
    setLayouts(newLayout)
    await saveLayout(newLayout, newVisibleWidgets);

  }

  if (!layouts || !visibleWidgets) {
    return <Loading />;
  }

  return (
    <>
      <div className="grid w-full grid-cols-2  mb-4">
        <h1 className="text-4xl font-bold ">Home</h1>
        <div className=" justify-self-end">
          <DashboardSettings
            onReset={resetDefaultLayout}
            visibleWidgets={visibleWidgets}
            onToggle={toggleWidget}
          />
        </div>
      </div>

      <ResponsiveGridLayout
        className="layout sticky"
        layouts={layouts}
        rowHeight={23}
        isResizable={true}
        resizeHandles={["se"]}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        draggableHandle=".drag-handle"
        onLayoutChange={async (_, allLayouts) => {
          await saveLayout(allLayouts, visibleWidgets);
        }}
        cols={{ lg: 12, md: 10, sm: 6 }}
      >
        {visibleWidgets.pinned_card && (
          <div key={"pinned_card"}>
            <PinnedCard onRemove={toggleWidget} widgetKey={"pinned_card"} />
          </div>
        )}

        {visibleWidgets.trending_symbols && (
          <div key={"trending_symbols"}>
            <DataCard
              title="Trending Symbols"
              description="The most active stocks today"
              onRemove={toggleWidget}
              widgetKey={"trending_symbols"}
            >
              <TrendingStocks />
            </DataCard>
          </div>
        )}

        {visibleWidgets.market_screener && (
          <div key={"market_screener"}>
            <DataCard
              title="Market Screener"
              description="An overview of the market"
              onRemove={toggleWidget}
              widgetKey={"market_screener"}
            >
              <MarketScreener />
            </DataCard>
          </div>
        )}

        {visibleWidgets.watchlist_news && (
          <div key={"watchlist_news"}>
            <NewsCard
              title="Watchlist News"
              description="The latest news on your watchlist stocks"
              newsType="watchlist"
              onRemove={toggleWidget}
              widgetKey={"watchlist_news"}
            />
          </div>
        )}

        {visibleWidgets.business_news && (
          <div key={"business_news"}>
            <NewsCard
              title="Business News"
              description="The latest business stories"
              newsType="business"
              onRemove={toggleWidget}
              widgetKey={"business_news"}
            />
          </div>
        )}

        {visibleWidgets.world_news && (
          <div key={"world_news"}>
            <NewsCard
              title="World News"
              description="Trending stories from around the world"
              newsType="world"
              onRemove={toggleWidget}
              widgetKey={"world_news"}
            />
          </div>
        )}

        {visibleWidgets.heatmap && (
          <div key={"heatmap"}>
            <DataCard
              title="Heatmap"
              description="Market activity visualized"
              onRemove={toggleWidget}
              widgetKey={"heatmap"}
            >
              <Heatmap />
            </DataCard>
          </div>
        )}
      </ResponsiveGridLayout>
    </>
  );
}
