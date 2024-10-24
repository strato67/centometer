import json
import os
from supabase import create_client, Client
from dotenv import load_dotenv
import yfinance as yf
load_dotenv()


url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")

def lambda_handler(event, context):

    user_id = event['queryStringParameters']['id']
    watchlist = get_watchlist(user_id)

    if not watchlist:
        return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': "*"
        },  
        'body': json.dumps({'watchlist': watchlist})
        }


    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': "*"
        },  
        'body': json.dumps({'watchlist': watchlist})
    }

def get_watchlist(id):
    supabase: Client = create_client(url, key)
    try:
        response = supabase.table("watchlist").select("symbol, index").eq("user_id", id).execute()
        return response.data
    except:
        return []

def generate_query_list(stock_list):
    
    yfinancesymbols = {
    'ASX': ".AX",
    'TSX': ".TO",
    'LSE': ".L",
    'FOREX': "=X",
    };

    for item in stock_list:
        symbol = item["symbol"]
        index = item["index"]

        if index in yfinancesymbols:
            item["search_query"] = symbol+yfinancesymbols[index]
        else:
            item["search_query"] = symbol

        
    return stock_list



# print(yf.Ticker('INTC').info)