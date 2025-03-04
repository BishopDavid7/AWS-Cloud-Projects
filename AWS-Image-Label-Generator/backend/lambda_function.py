import json
import boto3

rekognition = boto3.client('rekognition')
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

TABLE_NAME = 'ImageLabels'

def lambda_handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    image = event['Records'][0]['s3']['object']['key']

    # Call Rekognition
    response = rekognition.detect_labels(
        Image={'S3Object': {'Bucket': bucket, 'Name': image}},
        MaxLabels=10,
        MinConfidence=75
    )

    labels = {label['Name']: label['Confidence'] for label in response['Labels']}

    # Store in DynamoDB
    table = dynamodb.Table(TABLE_NAME)
    table.put_item(Item={'image_id': image, 'labels': labels})

    return {
        'statusCode': 200,
        'body': json.dumps({'message': 'Labels stored', 'labels': labels})
    }
