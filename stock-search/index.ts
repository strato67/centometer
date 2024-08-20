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
      await yahooFinance.search(searchItem!);
    } catch (e) {
      throw Error("could not find stock")
    }

}
//
