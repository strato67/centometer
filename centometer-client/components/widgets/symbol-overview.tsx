import React, { useEffect, useRef, memo } from "react";
import Link from "next/link";

function SymbolOverview() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerText = `
  {
  "symbol": "NVDA",
  "width": 350,
  "height": 220,
  "locale": "en",
  "dateRange": "12M",
  "colorTheme": "dark",
  "isTransparent": false,
  "autosize": false,
  "largeChartUrl": ""
}`;
    if (container.current) {
      container.current.appendChild(script);
    }
    return () => script.remove();
  }, []);

  return <div className="tradingview-widget-container" ref={container}></div>;
}

export default memo(SymbolOverview);
