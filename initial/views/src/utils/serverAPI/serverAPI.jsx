import axios from "axios";

export async function fetchYTVideo(videoUrl) {
  try {
    const response = await axios.get("http://localhost:8000/video/video", {
      responseType: "blob", // Ensure response is treated as a blob
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "video/mp4" });
      return { blob };
    } else {
      console.error("Failed to fetch video:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching video:", error);
  }
}

export async function getYTVideoThumbnail(videoId) {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/thumbnail/${videoData.videoInfo.id}/`,
      {
        responseType: "arraybuffer",
      }
    );
    if (response.status === 200) {
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return base64;
    } else {
      console.error("Failed to fetch video:", response.statusText);
    }
  } catch (error) {
    console.error("Error getting video thumbnail!:", error);
  }
}
