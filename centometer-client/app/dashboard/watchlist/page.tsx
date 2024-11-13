"use client";

import { WatchlistTable } from "@/components/watchlist/watchlist-table";
import { columns, pinnedColumns, StockResult } from "@/components/watchlist/columns";
import { PinnedTable } from "@/components/watchlist/pinned-table";
import { getUserWatchlist } from "@/app/actions/stock-info";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export interface StockContextType {
  columns: typeof columns;
  data: StockResult[] | null;
  loading: boolean;
  setData: Dispatch<SetStateAction<StockResult[] | null>>;
}

export const StockContext = createContext<StockContextType | null>(null);

export default function Page() {
  const [data, setData] = useState<StockResult[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setData(await getUserWatchlist());
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="my-2 md:my-6 w-full">
        <h1 className="text-4xl font-bold mb-4">Watchlist</h1>
        {loading && (<>
          <div className="flex items-center justify-center w-full h-96 gap-x-2 text-lg">
          <LoadingSpinner/>
          <p>Loading your watchlist...</p>

          </div>
        </>)}
        <div className="flex flex-col gap-8">
          {data && (
            <StockContext.Provider value={{ columns, data, loading, setData }}>
              <PinnedTable />
              <WatchlistTable />
            </StockContext.Provider>
          )}
        </div>
      </div>
    </>
  );
}
