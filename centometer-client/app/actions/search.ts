"use server";
import { createClient } from "@/utils/supabase/server";

export type StockResult = {
  Index: string;
  Symbol: string;
  Description: string;
};

export type StockWatchListResult = StockResult & {
  inWatchlist: boolean
}

export const getSearchResults = async (searchQuery: string): Promise<StockWatchListResult[]> =>{
  try {
    const url = process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL + "stockSearch?query=";
    const response = await fetch(`${url?.concat(searchQuery)}`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      return [];
    }
    const json = await response.json();

    const searchResults: StockResult[] = json.message

    const watchlistResults = await getWatchlistfromBatch(searchResults);

    const finalResults: StockWatchListResult[] = searchResults.map((stock) => {
      const inWatchlist = watchlistResults.some(
        (watchlistItem) =>
          watchlistItem.symbol === stock.Symbol && watchlistItem.index === stock.Index
      );
      return { ...stock, inWatchlist };
    });

    return finalResults;
  } catch (error) {
    return [];
  }
};

const getWatchlistfromBatch = async (searchResults: StockResult[]) => {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    const symbols = searchResults.map((stock)=>stock.Symbol)
    const indexes = searchResults.map((stock)=>stock.Index)

    const { data: watchlist, error } = await supabase
      .from("watchlist")
      .select("symbol, index")
      .eq("user_id", user_id)
      .in("symbol", symbols)
      .in("index", indexes);

    if (error) {
      console.error("Error fetching watchlist:", error);
      return [];
    }

    return watchlist ?? [];
  } catch (error) {
    console.error("Error getting watchlist:", error);
    return [];
  }
}