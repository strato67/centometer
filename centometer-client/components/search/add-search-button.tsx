import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check } from "lucide-react";
import {
  removeWatchListItem,
  addWatchListItem,
  getWatchlistItem,
} from "@/app/dashboard/stock/stock-info";
import { toast } from "sonner";

export default function AddSearchButton({
  indexName,
  symbolName,
}: {
  indexName: string;
  symbolName: string;
}) {
  const [added, setAdded] = useState(false);

  useEffect(()=>{
    (async () => {
      setAdded(await getWatchlistItem({indexName, symbolName}))
    })();
  },[indexName, symbolName])


  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              setAdded(!added);

              const action = added ? removeWatchListItem : addWatchListItem;
              const result = await action({ indexName, symbolName });

              if (result === 0) {
                toast.error("Error updating watchlist.");
              } else {
                setAdded(!added);
                toast.success(
                  `${added ? "Removed from" : "Added to"} watchlist.`
                );
              }
            }}
            className={`rounded-full hover:border-card-foreground  w-8 h-8 text-xl p-0  text-center ${
              added
                ? "bg-card-foreground hover:bg-card-foreground"
                : "bg-card-background"
            }`}
          >
            {added ? <Check size={16} className="text-background" /> : "+"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {added ? <p>Remove from watchlist</p> : <p>Add to watchlist</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
