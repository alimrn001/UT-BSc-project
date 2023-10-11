import os
import requests
from pytube import YouTube

def download_video(url, output_path, chunk_size=10):
    yt = YouTube(url)

    # Get the highest resolution stream
    video_stream = yt.streams.get_highest_resolution()

    # Create output directory if it doesn't exist
    os.makedirs(output_path, exist_ok=True)

    # Get the video file size
    total_size = video_stream.filesize

    # Download and save each chunk
    print(video_stream.url)
    with requests.get(video_stream.url, stream=True) as response:
        response.raise_for_status()
        downloaded_size = 0

        with open(os.path.join(output_path, 'video2.mp4'), 'wb') as file:
            for chunk in response.iter_content(chunk_size=chunk_size * 1024 * 1024):
                if chunk:
                    file.write(chunk)
                    downloaded_size += len(chunk)

                    # Calculate the progress and print it
                    progress = min(100, 100 * downloaded_size // total_size)
                    print(f"Downloading: {progress}%")

# Example usage
video_url = "https://www.youtube.com/watch?v=rHux0gMZ3Eg"
output_path = "E:\\university\\BSC-thesis\\test\\initial\\core\\video"
download_video(video_url, output_path)
