import json

# TODO: Add parameters: world, single, multiple

def lambda_handler(event, context):

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda :)')
    }
