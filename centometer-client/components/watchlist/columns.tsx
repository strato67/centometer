"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StockResult = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  rating: string;
  index: string;
};

// symbol, name, price, index
export const columns: ColumnDef<StockResult>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    enableHiding: false
  },
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Current Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="">${parseFloat(row.getValue("price")).toFixed(2)}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Analyst Rating",
  },
  {
    accessorKey: "index",
    header: "Index",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {

      const symbol = row.getValue("symbol")

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0 border-foreground rounded-full">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions for {symbol as string}</DropdownMenuLabel>



            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => {  e.stopPropagation() }}>Pin symbol</DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation() }} className="text-destructive focus:text-destructive">Remove</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

  }
];
