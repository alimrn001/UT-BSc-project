import requests
import time

email = "mehraniali8002@gmail.com"
password = "123456"
url = "http://www.faraazin.ir/"


def get_api_token():

    params = {
        "grant_type": "password",
        "username": email,
        "password": password
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = requests.post(url+'token', data=params, headers=headers)

    if response.status_code == 200:
        json_data = response.json()
        return json_data
        # access_token = json_data["access_token"]
        # refresh_token = json_data["refresh_token"]
        # expire_in = json_data["expire_in"]
        # Use the obtained tokens and information as needed
    else:
        print("Request failed with status code:", response.status_code)


token_data = get_api_token()
print(token_data["access_token"])


def call_text_translate_api(access_token):
    # access_token = "your_access_token_here"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "text": "some text",
        "mode": "en_fa",  # Change to "en_fa" if needed
        "detailed": True  # Change to False if needed
    }
    try:
        response = requests.post(
            url+'api/translate', json=payload, headers=headers)
        # print(response.json())
    except Exception as err:
        print("An unexpected error occurred:", err)


def call_upload_file_api(access_token, file_path):
    headers = {
        "Authorization": f"Bearer {access_token}",
        # "Content-Type": "multipart/form-data"
    }

    try:
        with open(file_path, 'rb') as file:
            files = {'file': (file.name, file, 'application/octet-stream')}
            response = requests.post(
                url + '/api/translate/upload', headers=headers, files=files)
            # print(response.json())
            return response.json()
    except Exception as err:
        print("An unexpected error occurred:", err)


def get_file_upload_status(access_token, upload_id):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    try:
        response = requests.get(
            url+'api/translate/uploadStatus?id='+upload_id, headers=headers)
        # print(response.json())
        return response.json()
    except Exception as err:
        print("An unexpected error occurred:", err)


def call_file_translation(access_token, file_upload_status, file_upload_information):
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    payload = {
        "id": file_upload_information["id"],
        "confirmed": True,
        "packageCharge": file_upload_status["packageCharge"],
        "walletCharge": file_upload_status["walletCharge"]
    }
    try:
        response = requests.post(
            url+'api/translate/start', json=payload, headers=headers)
        print(response.json())
    except Exception as err:
        print("An unexpected error occurred:", err)


# call_text_translate_api(token_data["access_token"])
file_upload_info = call_upload_file_api(token_data["access_token"], 'test.vtt')
time.sleep(10)
file_upload_stat = get_file_upload_status(
    token_data["access_token"], file_upload_info['id'])

call_file_translation(token_data["access_token"],
                      file_upload_stat, file_upload_info)
