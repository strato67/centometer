"use client"

import { WatchlistTable } from "@/components/watchlist/watchlist-table";
import { columns, StockResult } from "@/components/watchlist/columns";
import { PinnedTable } from "@/components/watchlist/pinned-table";
import { getUserWatchlist } from "@/app/actions/stock-info";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export interface StockContextType {
  columns: typeof columns;
  data: StockResult[] | null;
  setData: Dispatch<SetStateAction<StockResult[] | null>>;
}

export const StockContext = createContext<StockContextType | null>(null);

export default function Page() {


  const [data, setData] = useState<StockResult[] | null>(null)

  useEffect(()=>{
    (async () => {
      setData(await getUserWatchlist())
    })();
  }, [])

  return (
    <>
      <div className="my-2 md:my-6 w-full">
        <h1 className="text-4xl font-bold mb-4">Watchlist</h1>

        <div className="flex flex-col gap-8">
        {data && (

          <StockContext.Provider value={{columns, data, setData}}>
            <PinnedTable />
            <WatchlistTable />
          </StockContext.Provider>

        )}


        </div>





      </div>
    </>
  );
}
