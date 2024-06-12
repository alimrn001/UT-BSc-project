import axios from "axios";

export async function DownloadYTVideoSubtitle(videoId, language, subtitleUrl) {
  try {
    const response = await axios.get(subtitleUrl, {
      responseType: "blob",
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: "text/vtt" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${videoId}_${language}.vtt`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      throw new Error("Subtitle download failed");
    }
  } catch (error) {
    throw new Error("Subtitle download error:", error);
  }
}
