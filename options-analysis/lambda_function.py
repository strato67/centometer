import json
from options_provider import OptionsProvider

def lambda_handler(event, context):

    try:
        
        query_params = event.get('queryStringParameters', {})
        query = query_params.get('query')
        exp_date = query_params.get('date', "")

        response = json.dumps(generate_option_response(query, exp_date=exp_date))

        return {
            'statusCode': 200,
            'body': json.dumps(response)
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