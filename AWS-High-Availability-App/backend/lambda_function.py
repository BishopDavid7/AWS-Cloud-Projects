import json
import boto3

# Initialize AWS Rekognition and S3 clients
rekognition_client = boto3.client("rekognition")
s3_client = boto3.client("s3")

# S3 Bucket name where images are stored
BUCKET_NAME = "my-app-backend-bucket"

def lambda_handler(event, context):
    try:
        # Extract the image file name from API Gateway request
        image_name = event["queryStringParameters"]["image_name"]

        # Call AWS Rekognition to detect labels in the image
        response = rekognition_client.detect_labels(
            Image={"S3Object": {"Bucket": BUCKET_NAME, "Name": image_name}},
            MaxLabels=10
        )

        # Extract label names and confidence scores
        labels = {label["Name"]: label["Confidence"] for label in response["Labels"]}

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"labels": labels})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
