import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import NoSubtitleToGetModal from "../modal/NoSubtitleToGetModal";
import Error from "../shared/errors/Error";
import PageLoading from "../shared/loading/PageLoading";
import DownloadSubtitleModal from "../modal/DownloadSubtitleModal";
import DownloadFailedToast from "../toast/DownloadFailedToast";
import DownloadSubtitleCanvasMobile from "../canvas/DownloadSubtitleCanvasMobile";
import DownloadVideoModal from "../modal/DownloadVideoModal";
import DownloadVideoCanvasMobile from "../canvas/DownloadVideoCanvasMobile";
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
  retrieveVideoData,
  getYtVideoUrlById,
  retrieveChannelData,
  retrieveCaptionsData,
  downloadSubtitle,
} from "../../utils/youtubeAPI/YTAPI";
import {
  getYTVideoDownloadFormats,
  getYTVideoStreamData,
  getYTVideoThumbnail,
  getYTVideoCaptions,
} from "../../utils/serverAPI/serverAPI";
import { DownloadYTVideoSubtitle } from "../../utils/download/Download";
import { getShortenedNumber } from "../../utils/string/StringUtils";
import { convertYouTubeDurationToMinutes } from "../../utils/dateTime/DateTimeConverter";

export default function Video({ embed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [showNoSubtitleModal, setShowNoSubtitleModal] = useState(false);

  const [showDownloadSubtitleModal, setShowDownloadSubtitleModal] = useState(
    false
  );

  const [
    showDownloadSubtitleCanvasMobile,
    setShowDownloadSubtitleCanvasMobile,
  ] = useState(false);

  const [showDownloadVideoModal, setShowDownloadVideoModal] = useState(false);

  const [
    showDownloadVideoCanvasMobile,
    setShowDownloadVideoCanvasMobile,
  ] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [
    videoDownloadOptionsIsLoading,
    setVideoDownloadOptionsIsLoading,
  ] = useState(false); //can be set to 'false' or 'undefined'

  const [urlIsValid, setUrlIsValid] = useState(false);

  const [videoData, setVideoData] = useState({});

  const [videoStreamData, setVideoStreamData] = useState({});

  const [captionsData, setCaptionsData] = useState([]);

  const [videoDownloadOptions, setVideoDownloadOptions] = useState([]);

  const [downloadFailed, SetDownloadFailed] = useState(false);

  const [channelData, setChannelData] = useState({});

  const [videoThumbnail, setVideoThumbnail] = useState(null);

  const renderEmbedVPNTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      نیاز دارد VPN به
    </Tooltip>
  );

  const handleSubtitleDownloadRequest = (screen) => {
    if (captionsData.length === 0) setShowNoSubtitleModal(true);
    else {
      if (screen === "desktop") setShowDownloadSubtitleModal(true);
      if (screen === "mobile") setShowDownloadSubtitleCanvasMobile(true);
    }
  };

  const initializeSubtitleDownload = (subtitleInfo) => {
    if (subtitleInfo !== 0) {
      try {
        DownloadYTVideoSubtitle(id, subtitleInfo.languageCode);
      } catch (error) {
        SetDownloadFailed(true);
      }
    }
  };

  const initializeVideoDownload = async (videoInfo) => {
    const a = document.createElement("a");
    a.download = "file.mp4";
    a.href = videoInfo.url;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // try {
    //   const response = await axios.get(videoInfo.url, { responseType: "blob" });
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = `${videoData.videoInfo.snippet.title}_${
    //     videoInfo.type === "video" ? videoInfo.resolution : videoInfo.audio_abr
    //   }.${videoInfo.extension.split("/")[1]}`; // You can set the downloaded file name here
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    //   window.URL.revokeObjectURL(url);
    // } catch (error) {
    //   SetDownloadFailed(true);
    //   console.error("Error downloading the video:", error);
    // }
  };

  const getVideoStreamData = async () => {
    try {
      const streamData = await getYTVideoStreamData(id);
      console.log("this is streamData");
      console.log(streamData);
      setVideoStreamData(streamData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const getChannelData = async (channelId) => {
    try {
      const response = await retrieveChannelData(channelId);
      setChannelData(response);
      console.log("this is channel data");
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getVideoData = async () => {
    try {
      const videoData = await retrieveVideoData(id);
      console.log(videoData);
      setVideoData(videoData);
      if (videoData.videoInfo.snippet.channelId) {
        await getChannelData(videoData.videoInfo.snippet.channelId);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  const getVideoCaptions = async () => {
    try {
      const captionsInfo = await retrieveCaptionsData(id);
      setCaptionsData(captionsInfo.captionsInfo);
    } catch (error) {
      console.log("error:", error);
    } finally {
    }
  };

  const getVideoDownloadOptions = async (screen) => {
    try {
      setVideoDownloadOptionsIsLoading(true);
      if (videoDownloadOptions.length === 0) {
        const downloadOptions = await getYTVideoDownloadFormats(id); // you can chack if it's already been get before so you dont load it again !
        setVideoDownloadOptions(downloadOptions);
        console.log(downloadOptions);
      }
      if (screen === "desktop") setShowDownloadVideoModal(true);
      if (screen === "mobile") setShowDownloadVideoCanvasMobile(true);
    } catch (error) {
      SetDownloadFailed(true);
      console.log("an error occured");
    } finally {
      setVideoDownloadOptionsIsLoading(false);
    }
  };

  const getVideoThumbnail = async () => {
    try {
      const response = await getYTVideoThumbnail(id);
      setVideoThumbnail(`data:;base64,${response}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await YTUrlIsValid(getYtVideoUrlById(id));
      setUrlIsValid(result);
      if (result) {
        getVideoStreamData();
        await getVideoThumbnail();
        await getVideoData();
        await getVideoCaptions();
      }
      console.log(captionsData);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {!isLoading && urlIsValid && (
        <div className="main-body">
          <div className="video-container mb-5">
            <div className="d-flex justify-content-center mt-3">
              {!embed && (
                // <video className="yt-video w-100" controls>
                //   <source src={videoStreamData.url} />
                //   Your browser does not support the video tag.
                // </video>
                <div className="yt-video w-100" controls>
                  <VideoPlayer
                    videoUrl={videoStreamData.url}
                    thumbnail={videoThumbnail}
                    videoId={id}
                  />
                </div>
              )}
              {embed && (
                <div className="yt-video w-100">
                  <iframe
                    // width="560"
                    // height="315"
                    src="https://www.youtube.com/embed/6dOwHzCHfgA?si=gYPjE8PfJv8PO5s-"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                  <p className="caption mt-5 fs-3">salam</p>
                </div>
              )}
              {/* {videoBlob && (
                <video controls src={URL.createObjectURL(videoBlob)}></video>
              )} */}
            </div>
            <div>
              <div className="ltr text-1 mt-1">
                <h1>{videoData.videoInfo.snippet.title}</h1>
              </div>
              <div dir="ltr">
                <Row>
                  <Col
                    xxl={{ span: 2, order: 0 }}
                    xl={{ span: 3, order: 0 }}
                    lg={{ span: 3, order: 0 }}
                    md={{ span: 6, order: 1 }}
                    sm={{ span: 12 }}
                    className="order-1 mt-3"
                  >
                    <Stack>
                      <div className="d-flex align-items-center flex-wrap">
                        <BsEye style={{ height: 20, width: 20 }} />
                        <span className="video-info-item ps-3">
                          {parseInt(
                            videoData.statistics.viewCount
                          ).toLocaleString("en-US")}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mt-3 flex-wrap">
                        <BsHandThumbsUp style={{ height: 20, width: 20 }} />
                        <span className="video-info-item ps-3">
                          {parseInt(
                            videoData.statistics.likeCount
                          ).toLocaleString("en-US")}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mt-3 flex-wrap">
                        <BsCalendarDate style={{ height: 20, width: 20 }} />
                        <span className="video-info-item ps-3">
                          {new Date(
                            videoData.videoInfo.snippet.publishedAt
                          ).toDateString()}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mt-3 flex-wrap">
                        <BsClock style={{ height: 20, width: 20 }} />
                        <span className="video-info-item ps-3">
                          {convertYouTubeDurationToMinutes(
                            videoData.videoInfo.contentDetails.duration
                          ).toFixed(0)}{" "}
                          min
                        </span>
                      </div>

                      <div className="d-flex align-items-center mt-3 flex-wrap">
                        <BsCcSquare style={{ height: 20, width: 20 }} />
                        {captionsData.map((caption, idx) => (
                          <span
                            className={`video-info-item ${
                              idx === 0 ? "ps-3" : "ps-2"
                            }`}
                          >
                            {caption.snippet.language}
                            {idx !== captionsData.length - 1 && ","}
                          </span>
                        ))}
                        {!captionsData.length && (
                          <span className="video-info-item ps-3">
                            فاقد زیرنویس
                          </span>
                        )}
                      </div>
                    </Stack>
                  </Col>

                  <Col
                    xxl={{ span: 8, order: 1 }}
                    xl={{ span: 6, order: 1 }}
                    lg={{ span: 6, order: 1 }}
                    md={{ span: 12, order: 0 }}
                    sm={{ span: 12 }}
                    className="order-0 mt-3"
                  >
                    <div className="d-flex align-items-center">
                      <Image
                        src={
                          channelData.channelInfo.snippet.thumbnails.default.url
                        }
                        height={50}
                        roundedCircle
                      />
                      <h4 className="ps-3 mb-0">
                        {videoData.videoInfo.snippet.channelTitle}
                      </h4>
                      {!channelData.channelInfo.statistics
                        .hiddenSubscriberCount && (
                        <h5 className="ps-2 mb-0">
                          (
                          {getShortenedNumber(
                            channelData.channelInfo.statistics.subscriberCount
                          )}
                          )
                        </h5>
                      )}
                    </div>

                    <h4 className="mt-2">Description: </h4>
                    <div
                      className="mt-3"
                      style={{ wordBreak: "break-all" }}
                      dangerouslySetInnerHTML={{
                        __html: videoData.videoInfo.snippet.description.replace(
                          /\n/g,
                          "<br />"
                        ),
                      }}
                    />
                  </Col>

                  <Col
                    dir="rtl"
                    xxl={{ span: 2, order: 2 }}
                    xl={{ span: 3, order: 2 }}
                    lg={{ span: 3, order: 2 }}
                    md={{ span: 6, order: 2 }}
                    sm={{ span: 12 }}
                    className="order-2 mt-3"
                  >
                    <Stack>
                      <div className="">
                        <Link
                          to={getYtVideoUrlById(id)}
                          target="_blank"
                          className="url-purple fs-5"
                        >
                          مشاهده در YouTube
                        </Link>
                      </div>

                      <div className="mt-4">
                        {!embed && (
                          <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderEmbedVPNTooltip}
                          >
                            <Link
                              to={`/embed/${id}`}
                              className="url-purple fs-5"
                            >
                              نمایش به صورت Embed
                            </Link>
                          </OverlayTrigger>
                        )}
                        {embed && (
                          <Link to={`/watch/${id}`} className="url-purple fs-5">
                            نمایش به صورت Video
                          </Link>
                        )}
                      </div>

                      <div className="fs-5 mt-4">
                        <Button
                          className="btn-purple btn-no-bs w-100 d-none d-sm-block"
                          onClick={() =>
                            handleSubtitleDownloadRequest("desktop")
                          }
                        >
                          دانلود زیرنویس
                        </Button>

                        <Button
                          className="btn-purple btn-no-bs w-100 d-block d-sm-none"
                          onClick={() =>
                            handleSubtitleDownloadRequest("mobile")
                          }
                        >
                          دانلود زیرنویس
                        </Button>
                      </div>

                      <div className="mt-4">
                        <Button
                          className="btn-pink btn-no-bs w-100 d-none d-sm-block"
                          onClick={() => getVideoDownloadOptions("desktop")}
                        >
                          {videoDownloadOptionsIsLoading === true && (
                            <div className="d-flex align-items-center justify-content-center">
                              <Spinner animation="border" />
                            </div>
                          )}
                          {!videoDownloadOptionsIsLoading && "دانلود ویدیو"}
                        </Button>

                        <Button
                          className="btn-pink btn-no-bs w-100 d-block d-sm-none"
                          onClick={() => getVideoDownloadOptions("mobile")}
                        >
                          {videoDownloadOptionsIsLoading === true && (
                            <div className="d-flex align-items-center justify-content-center">
                              <Spinner animation="border" />
                            </div>
                          )}
                          {!videoDownloadOptionsIsLoading && "دانلود ویدیو"}
                        </Button>
                      </div>
                    </Stack>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          {
            <NoSubtitleToGetModal
              onShow={setShowNoSubtitleModal}
              showP={showNoSubtitleModal}
            />
          }
          {
            <DownloadSubtitleModal
              onShow={setShowDownloadSubtitleModal}
              showP={showDownloadSubtitleModal}
              captionsData={captionsData}
              onDownloadRequest={initializeSubtitleDownload}
            />
          }
          {
            <DownloadSubtitleCanvasMobile
              onShow={setShowDownloadSubtitleCanvasMobile}
              showC={showDownloadSubtitleCanvasMobile}
              captionsData={captionsData}
              onDownloadRequest={initializeSubtitleDownload}
            />
          }
          {
            <DownloadVideoModal
              onShow={setShowDownloadVideoModal}
              showP={showDownloadVideoModal}
              optionsData={videoDownloadOptions}
              onDownloadRequest={initializeVideoDownload}
            />
          }
          {
            <DownloadVideoCanvasMobile
              onShow={setShowDownloadVideoCanvasMobile}
              showC={showDownloadVideoCanvasMobile}
              optionsData={videoDownloadOptions}
              onDownloadRequest={initializeVideoDownload}
            />
          }
          {
            <div className="download-failed-toast-container">
              <DownloadFailedToast
                onShow={SetDownloadFailed}
                showT={downloadFailed}
              />
            </div>
          }
        </div>
      )}

      {!isLoading && !urlIsValid && <Error code={404} />}
      {isLoading && <PageLoading />}
    </>
  );
}
