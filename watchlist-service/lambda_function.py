import json

def lambda_handler(event, context):

    user_id = event['queryStringParameters']['id']

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': "*"
        },  
        'body': json.dumps(user_id)
    }
