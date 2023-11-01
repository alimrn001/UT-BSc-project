from django.http import JsonResponse
from youtube_transcript_api import YouTubeTranscriptApi
from rest_framework.decorators import api_view


@api_view(['GET'])
def get_captions(request, video_id):
    try:
        # captions = YouTubeTranscriptApi.get_transcript(video_id)
        captions = YouTubeTranscriptApi.list_transcripts(video_id).find_transcript(['en']).fetch()
        return JsonResponse({'captions': captions})
    except Exception as e:
        return JsonResponse({'error': str(e)})

