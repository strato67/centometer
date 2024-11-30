import json

# TODO: Add parameters: world, single, multiple /world , /pinned

def lambda_handler(event, context):

    if not (event['queryStringParameters']) or (event['queryStringParameters']['type'] is None):
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': "*"
            },     
            'body': json.dumps({
                'message' : "No parameters provided."
            })
        }
    
    query_type = event['queryStringParameters']['type']

    response_val = ""

    if query_type == 'world':
        response_val = "Querying world news"
    elif query_type == 'stock':

        stock_symbol = event['queryStringParameters']['symbol']

        if stock_symbol:
            response_val = f"Querying stock news for {stock_symbol}"
        else:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': "*"
                },
                'body': json.dumps({
                    'message': "No symbol provided."
                })
            }
        
    return {
        'statusCode': 200,
        'body': json.dumps(response_val)
    }
