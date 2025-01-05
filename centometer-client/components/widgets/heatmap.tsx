"use client";

import React, { useEffect, useRef, memo } from "react";

function Heatmap() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.type = "text/javascript";
    script.async = true;

    const widgetConfig = {
      exchanges: [],
      dataSource: "SPX500",
      grouping: "sector",
      blockSize: "market_cap_basic",
      blockColor: "change",
      locale: "en",
      symbolUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/stock/`,
      colorTheme: "dark",
      hasTopBar: false,
      isDataSetEnabled: false,
      isZoomEnabled: true,
      hasSymbolTooltip: true,
      isMonoSize: false,
      width: "100%",
      height: "100%",
    };
    script.textContent = JSON.stringify(widgetConfig);

    if (container.current) {
      container.current.appendChild(script);
    }
    return () => script.remove();
  }, []);

  return <div className="tradingview-widget-container w-full min-h-72 rounded-2xl" ref={container}></div>;
}

export default memo(Heatmap);
