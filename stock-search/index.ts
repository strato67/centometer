import { APIGatewayProxyEvent } from "aws-lambda";
import yahooFinance from "yahoo-finance2";

export const handler = async (event: APIGatewayProxyEvent) => {
  const query = event.queryStringParameters?.query;

  const response = {
    statusCode: 200,
    body: JSON.stringify(query || "Could not find stock"),
  };
  return response;
};

export const searchStock = async (searchItem: string | undefined) => {
  try {
    const response = await yahooFinance.search(searchItem!, {
      lang: "en-US",
      newsCount: 0,
    });
    const { quotes } = response;

    const filteredQuotes = quotes.filter((quote) =>
      quote.hasOwnProperty("exchDisp")
    );

    const symbolList = filteredQuotes.map((quote) => quote.symbol);

    const prices = await yahooFinance.quote(symbolList, {
      fields: ["regularMarketPrice", "regularMarketChangePercent"],
    });

    const quotesWithPrice = filteredQuotes.map((quote) => {
      const symbol = quote.symbol;

      const quotePriceObject = prices.find(
        (priceItem) => priceItem.symbol === symbol
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
  } catch (e) {
    throw Error("could not find stock");
  }
};
