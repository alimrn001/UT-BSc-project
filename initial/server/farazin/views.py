from django.shortcuts import render

# Create your views here.
import requests

domain = 'https://www.faraazin.ir'
username = 'mehraniali8002@gmail.com'
password = '123456'


def retrieve_api_access_token():
    api_url = '/token'
    grant_type = 'password'
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    payload = {
        'grant_type': grant_type,
        'username': username,
        'password': password
    }
    try:
        response = requests.post(domain+api_url, headers=headers, json=payload)
        if response.status_code == 200:  # Check for successful response
            print("Request successful")
            print(response.json())
        # Handle the response data here, e.g., response.json(), response.text, etc.
        else:
            print(f"Request failed with status code: {response.status_code}")

    except requests.RequestException as e:
        print(f"Request failed: {e}")