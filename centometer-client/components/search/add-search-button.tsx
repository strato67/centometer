import { useState } from "react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check } from "lucide-react";

export default function AddSearchButton() {
  const [added, setAdded] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setAdded(!added);
            }}
            className={`rounded-full hover:border-card-foreground  w-8 h-8 text-xl p-0  text-center ${added ? "bg-card-foreground hover:bg-card-foreground" : "bg-card-background"}` }
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
