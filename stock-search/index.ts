import { APIGatewayProxyEvent } from "aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "symbol-storage";

export const handler = async (event: APIGatewayProxyEvent) => {
  const query = event.queryStringParameters?.query;

  try {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
    },
      body: JSON.stringify({
        message: await searchStock(query),
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers : {
        "Access-Control-Allow-Origin": "*",
      },
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
    KeyConditionExpression: 'Symbol = :s',
    ExpressionAttributeValues: {
      ":s": searchItem.toUpperCase(),
    },
  };
  
  const query = new QueryCommand(tickerQuery);
  const tickerResponse = await dynamo.send(query)
  const tickerResults = tickerResponse.Items

  if (tickerResults && tickerResults.length > 0 ) {
    return tickerResults
  }

  const generalQuery = {
    TableName: tableName,
    FilterExpression: "#Description = :d OR contains(#Description, :d)",
    ExpressionAttributeNames: {
      "#Description": "Description",
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

  return results;
};