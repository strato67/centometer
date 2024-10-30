"use server";
import { createClient } from "@/utils/supabase/server";

export type StockResult = {
  Index: string;
  Symbol: string;
  Description: string;
};

export type StockWatchListResult = StockResult & {
  inWatchlist: boolean;
};

export const getSearchResults = async (
  searchQuery: string
): Promise<StockWatchListResult[]> => {
  try {
    const url =
      process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL + "stockSearch?query=";
    const response = await fetch(`${url?.concat(searchQuery)}`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      return [];
    }
    const json = await response.json();

    const searchResults: StockResult[] = json.message;

    const watchlistResults = await getWatchlistfromBatch(searchResults);

    const finalResults: StockWatchListResult[] = searchResults.map((stock) => {
      const inWatchlist = watchlistResults.some((watchlistItem) => {
        const isSpecialIndex =
          stock.Index === "NYSE American" || stock.Index === "IDX";
        return (
          watchlistItem.symbol === stock.Symbol &&
          (watchlistItem.index === stock.Index ||
            (isSpecialIndex && watchlistItem.index === null))
        );
      });
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

    const symbolsWithNullIndexes = searchResults
      .filter(
        (stock) => stock.Index === "IDX" || stock.Index === "NYSE American"
      )
      .map((stock) => stock.Symbol);

    const symbolsWithNonNullIndexes = searchResults
      .filter(
        (stock) => stock.Index !== "IDX" && stock.Index !== "NYSE American"
      )
      .map((stock) => stock.Symbol);

    const indexesWithoutNull = searchResults
      .filter(
        (stock) => stock.Index !== "IDX" && stock.Index !== "NYSE American"
      )
      .map((stock) => stock.Index);

    const { data: watchlistNull, error: errorNull } = await supabase
      .from("watchlist")
      .select("symbol, index")
      .eq("user_id", user_id)
      .in("symbol", symbolsWithNullIndexes)
      .is("index", null);

    if (errorNull) {
      console.error("Error fetching watchlist with null indexes:", errorNull);
      return [];
    }

    const { data: watchlistNonNull, error: errorNonNull } = await supabase
      .from("watchlist")
      .select("symbol, index")
      .eq("user_id", user_id)
      .in("symbol", symbolsWithNonNullIndexes)
      .in("index", indexesWithoutNull);

    if (errorNonNull) {
      console.error(
        "Error fetching watchlist with non-null indexes:",
        errorNonNull
      );
      return [];
    }

    const watchlist = [...(watchlistNull || []), ...(watchlistNonNull || [])];
    return watchlist ?? [];
  } catch (error) {
    console.error("Error getting watchlist:", error);
    return [];
  }
};
