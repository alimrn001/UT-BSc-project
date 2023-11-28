from django.shortcuts import render
import os
import io
import requests
from django.http import FileResponse, HttpResponseNotFound, JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pytube import YouTube
from django.http import StreamingHttpResponse

@api_view(['GET'])
def stream_video(request, video_id):
    try:
        url = f'https://www.youtube.com/watch?v={video_id}'
        yt = YouTube(url)
        video_stream = yt.streams.get_highest_resolution()

        response = StreamingHttpResponse(
            stream_chunks(video_stream),
            # content_type=video_stream.mime_type
            content_type='video/mp4'
        )
        return response

    except Exception as e:
        return HttpResponse(status=500)

def stream_chunks(stream):
    with requests.get(stream.url, stream=True) as r:
        for chunk in r.iter_content(chunk_size=1024 * 1024):
            if chunk:
                yield chunk