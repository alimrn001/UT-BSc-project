import axios from "axios";

// const serverAddress = "http://localhost:8000";
const serverAddress = "";

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
    throw new Error("Error fetching video:", error);
  }
}

export async function getYTVideoThumbnail(videoId) {
  try {
    const response = await axios.get(
      `${serverAddress}/api/v1/thumbnail/${videoId}/`,
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
      console.error("Failed to fetch video thumbnail:", response.statusText);
    }
  } catch (error) {
    throw new Error("Error getting video thumbnail!");
  }
}

export async function getYTVideoCaptions(videoId) {
  try {
    const response = await axios.get(
      `${serverAddress}/api/v1/captions/${videoId}/`
    );
    if (response.status === 200) {
      const data = response.data;
      return data;
    } else {
      console.error("Failed to fetch video captions:", response.statusText);
    }
  } catch (error) {
    throw new Error("Error getting video captions!");
  }
}

export async function getVideoDefaultStreamData(videoId) {
  try {
    const response = await axios.get(
      `${serverAddress}/api/v1/stream/${videoId}/`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error in getting video stream data");
    }
  } catch (error) {
    throw new Error("Error in getting video stream data:", error);
  }
}

export async function getVideoAllStreamingFormats(videoId) {
  try {
    const response = await axios.get(
      `${serverAddress}/api/v1/stream/${videoId}?type=all`
    );
    console.log("this is response");
    console.log(response);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error in getting video stream data");
    }
  } catch (error) {
    throw new Error("Error in getting video stream data:", error);
  }
}
