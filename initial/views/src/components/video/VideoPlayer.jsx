import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VideoLoading from "../shared/loading/VideoLoading";

export default function VideoPlayer({ videoUrl, thumbnail }) {
  const [url, setUrl] = useState(videoUrl);
  const [videoThumbnail, setVideoThumbnail] = useState(thumbnail);

  useEffect(() => {
    setUrl(videoUrl);
    setVideoThumbnail(thumbnail);
  }, [videoUrl, thumbnail]);

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
        />
      )}
    </>
  );
}
