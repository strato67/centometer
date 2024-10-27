import json
import os
from supabase import create_client, Client
from concurrent.futures import ThreadPoolExecutor
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

    query_list = generate_query_list(watchlist)
    data_list = get_stock_info(query_list)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': "*"
        },  
        'body': json.dumps({'watchlist': data_list})
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

def fetch_yfinance(item):
    symbol = item["search_query"]
    data = yf.Ticker(symbol).info

    item["price"] = data.get('currentPrice') or data.get('regularMarketOpen') or 0
    item["name"] = data.get('longName')
    item["rating"] = data.get('recommendationKey', "N/A") 

    if item["rating"] == 'none': item["rating"] = "N/A" 

    del item["search_query"]
    
    return item


def get_stock_info(query_list):
    
    with ThreadPoolExecutor() as executor:
        updated_list = list(executor.map(fetch_yfinance, query_list))

    return updated_list
