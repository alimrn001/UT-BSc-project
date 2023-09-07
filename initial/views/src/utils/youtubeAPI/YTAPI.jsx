import axios from "axios";

const YT_API_KEY = "AIzaSyCYvQwzy8PB9dcLwjC9ohf3QFgXU_hnMvM";

function extractVideoIdFromUrl(url) {
  // Extract the video ID using a regular expression
  const match = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

export async function videoExists(url) {
  let videoId = url.split("v=")[1];
  if (videoId === undefined) {
    videoId = extractVideoIdFromUrl(url);
  }
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
  let videoId = url.split("v=")[1];
  if (videoId === undefined) {
    videoId = extractVideoIdFromUrl(url);
  }
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?key=${YT_API_KEY}&part=snippet,localizations,contentDetails,statistics&id=${videoId}`
    );

    if (response.data.items.length > 0) {
      const videoInfo = response.data.items[0];
      const localizations = videoInfo.localizations || {};
      const contentDetails = videoInfo.contentDetails || {};
      const statistics = videoInfo.statistics || {};

      // Available Subtitles
      const subtitles = Object.keys(localizations);

      return {
        videoInfo,
        subtitles,
        contentDetails,
        statistics,
      };
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error while fetching video data");
  }
}
