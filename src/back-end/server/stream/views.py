from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse, StreamingHttpResponse
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import get_video_stream_formats, get_video_default_stream_data
from invidious.invapi import youtube_video_exists
from pytube import YouTube
from io import BytesIO
from PIL import Image
import requests
from urllib.request import urlopen


@api_view(['GET'])
def get_video_stream_format_data(request, video_id):
    format_type = request.GET.get('type', 'default')

    if not youtube_video_exists(f"https://youtu.be/{video_id}"):
        return HttpResponse("Video does not exist!", status=404)

    try:
        if format_type == 'all':
            stream_formats = get_video_stream_formats(video_id)
            return Response(stream_formats)
        elif format_type == 'default':
            stream_data = get_video_default_stream_data(video_id)
            return Response(stream_data)
        else:
            return HttpResponse(status=400)

    except Exception as e:
        return HttpResponse('Connection Failed!', status=500)


@api_view(['GET'])
def get_video_thumbnail(request, video_id):
    if not youtube_video_exists(f"youtu.be/{video_id}"):
        return HttpResponse(status=404)
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
        return HttpResponse('Connection Failed!', status=500)


@api_view(['GET'])
def tunnel_video_blob_content(request):
    video_id = request.GET.get('id', '')
    url = request.GET.get('url', '')
    if url == '':
        return HttpResponse('Error: Specify video URL', status=400)
    # url = 'https://rr2---sn-25glenl6.googlevideo.com/videoplayback?expire=1704657904&ei=kK-aZbmLN-zWxN8P59e1gA8&ip=45.32.147.190&id=o-AFP3gLNQ9gGPnxrNoyEPLyFCDhvPO1ug1pWU8ALB83gw&itag=22&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=4n&mm=31%2C29&mn=sn-25glenl6%2Csn-25ge7nsk&ms=au%2Crdu&mv=m&mvi=2&pl=21&initcwndbps=636250&vprv=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=4119.661&lmt=1696327647687658&mt=1704636066&fvip=4&fexp=24007246&c=ANDROID_EMBEDDED_PLAYER&txp=5432434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cvprv%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAMeiWQ8Abmv3Fz-rfy2bfY0RS_95WrCow1cSTY0gjUzpAiABhyVgryaSKw5NTRO8izC9wnwhG5fOq2gDeaqpWYNHUw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AAO5W4owRgIhAKv58bI0rtBJQ7NZ8ilEMtRsmU0rG6_KY55x4eNQyB-KAiEA5K0e0X29QpJNq23BprQnalotcAHwucyGTbp6WGh5Fcw%3D'
    video_response = requests.get(url, stream=True)

    # Set the content type based on the video type
    content_type = video_response.headers.get('Content-Type', 'video/mp4')

    # Stream the content as a response
    response = StreamingHttpResponse(
        video_response.iter_content(chunk_size=1024 * 1024),
        content_type=content_type,
    )
    return response

