"use server"

type StockQuery = {
    indexName: string | undefined,
    symbolName: string
}

const YFinanceTypes = {
    ASX: "AX",
    TSX: "TO",
    LSE: "L",
    
}

export const getStockOverview = async (searchQuery: string) => {
    try {
      const url = process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL + "stockOverview?query=";
      const response = await fetch(`${url?.concat(searchQuery)}`);
      if (!response.ok) {
        return {};
      }
      const json = await response.json();
      return json.message;
    } catch (error) {
      return {};
    }
  };