import requests

email = "mehraniali8002@gmail.com"
password = "13456"
params = {
    "grant_type": "password",
    "username": email,
    "password": password
}

url = "http://www.faraazin.ir/"


def get_api_token():
    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    try:
        response = requests.post(url + 'token', data=params, headers=headers)
        # Raises an HTTPError for bad status codes (e.g., 400, 404, etc.)
        response.raise_for_status()

        json_response_data = response.json()
        return json_response_data

    except requests.RequestException as e:
        print("Request failed:", e)
        raise  # Re-raise the exception for handling at a higher level


api_token_data = {}

try:
    api_token_data = get_api_token()
    # print("API Token Data:", api_token_data)
except Exception as err:
    print("An unexpected error occurred:", err)

print(api_token_data["access_token"])


def call_text_translate_api(access_token):
    access_token = "your_access_token_here"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "text": "some text",
        "mode": "fa_en",  # Change to "en_fa" if needed
        "detailed": True  # Change to False if needed
    }
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(response)
    except Exception as err:
        print("An unexpected error occurred:", err)


call_text_translate_api(api_token_data["access_token"])
