import axios from "axios";

const YT_API_KEY = "AIzaSyCYvQwzy8PB9dcLwjC9ohf3QFgXU_hnMvM";
export async function videoExists(url) {
  const videoId = url.split("v=")[1];

  if (!videoId) {
    return false;
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YT_API_KEY}&part=snippet`
    );

    return response.data.items.length > 0;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export async function YTUrlIsValid(url) {
  try {
    const exists = await videoExists(url);
    return exists;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export async function retrieveVideoData(url) {
  const videoId = url.split("v=")[1];
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${YT_API_KEY}&part=snippet,localizations&id=${videoId}`
    );

    if (response.data.items.length > 0) {
      const videoInfo = response.data.items[0];
      const snippet = videoInfo.snippet;
      const localizations = videoInfo.localizations || {};

      // Video Title
      const title = snippet.title;

      // Video Description
      const description = snippet.description;

      // Thumbnail URLs (different sizes)
      const thumbnails = snippet.thumbnails;

      // Available Subtitles
      const subtitles = Object.keys(localizations);

      return {
        videoInfo,
        subtitles,
      };
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error while fetching video data");
  }
}
