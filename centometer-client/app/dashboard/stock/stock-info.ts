"use server";

import { createClient } from "@/utils/supabase/server";
type StockQuery = {
  indexName: string | undefined;
  symbolName: string;
};

const YFinanceSymbols: { [key: string]: string } = {
  ASX: ".AX",
  TSX: ".TO",
  LSE: ".L",
  FOREX: "=X",
};

const supabase = createClient();

export const getStockOverview = async (searchQuery: StockQuery) => {
  try {
    const url =
      process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL + "stockOverview?query=";
    let modifiedQuery = searchQuery.symbolName;

    if (
      searchQuery.indexName &&
      YFinanceSymbols.hasOwnProperty(searchQuery.indexName)
    ) {
      modifiedQuery = modifiedQuery.concat(
        YFinanceSymbols[searchQuery.indexName]
      );
    }

    const response = await fetch(`${url?.concat(modifiedQuery)}`);
    if (!response.ok) {
      return {};
    }
    const json = await response.json();
    return json.message;
  } catch (error) {
    return {};
  }
};

export const getWatchlistItem = async (searchQuery: StockQuery) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    let query = supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", user_id)
      .eq("symbol", searchQuery.symbolName);

    if (searchQuery.indexName) {
      query = query.eq("index", searchQuery.indexName);
    } else {
      query = query.is("index", null);
    }

    const { data: watchlist } = await query;

    if (watchlist) {
      return watchlist?.length > 0;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const addWatchListItem = async (searchQuery: StockQuery) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    const response = await supabase
      .from("watchlist")
      .insert([
        {
          user_id: user_id,
          symbol: searchQuery.symbolName,
          index: searchQuery.indexName,
        },
      ])
      .select();

    if (response.error) {
      throw response.error;
    }
  } catch (error) {
    return 0;
  }
};

export const removeWatchListItem = async (searchQuery: StockQuery) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    let error;

    if (!searchQuery.indexName) {
      const response = await supabase
        .from("watchlist")
        .delete()
        .eq("user_id", user_id)
        .eq("symbol", searchQuery.symbolName)
        .is("index", null);
      error = response.error;
    } else {
      const response = await supabase
        .from("watchlist")
        .delete()
        .eq("user_id", user_id)
        .eq("symbol", searchQuery.symbolName)
        .eq("index", searchQuery.indexName);
      error = response.error;
    }

    if (error) {
      throw error;
    }
  } catch (error) {
    return 0;
  }
};
