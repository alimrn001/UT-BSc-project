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
        formats = []
        for stream in yt.streams:
            format_data = {
                'itag': stream.itag,
                'type': stream.type,
                'video_id': video_id,
                'resolution': stream.resolution,
                'audio_abr': stream.abr,
                'extension': stream.mime_type,
                'url': stream.url,
            }
            formats.append(format_data)
        return Response(formats)

    except Exception as e:
        return HttpResponse(status=500)
