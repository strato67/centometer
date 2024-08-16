import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify("This is a new test"),
  };
  return response;
};
 