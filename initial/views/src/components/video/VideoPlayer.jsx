import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VideoLoading from "../shared/loading/VideoLoading";
import videoSubtitles from "../../static/test.srt";

export default function VideoPlayer({ videoUrl, thumbnail, captions }) {
  const [url, setUrl] = useState(videoUrl);
  const [videoThumbnail, setVideoThumbnail] = useState(thumbnail);
  const [captionsData, setCaptionsData] = useState(captions);

  useEffect(() => {
    setUrl(videoUrl);
    setVideoThumbnail(thumbnail);
    setCaptionsData(captions);
  }, [videoUrl, thumbnail, captions]);

  const formattedCaptions = captionsData.map((caption) => ({
    text: caption.text,
    start: caption.start,
    end: caption.start + caption.duration,
  }));

  const config = {
    file: {
      tracks: formattedCaptions,
    },
  };

  return (
    <>
      {videoUrl === undefined && <VideoLoading />}
      {videoUrl !== undefined && (
        <ReactPlayer
          url={url} // Replace with your video URL
          controls // Display player controls (e.g., play, pause, volume)
          width="100%" // Set the player width
          height="100%" // Set the player height
          light={videoThumbnail}
          config={{
            file: {
              tracks: [
                {
                  kind: "subtitles",
                  src: videoSubtitles,
                  srcLang: "en",
                  default: true,
                },
              ],
            },
          }}
        />
      )}
    </>
  );
}
