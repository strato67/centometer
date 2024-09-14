import json
import yfinance as yf

def lambda_handler(event, context):

    test = company_overview("MSFT")


    return {
        'statusCode': 200,
        'body': json.dumps(test)
    }


def company_overview(symbol: str):

    company = yf.Ticker(symbol)
    return company.info