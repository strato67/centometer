from lambda_function import lambda_handler
import pytest
import json

def testInvalidUser():

    mock_event = {'queryStringParameters':{
        'id': 'dddd'
    }}
    watchlist_response = lambda_handler(mock_event, context="")
    body = watchlist_response["body"]
     


    
