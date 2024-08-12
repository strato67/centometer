import React, { useEffect, useRef, memo } from "react";

function SymbolOverview({ticker}:{ticker:string}) {
  const container = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerText = `
  {
  "symbol": "${ticker}",
  "width": "100%",
  "height": "100%",
  "locale": "en",
  "dateRange": "1D",
  "colorTheme": "dark",
  "isTransparent": false,
  "autosize": false,
  "largeChartUrl": "http://localhost:3000/dashboard/stock/"
}`;
    if (container.current) {
      container.current.appendChild(script);
    }
    return () => script.remove();
  }, [ticker]);

  return <div className="tradingview-widget-container" ref={container}></div>;
}

export default memo(SymbolOverview);

