from youtube_transcript_api import YouTubeTranscriptApi

try:
    print(YouTubeTranscriptApi.list_transcripts('tujhGdn1EMI'))
    # Get the available transcript languages for the video using its URL or ID
    transcript_languages = YouTubeTranscriptApi.list_transcripts('tujhGdn1EMI')
    for tr in transcript_languages:
        print(tr.language_code)
    # print(transcript_languages.find_transcript(['en']).fetch())
    
    # captions = YouTubeTranscriptApi.get_transcript('tujhGdn1EMI')
    # print(captions)

    # Print the list of available transcript languages

except Exception as e:
    print(f"An error occurred: {str(e)}")
