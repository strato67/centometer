"use server";

export type StockResult = {
  Index: string;
  Symbol: string;
  Description: string;
};

export const getSearchResults = async (searchQuery: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL + "stockSearch?query=";
    const response = await fetch(`${url?.concat(searchQuery)}`, {
      cache: "force-cache",
    });
    if (!response.ok) {
      return [];
    }
    const json = await response.json();
    return json.message;
  } catch (error) {
    return [];
  }
};
