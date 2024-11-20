import { useState } from "react";
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
} from "@/app/actions/stock-info";
import { toast } from "sonner";

export default function AddSearchButton({
  indexName,
  symbolName,
  initialState,
}: {
  indexName: string;
  symbolName: string;
  initialState: boolean;
}) {
  const [added, setAdded] = useState(initialState);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            onClick={async (e) => {
              e.stopPropagation();
              setAdded(!added);

              const modifiedIndex =
                indexName === "IDX" || indexName === "NYSE American"
                  ? ""
                  : indexName;

              const action = added ? removeWatchListItem : addWatchListItem;
              const result = await action({
                indexName: modifiedIndex,
                symbolName,
              });

              if (result === 0) {
                toast.error("Error updating watchlist.", {
                  action: {
                    label: "Dismiss",
                    onClick: () => { },
                  },
                });
              } else {
                setAdded(!added);
                toast.success(
                  `${added ? "Removed from" : "Added to"} watchlist.`
                  , {
                    action: {
                      label: "Dismiss",
                      onClick: () => { },
                    },
                  });
              }
            }}
            className={`rounded-full hover:border-card-foreground  w-8 h-8 text-xl p-0  text-center ${added
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
