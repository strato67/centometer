import { WatchlistTable } from "@/components/watchlist/watchlist-table";
import { StockResult, columns } from "@/components/watchlist/columns";
import { createClient } from "@/utils/supabase/server";

import { PinnedTable } from "@/components/watchlist/pinned-table";


async function getData(): Promise<StockResult[]> {

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const id = user?.id
  const url = process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL + "watchlistService?id="

  const response = await fetch(`${url + id}`, {
    headers: {
      "x-api-key": `${process.env.NEXT_PUBLIC_AWS_WATCHLIST}`
    }
  });
  if (!response.ok) {
    return [];
  }
  const json = await response.json();
  return json.watchlist

}

export default async function Page() {
  const data = await getData();
  return (
    <>
      <div className="my-2 md:my-6 w-full">
        <h1 className="text-4xl font-bold mb-4">Watchlist</h1>

        <div className="flex flex-col gap-8">
        <PinnedTable columns={columns} data={data}/>
        <WatchlistTable columns={columns} data={data} />

        </div>





      </div>
    </>
  );
}
