import requests
from bs4 import BeautifulSoup

video_url = "https://www.youtube.com/watch?v=pFptt7Cargc&ab_channel=tameimpalaVEVO"

try:
    # Send a GET request to the video's URL
    
    headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
    
    response = requests.get(video_url, headers=headers)
    response.raise_for_status()

    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the script tag containing the transcript
    script_tag = soup.find("script", {"type": "application/ld+json"})

    # Extract the JSON data from the script tag
    json_data = script_tag.string.strip()

    # Search for the subtitles in the JSON data
    subtitles = []
    if '"captionTracks":' in json_data:
        start_index = json_data.index('"captionTracks":') + len('"captionTracks":')
        end_index = json_data.index(']', start_index) + 1
        captions_data = json_data[start_index:end_index]

        # Extract the subtitle data
        for line in captions_data.split("},{"):
            subtitle = {}
            for item in line.split(","):
                key, value = item.split(":")
                subtitle[key.strip('"')] = value.strip('"')
            subtitles.append(subtitle)

        # Create an SRT file with the subtitles
        srt_file_name = "./subtitles.srt"
        with open(srt_file_name, "w", encoding="utf-8") as srt_file:
            counter = 1
            for subtitle in subtitles:
                text = subtitle.get("name", "")
                text = text.encode("utf-8").decode("unicode_escape")
                text = text.replace("\\n", "\n")
                srt_file.write(f"{counter}\n")
                srt_file.write(f"{subtitle['startTime']} --> {subtitle['endTime']}\n")
                srt_file.write(f"{text}\n\n")
                counter += 1

        print(f"Subtitles saved as {srt_file_name}")

    else:
        print("Subtitles not found for this video.")

except Exception as e:
    print(f"An error occurred: {str(e)}")