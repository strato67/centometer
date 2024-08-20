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

const searchStock = async (searchItem: string | undefined) => {

  if (searchItem === undefined) {
    return
  }


  const results = await yahooFinance.search(searchItem)

  console.log(results)


};

searchStock("APPL")