"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { StockResult } from "./columns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export interface CustomTableMetaPinned {
  removeRow: (rowIndex: number, stock: StockResult) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData: Dispatch<SetStateAction<StockResult[]>>;
  setWatchlist: Dispatch<SetStateAction<StockResult[]>>;
}

export function PinnedTable<TData, TValue>({
  columns,
  data,
  setData,
  setWatchlist,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 3,
      },
    },
    meta: {
      removeRow: (rowIndex: number, stock: StockResult) => {
        const id = stock.id;
        const isPinned = stock.pinned_stock;
        const updatedObject = {
          ...stock,
          pinned_stock: !isPinned,
        };
        setWatchlist((prevData) =>
          (prevData ?? []).map((result) => {
            if (result.id === id) {
              return updatedObject;
            }
            return result;
          })
        );

        setData((prevData) =>
          (prevData ?? []).filter((_, index) => index !== rowIndex)
        );
      },
    } as CustomTableMetaPinned,
  });

  const router = useRouter();
  const currentPage: number = React.useMemo(() => {
    const isUndefined: Boolean =
      table.options?.state?.pagination?.pageIndex === undefined ||
      table.options?.state?.pagination?.pageIndex === null;
    return isUndefined
      ? 0
      : (table.options?.state?.pagination?.pageIndex as number);
  }, [table.options?.state?.pagination?.pageIndex]);

  return (
    <Card className="w-full rounded-md border">
      <div className="flex items-center mr-6 -mb-4">
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle>Pinned Stocks</CardTitle>
            <CardDescription>
              Add up to 6 stocks from your watchlist to follow
            </CardDescription>
          </CardHeader>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto bg-foreground text-background dark:bg-inherit dark:text-foreground"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="select-none cursor-pointer"
                onClick={() => {
                  const stock = row.original as StockResult;
                  router.push(
                    stock.index === "IDX" ||
                      stock.index === "NYSE American" ||
                      stock.index === ""
                      ? `/dashboard/stock/?tvwidgetsymbol=${stock.symbol}`
                      : `/dashboard/stock/?tvwidgetsymbol=${stock.index}%3A${stock.symbol}`
                  );
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No pinned stocks found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="grid items-center py-2 mx-6 grid-cols-2 mb-1">
        <div className="text-sm">{table.getRowCount()} Item(s)</div>
        <div className="flex justify-end space-x-2 items-center">
          <div className="text-sm">
            {currentPage + 1} of {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
