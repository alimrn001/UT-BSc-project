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

# Example usage
if __name__ == "__main__":
    video_url = "https://www.youtube.com/watch?v=pFptt7Cargc&ab_channel=tameimpalaVEVOy"
    download_youtube_video(video_url, save_path='./')  # Change the save_path as needed
