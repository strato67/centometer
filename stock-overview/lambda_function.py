import json
import yfinance as yf

def lambda_handler(event, context):

    msft = yf.Ticker("MSFT")

    print(msft.info)


    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda :-(')
    }


