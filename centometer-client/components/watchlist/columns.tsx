"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  pinWatchlistItem,
  removeWatchListItem,
} from "@/app/actions/stock-info";
import { toast } from "sonner";
import AnalystBadge from "../analyst-badge";
import { CustomTableMeta } from "./watchlist-table";
import { CustomTableMetaPinned, PinnedTable } from "./pinned-table";
import { TrashIcon, PinIcon, PinOffIcon } from "lucide-react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StockResult = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  rating: string;
  index: string;
  pinned_stock: boolean;
};

// symbol, name, price, index
export const columns: ColumnDef<StockResult>[] = [
  {
    accessorKey: "symbol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Symbol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-4">{row.getValue("symbol")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
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
      <div className="ml-4">
        ${parseFloat(row.getValue("price")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Analyst Rating",
    cell: ({ row }) =>
      row.getValue("rating") === "N/A" ? (
        <div className="w-full">N/A</div>
      ) : (
        <div className="w-full">
          <AnalystBadge
            className="text-sm w-fit items-center text-center"
            consensus={row.getValue("rating") as string}
          />
        </div>
      ),
  },
  {
    accessorKey: "index",
    header: "Index",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const symbol = row.getValue("symbol");
      const index = row.getValue("index");
      const meta = table.options.meta as CustomTableMeta;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 hover:border-foreground rounded-full"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              Actions for {symbol as string}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async (e) => {
                e.stopPropagation();
                const result = await pinWatchlistItem({
                  indexName: index as string,
                  symbolName: symbol as string,
                });

                if (!result) {
                  toast.error("Error pinning item.", {
                    action: {
                      label: "Dismiss",
                      onClick: () => {},
                    },
                  });
                } else {
                  toast.success(result, {
                    action: {
                      label: "Dismiss",
                      onClick: () => {},
                    },
                  });
                  meta.modifyPinned(row.original);
                }
              }}
            >
              <PinIcon className="mr-2" size={16} />
              Pin symbol
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async (e) => {
                e.stopPropagation();
                const result = await removeWatchListItem({
                  indexName: index as string,
                  symbolName: symbol as string,
                });
                if (result === 0) {
                  toast.error("Error updating watchlist.", {
                    action: {
                      label: "Dismiss",
                      onClick: () => {},
                    },
                  });
                } else {
                  toast.success(`${symbol} removed from watchlist.`, {
                    action: {
                      label: "Dismiss",
                      onClick: () => {},
                    },
                  });
                  meta.removeRow(row.index);
                }
              }}
              className="text-destructive focus:text-destructive"
            >
              <TrashIcon className="mr-2" size={16} />
              Remove Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const pinnedColumns: ColumnDef<StockResult>[] = [
  {
    accessorKey: "symbol",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          Symbol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-4">{row.getValue("symbol")}</div>,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableHiding: false,
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
      <div className="ml-4">
        ${parseFloat(row.getValue("price")).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Analyst Rating",
    cell: ({ row }) =>
      row.getValue("rating") === "N/A" ? (
        <div className="w-full">N/A</div>
      ) : (
        <div className="w-full">
          <AnalystBadge
            className="text-sm w-fit items-center text-center"
            consensus={row.getValue("rating") as string}
          />
        </div>
      ),
  },
  {
    accessorKey: "index",
    header: "Index",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const symbol = row.getValue("symbol");
      const index = row.getValue("index");
      const meta = table.options.meta as CustomTableMetaPinned;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 hover:border-foreground rounded-full"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              Actions for {symbol as string}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async (e) => {
                e.stopPropagation();
                const result = await pinWatchlistItem({
                  indexName: index as string,
                  symbolName: symbol as string,
                });

                if (!result) {
                  toast.error("Error unpinning item.", {
                    action: {
                      label: "Dismiss",
                      onClick: () => {},
                    },
                  });
                } else {
                  toast.success(result, {
                    action: {
                      label: "Dismiss",
                      onClick: () => {},
                    },
                  });
                  meta.removeRow(row.index, row.original);
                }
              }}
            >
              <PinOffIcon className="mr-2" size={16} />
              Unpin symbol
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
