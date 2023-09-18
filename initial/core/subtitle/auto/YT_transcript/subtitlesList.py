from youtube_transcript_api import YouTubeTranscriptApi

# Specify the video URL or video ID
video_url = 'https://youtu.be/74ijsBhbxSQ'
# Replace 'VIDEO_ID' with the actual video ID or URL

try:
    # Get the available transcript languages for the video using its URL or ID
    transcript_languages = YouTubeTranscriptApi.list_transcripts('74ijsBhbxSQ')
    print(transcript_languages)

    # Print the list of available transcript languages
    for transcript in transcript_languages:
        print(transcript.language_code)

except Exception as e:
    print(f"An error occurred: {str(e)}")
