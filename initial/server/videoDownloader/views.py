import requests
import io
from django.http import FileResponse, HttpResponseNotFound

def video_view(request):
    # Define the URL to your video
    video_url = 'https://images.ecokowsar.net/bazar/1691327746158.jpg'

    try:
        # Fetch the video content from the URL
        response = requests.get(video_url)
        response.raise_for_status()  # Raise an exception if the request fails

        # Serve the video content as a FileResponse
        video_content = response.content
        return FileResponse(io.BytesIO(video_content))

    except requests.exceptions.RequestException as e:
        # Handle any exceptions (e.g., request failure or invalid URL)
        print(f"Error fetching video: {str(e)}")
        return HttpResponseNotFound("Video not found")
