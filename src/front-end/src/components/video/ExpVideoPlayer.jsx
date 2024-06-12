import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import VideoLoading from "../shared/loading/VideoLoading";
import videoSubtitles from "../../static/test.vtt";
import { getYTVideoCaptions } from "../../utils/serverAPI/serverAPI";
import axios from "axios";

export default function ExpVideoPlayer({ thumbnail, videoId }) {
  const [videoThumbnail, setVideoThumbnail] = useState(thumbnail);
  const [captionsVTTData, setCaptionsVTTData] = useState();
  const [videoChunks, setVideoChunks] = useState([]);
  const [playing, setPlaying] = useState(true);

  const getCaptionsVTTData = async () => {
    const response = await getYTVideoCaptions(videoId);
    setCaptionsVTTData(response);
  };

  useEffect(() => {
    const fetchVideoChunks = async () => {
      try {
        const response = await axios.get(`/api/v1/stream/${videoId}`, {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/octet-stream",
          },
        });
        console.log("chunks");
        console.log(response.data);
        setVideoChunks(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    console.log("here");
    fetchVideoChunks();
  }, [videoId]);

  return (
    <>
      <video url={videoChunks} controls width="100%" height="100%">
        <track
          src={`/api/v1/captions/${videoId}`}
          kind="subtitles"
          srcLang="en"
          label="English"
          default
        />
      </video>
    </>
  );
}
