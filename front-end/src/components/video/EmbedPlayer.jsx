import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Error from "../shared/errors/Error";
import PageLoading from "../shared/loading/PageLoading";
import VideoPlayer from "./VideoPlayer";
import {
  Button,
  Col,
  Image,
  Row,
  Stack,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import {
  BsEye,
  BsHandThumbsUp,
  BsCcSquare,
  BsCalendarDate,
  BsClock,
} from "react-icons/bs";
import {
  YTUrlIsValid,
  getYtVideoUrlById,
  retrieveCaptionsData,
} from "../../utils/youtubeAPI/YTAPI";
import {
  getYTVideoThumbnail,
  getVideoAllStreamingFormats,
  getVideoDefaultStreamData,
} from "../../utils/serverAPI/serverAPI";
import {
  getVideoData,
  getInvidiousCurrentInstance,
  getYouTubeVideoUrlById,
} from "../../utils/invidiousAPI/INVAPI";
import { DownloadYTVideoSubtitle } from "../../utils/download/Download";
import { convertSecondsToDurationLength } from "../../utils/dateTime/DateTimeConverter";
import ExperimentalViewModal from "../modal/ExperimentalViewModal";
import ExpVideoPlayer from "./ExpVideoPlayer";
import CaptionDownloadFailedToast from "../toast/CaptionDownloadFailedToast";
import { scrollToTop } from "../../utils/window/WindowUtils";

export default function EmbedPlayer({ exp }) {
  const location = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const showVideoTitle = queryParams.get("showTitle");
  const showMainPageUrl = queryParams.get("showSrc");
  const showYTUrl = queryParams.get("showYTUrl");
  //   const videoTitleIsVisible = parseInt(showVideoTitle, 10) === 1;

  const [videoData, setVideoData] = useState({});

  const [videoStreamData, setVideoStreamData] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const [urlIsValid, setUrlIsValid] = useState(false);

  const getVideoStreamData = async () => {
    try {
      console.log("here before getting stream data");
      const streamData = await getVideoDefaultStreamData(id);
      console.log("this is streamData");
      console.log(streamData);
      setVideoStreamData(streamData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const getVideoInvData = async () => {
    try {
      const videoInvData = await getVideoData(id);
      setVideoData(videoInvData);
      console.log("inv data");
      console.log(videoInvData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await YTUrlIsValid(getYtVideoUrlById(id));
      console.log("show title id : " + showVideoTitle);
      console.log("id is: " + id);
      setUrlIsValid(result);
      if (result) {
        getVideoStreamData();
        await getVideoInvData();
      }
      console.log("this is video data");
      console.log(videoData);
      setIsLoading(false);
    })();
  }, [showVideoTitle, showMainPageUrl, showYTUrl]);

  return (
    <>
      {!isLoading && urlIsValid && (
        <div className="">
          <div className="d-flex justify-content-center ">
            {!exp && (
              <div className="yt-video w-100" controls>
                <VideoPlayer
                  // videoUrl="/video/"
                  videoUrl={videoStreamData.url}
                  // thumbnail={videoThumbnail}
                  thumbnail={videoData.videoThumbnails[0].url}
                  videoId={id}
                />
              </div>
            )}
            {/* {exp && (
              <div className="yt-video w-100" controls>
                <ExpVideoPlayer thumbnail={videoThumbnail} videoId={id} />
              </div>
            )} */}
          </div>
          <div>
            {showVideoTitle === "1" && (
              <div className="ltr text-1 mt-1">
                <h1>{videoData.title}</h1>
              </div>
            )}
            <div
              className={`d-flex justify-content-between align-items-center mt-1 ${
                showMainPageUrl === "1" || showYTUrl === "1" ? "p-3" : ""
              }`}
            >
              {showMainPageUrl === "1" && (
                <Link
                  to={`http://localhost:3000/watch/${id}`}
                  target="_blank"
                  className="url-purple fs-5"
                >
                  مشاهده در YTUT
                </Link>
              )}
              {showYTUrl === "1" && (
                <Link
                  to={getYouTubeVideoUrlById(id)}
                  target="_blank"
                  className="url-green fs-5"
                >
                  مشاهده در YouTube
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      {!isLoading && !urlIsValid && <Error code={404} />}
      {isLoading && <PageLoading />}
    </>
  );
}
