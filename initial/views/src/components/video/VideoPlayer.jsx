import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function VideoPlayer({ videoUrl }) {
  const [videoUrlS, setVideoUrlS] = useState(videoUrl);

  useEffect(() => {
    setVideoUrlS(videoUrl);
  }, [videoUrl]);

  return (
    <>
      <ReactPlayer
        url={videoUrlS} // Replace with your video URL
        controls // Display player controls (e.g., play, pause, volume)
        width="100%" // Set the player width
        height="100%" // Set the player height
      />
    </>
  );
}
