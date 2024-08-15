import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!!!"),
  };
  return response;
};
