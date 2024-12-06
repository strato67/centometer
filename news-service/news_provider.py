from pygooglenews import GoogleNews
from dotenv import load_dotenv
import os
from supabase import create_client, Client

gn = GoogleNews()
load_dotenv()

def generate_response(news_data):
  count = 0
  response = []
  for entry in news_data:

    response.append({
      'id': count,
      'title': entry["title"],
      'source': entry["source"]['title'],
      'date': entry["published"],
      'url' : entry['links'][0]['href']
    })

    count += 1

  return response

def get_world_news():
  top_news = gn.top_news()
  entries = top_news["entries"]
  return generate_response(entries)

def get_finance_news():
  business = gn.topic_headlines('BUSINESS', proxies=None, scraping_bee = None)
  entries = business["entries"]
  return generate_response(entries)

def get_stock_news(stock_query):
  stock_news = gn.search(stock_query, when = '1h')
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
  
