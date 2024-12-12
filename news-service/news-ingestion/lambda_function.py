import boto3
from news_retriever import get_world_news, get_finance_news

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    
    world_data = get_world_news()
    finance_data = get_finance_news()

    errors = []

    try:
        table_updater(world_data)
    except:
        errors.append("Could not update world news.")

    try:
        table_updater(finance_data)
    except:
        errors.append("Could not update finance news.")

    if not errors:
        return {
            'statusCode': 200, 
            'body': "Table updated"
        }
    
    return {
            'statusCode': 400, 
            'body': {errors}
        }

def table_updater(news_data):
    BATCH_SIZE = 25    
    seen_dates = set()

    unique_news_data = []
    for item in news_data:
        date = item['date']['S']
        if date not in seen_dates:
            seen_dates.add(date)
            unique_news_data.append(item)

    batches = [unique_news_data[i:i + BATCH_SIZE] for i in range(0, len(unique_news_data), BATCH_SIZE)]

    for batch in batches:
        request_items = {
            "news-storage": [
                {"PutRequest": {"Item": item}} for item in batch
            ]
        }
        client.batch_write_item(RequestItems=request_items)

