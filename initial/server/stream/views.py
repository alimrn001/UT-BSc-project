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


def tunnel_video_data(request):
    url = 'https://rr4---sn-4g5e6ns6.googlevideo.com/videoplayback?expire=1703688489&ei=yeSLZescy5L_0Q_lw6HwCQ&ip=2001%3A19f0%3A0%3A4c63%3Ae534%3Acdb1%3Adff8%3A36db&id=o-AH9Rr2rpCIoF51gbQBcdnynNgIbkq6XVIA_t-_5nmpJO&itag=22&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&spc=UWF9f61Iw6zKdqXkhzVB97pD3K04fVc&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=4695.283&lmt=1552331791878344&fexp=24007246&c=ANDROID&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAKiVEFF0ShrmHdGsj7G2pnkGu0ao1fM4dfCAqBM1R5wrAiEA_18QVjSTfUuceshSO0IBEwWV3sW_JSesvZGdHv6aTqI%3D&host=rr3---sn-ab5sznzd.googlevideo.com&rm=sn-ab5el77s,sn-25gks7s&req_id=590d8b66ee42a3ee&ipbypass=yes&redirect_counter=2&cms_redirect=yes&cmsv=e&mh=Mr&mip=45.76.47.164&mm=34&mn=sn-4g5e6ns6&ms=ltu&mt=1703667876&mv=m&mvi=4&pl=23&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AAO5W4owRgIhAKLDdUJR4MtacWEG-KXjWhFl0vnXgoqQ1ngAIFgDVoTiAiEA243pi6zulkA-tkzmxguokDfsvnGA-sDulM_AcSKhQI0%3D'
    video_response = requests.get(url, stream=True)

    # Set the content type based on the video type
    content_type = video_response.headers.get('Content-Type', 'video/mp4')

    # Stream the content as a response
    response = StreamingHttpResponse(
        video_response.iter_content(chunk_size=1024),
        content_type=content_type,
    )
    return response

