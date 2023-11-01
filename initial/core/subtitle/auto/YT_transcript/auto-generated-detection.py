from youtube_transcript_api import YouTubeTranscriptApi

try:
    # Get the available transcript languages for the video using its URL or ID
    transcript_languages = YouTubeTranscriptApi.list_transcripts('tujhGdn1EMI')
    print(transcript_languages.find_transcript(['en']).fetch())
    
    # captions = YouTubeTranscriptApi.get_transcript('tujhGdn1EMI')
    # print(captions)

    # Print the list of available transcript languages

except Exception as e:
    print(f"An error occurred: {str(e)}")
