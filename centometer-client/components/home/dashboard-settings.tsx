import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Card, } from "../ui/card";
import { VisibleWidgets, WidgetKeys } from "@/utils/hooks/dashboardlayout";

type DashboardSettingProps = {
  onReset: () => Promise<void>;
  onToggle: (widgetKey: WidgetKeys) => Promise<void>;
  visibleWidgets: VisibleWidgets
};

export default function DashboardSettings(props: DashboardSettingProps) {
  const dashboardItems = {
    pinned_card: { itemName: "Pinned Stocks", },
    trending_symbols: { itemName: "Trending Symbols",  },
    market_screener: { itemName: "Market Screener",  },
    heatmap: { itemName: "Heat Map", },
    quick_lookup: { itemName: "Quick Lookup",},
    watchlist_news: { itemName: "Watchlist News" },
    business_news: { itemName: "Business News",  },
    world_news: { itemName: "World News",},
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <SettingsIcon size={20}  />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Dashboard Settings</SheetTitle>
          <SheetDescription>Personalize your dashboard</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 w-full items-center">
          <Button variant={"default"} className="col-span-2" onClick={props.onReset}>
            Reset Layout
          </Button>
          <div className="flex flex-col w-full items-center col-span-2 gap-2">
            {Object.entries(dashboardItems).map(([key, value]) => (
              <Card
                key={key}
                className="flex flex-row items-center justify-between rounded-lg border p-4 w-full"
              >
                <div className="space-y-0.5">
                  <Label className="text-base">{value.itemName}</Label>
                </div>

                <Switch
                  checked={props.visibleWidgets[key as keyof VisibleWidgets]}
                  onCheckedChange={()=>props.onToggle(key as keyof VisibleWidgets)}
                />
              </Card>
            ))}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant={"secondary"}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

}
