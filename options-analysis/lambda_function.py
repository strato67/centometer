import json
from options_provider import OptionsProvider

def lambda_handler(event, context):

    try:
        
        query = event['queryStringParameters']['query']
        exp_date = event['queryStringParameters']['date']

        return {
            'statusCode': 200,
            'body': json.dumps('Hello from Lambda!')
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': "*"
            },     
            'body': json.dumps({
                'message' : "An error occurred"
            })
        }

def generate_option_response(stock, exp_date=""):

    if not stock or stock == "":
        raise AttributeError("No search parameter provided")

    options = OptionsProvider(stock, exp_date)

    return {
        'optionsChain': options.get_formatted_options(),
        'putCallRatio': options.put_call_ratio(),
        'openInterestAnalysis': options.open_interest_analysis(),
        'ivData': options.iv_analysis()
    }

print(generate_option_response("AAPL", "2025-05-02"))