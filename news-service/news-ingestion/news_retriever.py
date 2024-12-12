import sys
import os
from datetime import datetime
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from pygooglenews import GoogleNews
gn = GoogleNews()

def generate_response(news_data, category):

  response = []
  for entry in news_data:

    time_struct = entry["published_parsed"]
    date = datetime(*time_struct[:6])
    iso_date = date.isoformat()+"Z"

    response.append({
      "category": {"S": category},
      'title': {"S": entry["title"]},
      'source': {"S": entry["source"]['title']},
      'date': {"S": iso_date},
      'url' : {"S":entry['links'][0]['href']}
    })

  return response

def get_world_news():
  top_news = gn.top_news()
  entries = top_news["entries"]
  return generate_response(entries, "world")

def get_finance_news():
  business = gn.topic_headlines('BUSINESS', proxies=None, scraping_bee = None)
  entries = business["entries"]
  return generate_response(entries, "business")
