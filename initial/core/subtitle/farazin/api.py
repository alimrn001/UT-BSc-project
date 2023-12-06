import requests

email = "mehraniali8002@gmail.com"
password = "123456"
params = {
    "grant_type": "password",
    "username": email,
    "password": password
}

url = "http://www.faraazin.ir/token"
headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}

response = requests.post(url, data=params, headers=headers)

if response.status_code == 200:
    json_data = response.json()
    print(json_data)
    # access_token = json_data["access_token"]
    # refresh_token = json_data["refresh_token"]
    # expire_in = json_data["expire_in"]
    # Use the obtained tokens and information as needed
else:
    print("Request failed with status code:", response.status_code)
