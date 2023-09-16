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
