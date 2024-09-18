"use server"

type StockQuery = {
    indexName: string | undefined,
    symbolName: string
}

const YFinanceSymbols: { [key: string]: string } = {
    "ASX": "AX",
    "TSX": "TO",
    "LSE": "L",
    
}

export const getStockOverview = async (searchQuery: StockQuery) => {
    try {
      const url = process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL + "stockOverview?query=";
      let modifiedQuery = searchQuery.symbolName


      if (searchQuery.indexName && YFinanceSymbols.hasOwnProperty(searchQuery.indexName)){
        modifiedQuery.concat("."+YFinanceSymbols[searchQuery.indexName])
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