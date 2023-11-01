from django.http import JsonResponse, HttpResponse
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import Formatter
from youtube_transcript_api.formatters import JSONFormatter
from youtube_transcript_api.formatters import TextFormatter
from youtube_transcript_api.formatters import WebVTTFormatter
from youtube_transcript_api.formatters import SRTFormatter
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_captions(request, video_id):
    try:
        # captions = YouTubeTranscriptApi.get_transcript(video_id)
        captions = YouTubeTranscriptApi.list_transcripts(video_id).find_transcript(['en']).fetch()
        formatter = WebVTTFormatter()
        vtt_content = formatter.format_transcript(captions)

        response = HttpResponse(vtt_content, content_type="text/plain")
        response['Content-Disposition'] = f'attachment; filename="{video_id}.vtt"'

        return response
    except Exception as e:
        return JsonResponse({'error': str(e)})

