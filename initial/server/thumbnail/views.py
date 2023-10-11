from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse
from rest_framework.decorators import api_view
from pytube import YouTube
from io import BytesIO
from PIL import Image
import requests

@api_view(['GET'])
def get_thumbnail(request, video_id):
    try:
        url = f'https://www.youtube.com/watch?v={video_id}'
        yt = YouTube(url)
        thumbnail_url = yt.thumbnail_url

        # Get image data
        response = BytesIO()
        Image.open(requests.get(thumbnail_url, stream=True).raw).save(response, format='PNG')
        image_data = response.getvalue()

        # Return image data as response
        return HttpResponse(image_data, content_type='image/png')

    except Exception as e:
        return HttpResponse(status=500)