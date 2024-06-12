from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .captions import get_video_caption
from youtube_transcript_api import VideoUnavailable, NoTranscriptFound, TranscriptsDisabled, \
    TranslationLanguageNotAvailable, NotTranslatable, InvalidVideoId


@api_view(['GET'])
def get_video_caption_file(request, video_id):
    language = request.GET.get('lang', 'en')
    auto_translate_language = request.GET.get('translate', '')
    try:
        caption = get_video_caption(video_id, language, auto_translate_language)
        response = HttpResponse(caption, content_type="text/plain")
        response['Content-Disposition'] = f'attachment; filename="{video_id}.vtt"'
        return response
    except InvalidVideoId as e:
        return HttpResponse('Error: Invalid video id.', status=404)

    except VideoUnavailable as e:
        return HttpResponse('Error: The selected video is unavailable.', status=404)

    except NoTranscriptFound as e:
        return HttpResponse('Error: No transcripts were found for any of the requested language codes.', status=404)

    except TranscriptsDisabled as e:
        return HttpResponse('Error: Subtitles are disabled for this video.', status=404)

    except TranslationLanguageNotAvailable as e:
        return HttpResponse('Error: The requested translation language is not available.', status=404)

    except NotTranslatable as e:
        return HttpResponse('Error: The requested caption is not translatable.', status=404)

    except Exception as e:
        return HttpResponse('Connection Failed! Please try again later.', status=500)
