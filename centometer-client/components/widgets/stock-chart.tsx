import { useEffect, useRef, memo } from 'react';

function StockChart({ticker}:{ticker:string}) {
    const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "${ticker}",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "3",
          "locale": "en",
          "allow_symbol_change": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        if (container.current) {
            container.current.appendChild(script);
          }
          return () => script.remove();
    },
    [ticker]
  );

  return (
    <div className="tradingview-widget-container shadow-sm" ref={container} style={{ height: "100%", width: "100%" }}>

   
    </div>
  );
}

export default memo(StockChart);
