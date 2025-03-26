"use client";

import { LayoutIcon, SunIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  defaultCards,
  defaultLayout,
  saveLayout,
} from "@/utils/hooks/dashboardlayout";
import { toast } from "sonner";
import { ToggleMode } from "../toggle-mode";


export default function PreferencesCard() {
  const resetLayout = async () => {
    await saveLayout(defaultLayout, defaultCards);
    toast.success("Dashboard layout reset.")
  };

  return (
    <>
      <Card className="w-full md:w-11/12 lg:w-2/3">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your experience</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-muted">
                <SunIcon className="h-5 w-5" />
              </div>
              <div>
                <Label htmlFor="theme-toggle" className="text-base">
                  Theme
                </Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark mode
                </p>
              </div>
            </div>
            <ToggleMode/>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-muted">
                <LayoutIcon className="h-5 w-5" />
              </div>
              <div>
                <Label htmlFor="reset-layout" className="text-base">
                  Dashboard Layout
                </Label>
                <p className="text-sm text-muted-foreground">
                  Reset your dashboard to default layout
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={resetLayout}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
