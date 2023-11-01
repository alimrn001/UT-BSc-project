import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VideoLoading from "../shared/loading/VideoLoading";
import videoSubtitles from "../../static/test.vtt";
import { getYTVideoCaptions } from "../../utils/serverAPI/serverAPI";

export default function VideoPlayer({ videoUrl, thumbnail, videoId }) {
  const [url, setUrl] = useState(videoUrl);
  const [videoThumbnail, setVideoThumbnail] = useState(thumbnail);
  const [captionsVTTData, setCaptionsVTTData] = useState();

  const getCaptionsVTTData = async () => {
    const response = await getYTVideoCaptions(videoId);
    setCaptionsVTTData(response);
  };

  useEffect(() => {
    setUrl(videoUrl);
    setVideoThumbnail(thumbnail);
    getCaptionsVTTData();
  }, [videoUrl, thumbnail]);

  // const formattedCaptions = captionsData.map((caption) => ({
  //   text: caption.text,
  //   start: caption.start,
  //   end: caption.start + caption.duration,
  // }));

  // const config = {
  //   file: {
  //     tracks: formattedCaptions,
  //   },
  // };

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
              attributes: {
                // crossOrigin: "use-credentials",
              },
              tracks: [
                {
                  kind: "subtitles",
                  src: `/api/v1/captions/${videoId}`,
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
