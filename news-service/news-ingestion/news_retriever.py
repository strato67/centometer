import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from pygooglenews import GoogleNews
gn = GoogleNews()

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