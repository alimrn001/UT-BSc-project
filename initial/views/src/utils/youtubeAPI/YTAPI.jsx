import axios from "axios";

const YT_API_KEY = "AIzaSyCYvQwzy8PB9dcLwjC9ohf3QFgXU_hnMvM";

export function extractVideoIdFromUrl(url) {
  // Extract the video ID using a regular expression
  const match = url.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : url.split("v=")[1];
}

export function getYtVideoUrlById(id) {
  return `https://youtu.be/${id}`;
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

export async function retrieveVideoData(videoId) {
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

export async function retrieveChannelData(channelId) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels`,
      {
        params: {
          key: YT_API_KEY,
          id: channelId,
          part: "snippet,contentDetails,statistics",
        },
      }
    );

    if (response.data.items.length > 0) {
      const channelInfo = response.data.items[0];
      return {
        channelInfo,
      };
    } else {
      throw new Error("Video not found");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error while fetching channel data");
  }
}

export async function retrieveCaptionsData(videoId) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${YT_API_KEY}`
    );
    const captionsInfo = response.data.items;
    // console.log("captions : ");
    // console.log(response.data.items);
    return {
      captionsInfo,
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function retrieveVideoQualities(videoId) {
  // must be get from server and pytube!!
}
