"use server";

import { createClient } from "@/utils/supabase/server";
type StockQuery = {
  indexName: string;
  symbolName: string;
};

const YFinanceSymbols: { [key: string]: string } = {
  ASX: ".AX",
  TSX: ".TO",
  LSE: ".L",
  FOREX: "=X",
};

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
  const supabase = createClient();
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

    query = query.eq("index", searchQuery.indexName);

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
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    if (await getWatchlistItem(searchQuery)) {
      throw Error;
    }

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
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    if (!(await getWatchlistItem(searchQuery))) {
      throw Error;
    }

    let error;
    const response = await supabase
      .from("watchlist")
      .delete()
      .eq("user_id", user_id)
      .eq("symbol", searchQuery.symbolName)
      .eq("index", searchQuery.indexName);
    error = response.error;

    if (error) {
      throw error;
    }
  } catch (error) {
    return 0;
  }
};

export const pinWatchlistItem = async (searchQuery: StockQuery) => {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    const { data, error } = await supabase
      .from("watchlist")
      .select("pinned_stock")
      .eq("user_id", user_id)
      .eq("symbol", searchQuery.symbolName)
      .eq("index", searchQuery.indexName);

    if (error) {
      throw error;
    }

    const isPinned: boolean = data[0].pinned_stock;

    const response = await supabase
      .from("watchlist")
      .update({ pinned_stock: !isPinned })
      .eq("user_id", user_id)
      .eq("symbol", searchQuery.symbolName)
      .eq("index", searchQuery.indexName);

    if (response.error) {
      throw response.error;
    }
    return `${searchQuery.symbolName} ${isPinned === true ? 'unpinned.' : 'pinned.'}`
  } catch (error) {
    return ;
  }
};
