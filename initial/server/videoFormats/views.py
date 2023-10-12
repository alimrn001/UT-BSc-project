from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from pytube import YouTube
import requests
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def get_video_formats(request, video_id):
    try:
        url = f'https://www.youtube.com/watch?v={video_id}'
        yt = YouTube(url)
        return Response(yt.streams)

    except Exception as e:
        return HttpResponse(status=500)
