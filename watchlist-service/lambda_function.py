import json
import os
from supabase import create_client, Client
from dotenv import load_dotenv
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






