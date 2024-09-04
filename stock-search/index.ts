import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "symbol-list";

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
    FilterExpression: "#Symbol = :d OR contains(#Description, :d)",
    ExpressionAttributeNames: {
      "#Description": "Description",
      "#Symbol": "Symbol"
    },
    ExpressionAttributeValues: {
      ":d": searchItem.toUpperCase(),
    },
  };

  const command = new ScanCommand(generalQuery);
  const genResponse = await dynamo.send(command);
  const results = genResponse.Items

  if (results?.length === 0) {
    return Promise.reject(new Error("No symbols found"));
  }


  const filteredResults = results?.filter(result=>result.Symbol === searchItem.toUpperCase() || result.Description === searchItem.toUpperCase())

  if (filteredResults?.length !== 0){
    return filteredResults
  }

  return results;
};