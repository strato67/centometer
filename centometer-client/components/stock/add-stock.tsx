import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import {
  addWatchListItem,
  removeWatchListItem,
} from "@/app/actions/stock-info";

export default function AddStockButton({
  isAdded,
  symbol,
  setAdded,
}: {
  isAdded: boolean;
  symbol: string;
  setAdded: Dispatch<SetStateAction<null | boolean>>;
}) {
  const stockMap = {
    indexName: symbol?.includes(":") ? symbol.split(":")[0] : "",
    symbolName: symbol?.includes(":") ? symbol.split(":")[1] : symbol,
  };

  return (
    <Button
      variant={"outline"}
      className=" text-xs rounded-3xl border border-neutral-700  h-fit py-1.5"
      onClick={async () => {
        const action = isAdded ? removeWatchListItem : addWatchListItem;
        const result = await action(stockMap);

        if (result === 0) {
          toast.error("Error updating watchlist.");
        } else {
          setAdded(!isAdded);
          toast.success(`${isAdded ? "Removed from" : "Added to"} watchlist.`);

        }
      }}
    >
      {isAdded ? (
        <>
          <Check size={14} className="mr-1 " />
          Watching
        </>
      ) : (
        <>
          {" "}
          <Star size={14} className="mr-1 " />
          Add to Watchlist
        </>
      )}
    </Button>
  );
}
