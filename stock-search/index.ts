import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {

  const query = event.queryStringParameters?.query


  const response = {
    statusCode: 200,
    body: JSON.stringify(query || "Could not find stock"),
  };
  return response;
};
 