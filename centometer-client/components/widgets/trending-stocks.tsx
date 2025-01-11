"use client";

import { useEffect, useRef, memo } from "react";

function TrendingStocks() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
    script.type = "text/javascript";
    script.async = true;

    const widgetConfig = {
      colorTheme: "dark",
      dateRange: "12M",
      exchange: "US",
      showChart: true,
      locale: "en",
      width: "100%",
      height: "100%",
      largeChartUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/stock/`,
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: false,
      plotLineColorGrowing: "rgba(41, 98, 255, 1)",
      plotLineColorFalling: "rgba(41, 98, 255, 1)",
      gridLineColor: "rgba(42, 46, 57, 0)",
      scaleFontColor: "rgba(209, 212, 220, 1)",
      belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
      belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
      symbolActiveColor: "rgba(41, 98, 255, 0.12)",
    };
    script.textContent = JSON.stringify(widgetConfig);

    if (container.current) {
      container.current.appendChild(script);
    }
    return () => script.remove();
  }, []);

  return (
    <div
      className="tradingview-widget-container min-w-fit rounded-2xl min-h-96 "
      ref={container}
    ></div>
  );
}

export default memo(TrendingStocks);

