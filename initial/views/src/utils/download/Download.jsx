import axios from "axios";

export async function DownloadYTVideoSubtitle(videoId, language) {
  console.log(language);
  axios
    .get(`../../api/v1/captions/${videoId}?lang=${language}`, {
      responseType: "blob",
    })
    .then((response) => {
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "text/vtt" });

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a download link and trigger a click event to download the file
        const a = document.createElement("a");
        a.href = url;
        a.download = `${videoId}_${language}.vtt`;
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error("Subtitle download failed");
      }
    })
    .catch((error) => {
      throw new Error("Subtitle download error:", error);
    });
}
