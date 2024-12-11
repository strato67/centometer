import boto3
from news_retriever import get_world_news, get_finance_news

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    

    world_data = get_world_news()
    finance_data = get_finance_news()

    table_updater(world_data)

    table_updater(finance_data)

    return {
        'statusCode': 200, 
        'body': "Table updated"
    }

def table_updater(news_data):

    batches = [news_data[i:i + 25] for i in range(0, len(news_data), 25)]

    for batch in batches:        
        request_item = {
            "news-storage" : [

                {"PutRequest": {"Item": item}} for item in batch

            ]
        }
        client.batch_write_item(RequestItems=request_item)
    print("Processing " + str(len(batches)) + " batches of " + str(len(news_data)) + " items...")
