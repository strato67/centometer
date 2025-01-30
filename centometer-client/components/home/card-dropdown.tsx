import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WidgetKeys } from "@/utils/hooks/dashboardlayout";
import { EllipsisVerticalIcon } from "lucide-react";

interface CardDropDownProps {
  onRemove: (widgetKey: WidgetKeys) => Promise<void>;
  widgetKey: WidgetKeys;
}

export default function CardDropDown(props: CardDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVerticalIcon size={20} className="justify-self-end" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuItem onClick={() => props.onRemove(props.widgetKey)}>Remove Widget</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
