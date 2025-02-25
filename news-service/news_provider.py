from pygooglenews import GoogleNews
from dotenv import load_dotenv
from supabase import create_client, Client
import os
import boto3
from boto3.dynamodb.conditions import Key

gn = GoogleNews()
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('news-storage')
load_dotenv()

def generate_response(news_data):
  response = []
  for entry in news_data:

    response.append({
      'title': entry["title"],
      'source': entry["source"]['title'] if isinstance(entry["source"], dict) else entry["source"],
      'date': entry["published"] if "published" in entry else entry["date"],
      'url': entry['links'][0]['href'] if "links" in entry and entry['links'] else entry['url']
    })

  return response

def get_archived_news(news_type, page_token=None):
  query_params = {
        'KeyConditionExpression': Key('category').eq(news_type),
        'Limit': 20, 
        'ScanIndexForward': False
  }

  if page_token:
    query_params["ExclusiveStartKey"] = {'category': news_type, 'date': page_token}

  response_raw = table.query(**query_params)
  items_raw = response_raw['Items']
  items_processed = generate_response(items_raw)

  response = {
    'data': items_processed,
  }

  if response_raw.get('LastEvaluatedKey'):
    response['LastEvaluatedKey'] = response_raw.get('LastEvaluatedKey').get('date')

  return response

def get_stock_news(stock_query):
  stock_news = gn.search(stock_query, when = '5d')
  entries = stock_news["entries"]
  return generate_response(entries)

def get_pinned_news(user_id):

  url: str = os.environ.get("SUPABASE_URL")
  key: str = os.environ.get("SUPABASE_ANON_KEY")
  supabase: Client = create_client(url, key)

  db_response_list = []

  try:
    response = supabase.table("watchlist").select("symbol").eq("user_id", user_id).eq("pinned_stock", True).execute()
    db_response_list =  response.data
  except:
    return db_response_list
    
  query_list = list(map(lambda x: x['symbol'],db_response_list))
  news_list = get_stock_news(' OR '.join(query_list))

  return news_list

