import { useState } from "react";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { Check } from "lucide-react";

export default function AddStockButton() {
  const [added, setAdded] = useState(false);

  return (
    <Button
      variant={"outline"}
      className=" text-xs rounded-3xl border border-neutral-700  h-fit py-1.5"
      onClick={()=>setAdded(!added)}
    >
      {added ? (
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
