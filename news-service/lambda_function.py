import json

def lambda_handler(event, context):

    query_string_params = event['queryStringParameters']
    query_type = event['queryStringParameters']['type']

    if not query_type:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': "*"
            },     
            'body': json.dumps({
                'message' : "No parameters provided."
            })
        }

    try:
        query_responses = {
            'world': lambda: "Querying world news",
            'stock': lambda:stock_news_handler(query_string_params), 
            'pinned': lambda:pinned_news_handler(query_string_params)       
        }

        if query_type not in query_responses:
            raise ValueError(f"Invalid query type: {query_type}")

        response_val = query_responses[query_type]()

        return {
            'statusCode': 200,
            'body': json.dumps(response_val)
        }

    except ValueError as ve:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': "*"
            },
            'body': json.dumps({
                'message': str(ve)
            })
        }

    except KeyError as ke:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': "*"
            },
            'body': json.dumps({
                'message': f"Missing required parameter: {str(ke)}"
            })
        }   

def stock_news_handler(query_string_obj):
    stock_symbol = query_string_obj['symbol']

    if not stock_symbol or stock_symbol is None:
        raise KeyError("No stock provided")
    
    return f"Querying stock news for {stock_symbol}"

def pinned_news_handler(query_string_obj):    
    user_id = query_string_obj['id']

    if not user_id or user_id is None:
        raise KeyError("No user id provided")
    
    return f"Querying stock news for {user_id}"
