import os
import io
import requests
from django.http import FileResponse, HttpResponseNotFound, JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pytube import YouTube


@csrf_exempt
def download_youtube_video(request):
    if request.method == 'GET':
        try:
            # Get the YouTube video URL from the request
            print('here')
            # video_url = request.POST.get('video_url')
            video_url = 'https://www.youtube.com/watch?v=XenVUbjNswA'
            # Create a YouTube object and download the video
            yt = YouTube(video_url)
            stream = yt.streams.get_highest_resolution()
            video_bytes = stream.stream_to_buffer()

            # Create a BytesIO object to hold the video content
            video_io = io.BytesIO(video_bytes)

            # Serve the video content as a FileResponse
            response = FileResponse(video_io, content_type='video/mp4')
            response['Content-Disposition'] = f'attachment; filename="{yt.title}.mp4"'

            return response
        except Exception as e:
            # Handle any exceptions (e.g., video download failure)
            print(f"Error downloading video: {str(e)}")
            return JsonResponse({'error': 'Video download failed'})

    return HttpResponseNotFound("Video not found")


@api_view(['GET'])
def get_video_streaming_url(request, video_id):
    try:
        url = f'https://www.youtube.com/watch?v={video_id}'
        yt = YouTube(url)
        stream = yt.streams.get_highest_resolution()
        format_data = {
            'itag': stream.itag,
            'type': stream.type,
            'video_id': video_id,
            'resolution': stream.resolution,
            'audio_abr': stream.abr,
            'extension': stream.mime_type.split('/')[-1],
            'url': stream.url,
        }
        return Response(format_data)

    except Exception as e:
        return HttpResponse(status=500)