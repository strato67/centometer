import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from pygooglenews import GoogleNews
gn = GoogleNews()

def generate_response(news_data, category):

  response = []
  for entry in news_data:

    response.append({
      "category": {"S": category},
      'title': {"S": entry["title"]},
      'source': {"S": entry["source"]['title']},
      'date': {"S": entry["published"]},
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