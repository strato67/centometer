import { useEffect, useRef, memo } from "react";

interface SymbolOverviewProps {
  ticker: string;
  symbolChange: boolean;
}

function StockChart(props: SymbolOverviewProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    const widgetConfig = {
      autosize: true,
      symbol: props.ticker,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "3",
      locale: "en",
      allow_symbol_change: props.symbolChange,
      calendar: false,
      support_host: "https://www.tradingview.com",
    };

    script.textContent = JSON.stringify(widgetConfig);
    if (container.current) {
      container.current.appendChild(script);
    }
    return () => script.remove();
  }, [props]);

  return (
    <div
      className="tradingview-widget-container shadow-sm"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
}

export default memo(StockChart);
