import json
import boto3
from news_retriever import get_world_news, get_finance_news

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200, 
        'body': "Table updated"
    }


def table_updater(news_type):

    news_data = get_finance_news() if news_type is "business" else get_world_news()


    pass


print(get_finance_news())