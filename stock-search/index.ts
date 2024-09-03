import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "symbol-storage";

export const handler = async (event: APIGatewayProxyEvent) => {
  const query = event.queryStringParameters?.query;

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: await searchStock(query),
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: (error as Error).message,
      }),
    };
  }
};

export const searchStock = async (searchItem: string | undefined) => {
  if (searchItem === "" || searchItem === undefined) {
    return Promise.reject(new Error("Undefined search parameters"));
  }

  const tickerQuery = {
    TableName: tableName,
    Key: {
      Symbol: searchItem.toUpperCase(),
    },
  };

  const generalQuery = {
    TableName: tableName,
    FilterExpression: "contains(#Description, :d)",
    ExpressionAttributeNames: {
      "#Description": "Description",
    },
    ExpressionAttributeValues: {
      ":d": searchItem.toUpperCase(),
    },
  };

  const tickerSearch = new GetCommand(tickerQuery);
  const tickerResponse = await dynamo.send(tickerSearch);

  if (tickerResponse.Item) {
    return [tickerResponse.Item];
  }

  const command = new ScanCommand(generalQuery);
  const genResponse = await dynamo.send(command);

  if (genResponse.Items?.length === 0) {
    return Promise.reject(new Error("No symbols found"));
  }

  return genResponse.Items;
};
