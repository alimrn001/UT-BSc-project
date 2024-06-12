from pytube import YouTube
import requests
from django.http import StreamingHttpResponse


def get_video_stream_formats(video_id):
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
    return formats


def get_video_default_stream_data(video_id):
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
    return format_data
