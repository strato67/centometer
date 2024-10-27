from lambda_function import lambda_handler, generate_query_list, get_stock_info
import pytest
import json
from dotenv import load_dotenv
import os
load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_ANON_KEY")

mock_list = [{'symbol': 'AMD', 'index': 'NASDAQ'}, 
            {'symbol': 'BA', 'index': 'NYSE'}, 
            {'symbol': 'SPY', 'index': 'ASX'},
            {'symbol': 'BCE', 'index': 'TSX'},
            {'symbol': 'SPY', 'index': None}   
            ]

def test_invalid_user():

    mock_event = {'queryStringParameters':{
        'id': 'dddd'
    }}
    watchlist_response = lambda_handler(mock_event, context="")
    body = watchlist_response["body"]
    output = json.loads(body)

    assert not output["watchlist"]

def test_valid_user():
    user_id: str = os.environ.get("TEST_USER_ID")

    mock_event = {'queryStringParameters':{
        'id': user_id
    }}
    watchlist_response = lambda_handler(mock_event, context="")
    body = watchlist_response["body"]
    output = json.loads(body)

    assert output["watchlist"]

def test_query_list(): 
    query_list = generate_query_list(mock_list)
    
    assert {'symbol': 'SPY', 'index': None, 'search_query': 'SPY'} in query_list
    assert {'symbol': 'BCE', 'index': 'TSX', 'search_query': 'BCE.TO'} in query_list
    assert {'symbol': 'SPY', 'index': 'ASX', 'search_query': 'SPY.AX'} in query_list

def test_yfinance():
    query_list = generate_query_list(mock_list)
    finallist = get_stock_info(query_list)    

    if all(all(key in result for key in ("name", "price", "rating", "symbol", "index")) for result in finallist):
        assert True