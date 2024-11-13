"use client";

import { WatchlistTable } from "@/components/watchlist/watchlist-table";
import {
  columns,
  pinnedColumns,
  StockResult,
} from "@/components/watchlist/columns";
import { PinnedTable } from "@/components/watchlist/pinned-table";
import { getUserWatchlist } from "@/app/actions/stock-info";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function Page() {
  const [data, setData] = useState<StockResult[] | null>(null);
  const [pinnedData, setPinnedData] = useState<StockResult[] | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setData(await getUserWatchlist());
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (data) {
      setPinnedData(
        data.filter((stockItem) => stockItem.pinned_stock === true)
      );
    }
  }, [data]);

  return (
    <>
      <div className="my-2 md:my-6 w-full">
        <h1 className="text-4xl font-bold mb-4">Watchlist</h1>
        {loading && (
          <>
            <div className="flex items-center justify-center w-full h-96 gap-x-2 text-lg">
              <LoadingSpinner />
              <p>Loading your watchlist...</p>
            </div>
          </>
        )}
        <div className="flex flex-col gap-8">
          {data && pinnedData && (
            <>
              <PinnedTable
                columns={pinnedColumns}
                data={pinnedData}
                setData={setPinnedData}
              />
              <WatchlistTable columns={columns} data={data} setData={setData} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
