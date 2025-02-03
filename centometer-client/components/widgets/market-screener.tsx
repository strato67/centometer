"use client";

import { useEffect, useRef, memo } from "react";

function MarketScreener() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;

    const widgetConfig = {
      width: "100%",
      height: "100%",
      defaultColumn: "overview",
      defaultScreen: "most_capitalized",
      market: "america",
      showToolbar: true,
      colorTheme: "dark",
      locale: "en",
      largeChartUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/stock/`,
    };
    script.textContent = JSON.stringify(widgetConfig);

    if (container.current) {
      container.current.appendChild(script);
    }
    return () => script.remove();
  }, []);

  return (
    <div
      className="tradingview-widget-container w-full min-h-96 rounded-2xl"
      ref={container}
    ></div>
  );
}

export default memo(MarketScreener);
