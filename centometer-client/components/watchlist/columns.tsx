"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StockResult = {
  id: string
  symbol: string
  name: string
  price: number
  rating: string
  index: string

}

// symbol, name, price, index
export const columns: ColumnDef<StockResult>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Current Price",
  },
  {
    accessorKey: "rating",
    header: "Analyst Rating",
  },
  {
    accessorKey: "index",
    header: "Index",
  },
]
