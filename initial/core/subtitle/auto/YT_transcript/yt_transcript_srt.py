from youtube_transcript_api import YouTubeTranscriptApi

video_url = "https://www.youtube.com/watch?v=pFptt7Cargc&ab_channel=tameimpalaVEVO"

def format_time(time_in_seconds):
    total_milliseconds = int(time_in_seconds * 1000)
    milliseconds = total_milliseconds % 1000
    total_seconds = total_milliseconds // 1000
    seconds = total_seconds % 60
    total_minutes = total_seconds // 60
    minutes = total_minutes % 60
    hours = total_minutes // 60
    formatted_time = f"{hours:02}:{minutes:02}:{seconds:02},{milliseconds:03}"
    return formatted_time

try:
    # Extract the video ID from the URL
    video_id = video_url.split("v=")[1]

    # Fetch the transcript for the video
    transcript = YouTubeTranscriptApi.get_transcript(video_id)

    # Create an SRT file with the transcript
    srt_file_name = f"./{video_id}.srt"
    with open(srt_file_name, "w", encoding="utf-8") as srt_file:
        counter = 1
        for entry in transcript:
            start_time = entry["start"]
            end_time = entry["start"] + entry["duration"]
            text = entry["text"]
            srt_file.write(f"{counter}\n")
            # srt_file.write(f"{start_time:.3f} --> {end_time:.3f}\n")
            srt_file.write(f"{format_time(start_time)} --> {format_time(end_time)}\n")
            srt_file.write(f"{text}\n\n")
            counter += 1

    print(f"Subtitles saved as {srt_file_name}")

except Exception as e:
    print(f"An error occurred: {str(e)}")