import json
import yfinance as yf

def lambda_handler(event, context):

    try:
        if (event['queryStringParameters']) and (event['queryStringParameters']['query']) and (
            event['queryStringParameters']['query'] is not None):
                
            company_symbol = event['queryStringParameters']['query']
            overview = company_overview(company_symbol)

            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': "*"
                },     
                'body': json.dumps({
                    'message': overview
                })
            }
        else:
            raise("No search parameters provided")
    except ValueError as ve:
        print(ve)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': "*"
            },     
            'body': json.dumps({
                'message' : "An error occurred"
            })
        }

def company_overview(symbol: str):

    if len(symbol) == 0 or not symbol:
        raise("No search parameter provided")
        
    company = yf.Ticker(symbol)
    company_info = company.info

    if len(company_info) == 1 and company_info['trailingPegRatio'] == None:
        raise("No companies found")

    return company_info
