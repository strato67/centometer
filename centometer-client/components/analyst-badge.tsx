import { Badge } from "./ui/badge";
import { AnalystConsensus } from "./stock/stockType";
import { cn } from "@/lib/utils";

export default function AnalystBadge({
    className,
    consensus,    
  }: {
    className?: string; 
    consensus: keyof typeof analystConsensus;
  }) {
    const analystConsensus: Record<string, AnalystConsensus> = {
      strong_buy: {
        name: "Strong Buy",
        colour: "bg-green-900",
        text: "",
      },
      buy: {
        name: "Buy",
        colour: "bg-green-600",
        text: "",
      },
      hold: {
        name: "Hold",
        colour: "bg-yellow-400",
        text: "text-black",
      },
      underperform: {
        name: "Underperform",
        colour: "bg-orange-500",
        text: "",
      },
      sell: {
        name: "Sell",
        colour: "bg-red-800",
        text: "",
      },
    };
  
    return (
      <Badge
        className={cn(`${analystConsensus[consensus].colour} hover:${analystConsensus[consensus].colour} ${analystConsensus[consensus].text}`,className)}
      >
        {analystConsensus[consensus].name}
      </Badge>
    );
  }