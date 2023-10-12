from pytube import YouTube

# Function to download a YouTube video by URL
def download_youtube_video(url, save_path='./'):
    try:
        # Create a YouTube object
        yt = YouTube(url)

        # Select the highest resolution stream (you can customize this)
        stream = yt.streams.get_highest_resolution()

        # Download the video to the specified path
        stream.download(output_path=save_path)

        print(f"Video downloaded successfully to {save_path}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

from pytube import YouTube

def download_specific_chunk(video_url, start_byte, end_byte, output_path):
    # Create a YouTube object
    yt = YouTube(video_url)

    # Get the highest resolution stream
    video_stream = yt.streams.get_highest_resolution()

    # Download the specific chunk
    video_stream.download(output_path=output_path, filename=f"{yt.title}_chunk",
                          start=start_byte, end=end_byte)

# Example usage
video_url = "https://www.youtube.com/watch?v=6dOwHzCHfgA"
start_byte = 0
end_byte = 3 * 1024 * 1024  # 3 MB
output_path = "/"

# download_specific_chunk(video_url, start_byte, end_byte, output_path)

yt = YouTube(video_url)

for stream in yt.streams :
    print(stream)


# Example usage
# if __name__ == "__main__":
#     video_url = "https://www.youtube.com/watch?v=pFptt7Cargc&ab_channel=tameimpalaVEVOy"
#     download_youtube_video(video_url, save_path='./')  # Change the save_path as needed
