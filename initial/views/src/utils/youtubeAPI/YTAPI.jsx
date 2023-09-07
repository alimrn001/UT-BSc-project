import axios from "axios";

const YT_API_KEY = "AIzaSyCYvQwzy8PB9dcLwjC9ohf3QFgXU_hnMvM";

export function isValidYouTubeUrl(url) {
  const youtubeUrlRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  return youtubeUrlRegex.test(url);
}

export async function videoExists(url) {
  const videoId = url.split("v=")[1];

  if (!videoId) {
    return false;
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YT_API_KEY}&part=snippet`
    );

    if (response.data.items.length > 0) {
      console.log("Video exists");
      return true;
    } else {
      console.log("Video does not exist");
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}

export function urlIsValid(url) {
  videoExists(url)
    .then((exists) => {
      console.log(exists + " is existence");
      // You can perform additional logic here based on the value of `exists`
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return isValidYouTubeUrl(url);
}
