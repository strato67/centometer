import { WatchlistTable } from "@/components/watchlist/watchlist-table";
import { StockResult, columns } from "@/components/watchlist/columns";

async function getData(): Promise<StockResult[]> {
  // Fetch data from your API here.
  return [
    {
      id: "dadadw22",
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 225,
      rating: "buy",
      index: "NASDAQ",
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();
  return (
    <>
      <div className="my-2 md:my-6 w-full grid gap-5">
        <h1 className="text-4xl font-bold">Watchlist</h1>
        <WatchlistTable columns={columns} data={data} />
      </div>
    </>
  );
}
