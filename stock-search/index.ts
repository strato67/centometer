import { APIGatewayProxyEvent } from "aws-lambda";
import yahooFinance from "yahoo-finance2";
yahooFinance.setGlobalConfig({ validation: { logErrors: false } });

export const handler = async (event: APIGatewayProxyEvent) => {
  const query = event.queryStringParameters?.query;

  const response = {
    statusCode: 200,
    body: JSON.stringify(query || "Could not find stock"),
  };
  return response;
};

export const searchStock = async (searchItem: string | undefined) => {
  if (searchItem === "" || searchItem === undefined) {
    return Promise.reject(new Error("Undefined search parameters"));
  }

  let result;

  try {
    result = await yahooFinance.search(
      searchItem,
      {
        lang: "en-US",
        newsCount: 0,
      },
      { validateResult: false }
    );
  } catch (error: any) {
    
    result = error.result;
  }

  if (result && result.quotes){
    
    const { quotes } = result;

    const filteredQuotes = quotes.filter((quote:any) =>
      quote.hasOwnProperty("exchDisp")
    );
    
    const symbolList = filteredQuotes.map((quote:any) => quote.symbol);

    const prices = await yahooFinance.quote(symbolList, {
      fields: ["regularMarketPrice", "regularMarketChangePercent"],
    }, {validateResult:false});

    const quotesWithPrice = filteredQuotes.map((quote:any) => {
      const symbol = quote.symbol;

      const quotePriceObject = prices.find(
        (priceItem:any) => priceItem.symbol === symbol
      );

      const regularMarketPrice = quotePriceObject?.regularMarketPrice || 0;
      const regularMarketChangePercent =
        quotePriceObject?.regularMarketChangePercent || 0;

      return {
        ...quote,
        regularMarketPrice,
        regularMarketChangePercent,
      };
    });

    return quotesWithPrice;

  }
  return Promise.reject(new Error("Could not retrieve results"));

};