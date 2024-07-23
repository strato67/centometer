import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ToggleMode } from "./toggle-mode";
import {
  HomeIcon,
  SearchIcon,
  LineChartIcon,
  BarChartIcon,
  MenuIcon,
  NewspaperIcon,
} from "lucide-react";
import React from "react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const navItems = [
    {
      itemName: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
      link: "/dashboard",
    },
    {
      itemName: "Search",
      icon: <SearchIcon className="h-5 w-5" />,
      link: "/dashboard/search",
    },
    {
      itemName: "Watchlist",
      icon: <LineChartIcon className="h-5 w-5" />,
      link: "/dashboard/watchlist",
    },
    {
      itemName: "News",
      icon: <NewspaperIcon className="h-5 w-5" />,
      link: "/dashboard/news",
    },
  ];

  return (
    <>
      <div className="flex h-screen w-full">
        <aside className="hidden h-full border-r bg-background md:flex w-64 relative  md:flex-col justify-between">
          <div>
            <div className="flex h-14 items-center justify-between border-b px-4">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <BarChartIcon className="h-6 w-6" />
                <h1 className="text-lg font-bold">Centometer</h1>
              </Link>
            </div>
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((navItem, index) => (
                <Link
                  key={index}
                  href={navItem.link}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                >
                  {navItem.icon}
                  <p className="text-lg">{navItem.itemName}</p>
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 flex flex-col max-w-full">
            <div className="flex items-center gap-4 overflow-hidden ">
              <Avatar>
                <AvatarImage src="https://github.com/strato67.png" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold truncate">Profile Name</p>
            </div>
            <ToggleMode />
          </div>
        </aside>
        <div className="flex w-full flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="flex items-center gap-2 font-semibold"
                  variant="ghost"
                >
                  <MenuIcon />
                  <div className="flex items-center gap-1">Centometer</div>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="max-w-xs flex flex-col">
                <nav className="grid gap-4 px-4 py-6 text-sm font-medium">
                  {navItems.map((navItem, index) => {
                    return (
                      <Link
                        key={index}
                        href={navItem.link}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {navItem.icon}
                        {navItem.itemName}
                      </Link>
                    );
                  })}
                </nav>
                <div className="p-6 flex flex-col mt-auto">
                <div className="flex items-center gap-4 overflow-hidden ">
              <Avatar>
                <AvatarImage src="https://github.com/strato67.png" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <p className="text-lg font-bold truncate">Profile Name</p>
            </div>

                  <ToggleMode />
                </div>
              </SheetContent>
            </Sheet>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
