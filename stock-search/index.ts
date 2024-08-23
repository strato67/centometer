import { APIGatewayProxyEvent } from "aws-lambda";


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


  return `${searchItem} received`

  //return Promise.reject(new Error("Could not retrieve results"));
};
