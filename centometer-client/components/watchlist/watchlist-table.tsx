"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Card } from "../ui/card";
//import { StockContext } from "@/app/dashboard/watchlist/page";

export interface CustomTableMeta {
  removeRow: (rowIndex: number) => void;
  updateRow: (stockId: string) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setData: Dispatch<SetStateAction<StockResult[] | null>>;
}

export function WatchlistTable<TData, TValue>({
  columns,
  data,
  setData
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: data ?? [],
    columns,
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
        pageSize: 6,
      },
    },
    meta: {
      removeRow: (rowIndex: number) => {
        setData((prevData) =>
          (prevData ?? []).filter((_, index) => index !== rowIndex)
        );
      },
      updateRow: (stockId: string) => {
        setData((prevData) =>
          (prevData ?? []).map((result) => {
            if (result.id === stockId) {
              result.pinned_stock = !result.pinned_stock

              return {
                ...result,
                pinned_stock: !result.pinned_stock
              }
            }
            return result
          })
        );
      }
    } as CustomTableMeta,
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
    <Card className=" w-full rounded-md border">
      <div className="flex items-center  pt-4 pb-2 mx-6 mt-4 gap-2 ">

        <Input
          placeholder="Search by symbol..."
          value={
            (table.getColumn("symbol")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("symbol")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
                No results.
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
