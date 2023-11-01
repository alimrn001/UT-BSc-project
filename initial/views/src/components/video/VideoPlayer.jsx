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
    // getCaptionsVTTData();
  }, [videoUrl, thumbnail]);

  return (
    <>
      {videoUrl === undefined && <VideoLoading />}
      {videoUrl !== undefined && (
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          light={videoThumbnail}
          config={{
            file: {
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
