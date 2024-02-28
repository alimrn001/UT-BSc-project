from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api.formatters import WebVTTFormatter


def format_caption_to_vtt(caption):
    formatter = WebVTTFormatter()
    return formatter.format_transcript(caption)


def get_video_caption(video_id, language, auto_translate_language):
    caption_data = YouTubeTranscriptApi.list_transcripts(video_id).find_transcript([language])
    if auto_translate_language is '':
        captions = caption_data.fetch()
        return format_caption_to_vtt(captions)
    else:
        captions = caption_data.translate(auto_translate_language).fetch()
        return format_caption_to_vtt(captions)


