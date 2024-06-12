import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import NoSubtitleToGetModal from "../modal/NoSubtitleToGetModal";
import Error from "../shared/errors/Error";
import PageLoading from "../shared/loading/PageLoading";
import DownloadSubtitleModal from "../modal/DownloadSubtitleModal";
import ConnectionFailedToast from "../toast/ConnectionFailedToast";
import DownloadSubtitleCanvasMobile from "../canvas/DownloadSubtitleCanvasMobile";
import DownloadVideoModal from "../modal/DownloadVideoModal";
import DownloadVideoCanvasMobile from "../canvas/DownloadVideoCanvasMobile";
import VideoPlayer from "./VideoPlayer";
import VideoLoading from "../shared/loading/VideoLoading";
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
import { YTUrlIsValid } from "../../utils/youtubeAPI/YTAPI";
import {
  getYTVideoThumbnail,
  getVideoAllStreamingFormats,
  getVideoDefaultStreamData,
} from "../../utils/serverAPI/serverAPI";
import {
  getVideoData,
  getInvidiousCurrentInstance,
  getYouTubeVideoUrlById,
  youTubeVideoExists,
} from "../../utils/invidiousAPI/INVAPI";
import { DownloadYTVideoSubtitle } from "../../utils/download/Download";
import { convertSecondsToDurationLength } from "../../utils/dateTime/DateTimeConverter";
import ExperimentalViewModal from "../modal/ExperimentalViewModal";
import ExpVideoPlayer from "./ExpVideoPlayer";
import CaptionDownloadFailedToast from "../toast/CaptionDownloadFailedToast";
import { scrollToTop } from "../../utils/window/WindowUtils";
import ShareVideoEmbedModal from "../modal/ShareVideoEmbedModal";

export default function Video({ exp }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const videoDescriptionLinesToDisplay = 5;

  const [showNoSubtitleModal, setShowNoSubtitleModal] = useState(false);

  const [showDownloadSubtitleModal, setShowDownloadSubtitleModal] = useState(
    false
  );

  const [
    showDownloadSubtitleCanvasMobile,
    setShowDownloadSubtitleCanvasMobile,
  ] = useState(false);

  const [showDownloadVideoModal, setShowDownloadVideoModal] = useState(false);

  const [showExpViewModal, setShowExpViewModal] = useState(false);

  const [showEmbedShareModal, setShowEmbedShareModal] = useState(false);

  const [
    showDownloadVideoCanvasMobile,
    setShowDownloadVideoCanvasMobile,
  ] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [
    videoDownloadOptionsIsLoading,
    setVideoDownloadOptionsIsLoading,
  ] = useState(false);

  const [urlIsValid, setUrlIsValid] = useState(false);

  const [videoData, setVideoData] = useState({});

  const [videoStreamData, setVideoStreamData] = useState({});

  const [videoDownloadOptions, setVideoDownloadOptions] = useState([]);

  const [connectionFailed, setConnectionFailed] = useState(false);

  const [serverCCdownloadFailed, setServerCCdownloadFailed] = useState(false);

  const [videoThumbnail, setVideoThumbnail] = useState(null);

  const [descriptionCollpased, setDescriptionCollpased] = useState(true);

  const [videoPlayingFailed, setVideoPlayingFailed] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const renderEmbedVPNTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      VPN بدون نیاز به
    </Tooltip>
  );

  const handleSubtitleDownloadRequest = (screen) => {
    if (videoData.captions.length === 0) setShowNoSubtitleModal(true);
    else {
      if (screen === "desktop") setShowDownloadSubtitleModal(true);
      if (screen === "mobile") setShowDownloadSubtitleCanvasMobile(true);
    }
  };

  const handleExpViewRequest = () => {
    setShowExpViewModal(false);
    scrollToTop();
    navigate(`/exp/${id}`);
  };

  const handleDefaultViewRequest = () => {
    scrollToTop();
    // navigate(`watch/${id}`);
  };

  const initializeSubtitleDownload = async (subtitleInfo) => {
    const serverSubtitleUrl = `../../api/v1/captions/${id}?lang=${subtitleInfo.languageCode}`;
    let invidiousSubtitleUrl = "";
    console.log(subtitleInfo);
    const captionInv = videoData.captions.find(
      (cc) => cc.language_code === subtitleInfo.languageCode
    );
    const captionENAuto = videoData.captions.find(
      (cc) =>
        cc.language_code === "en" && cc.label === "English (auto-generated)"
    );
    // handling manual english vs auto generated captions
    if (captionInv && subtitleInfo.label !== "English (auto-generated)") {
      invidiousSubtitleUrl = getInvidiousCurrentInstance() + captionInv.url;
    } else if (
      captionENAuto &&
      subtitleInfo.label === "English (auto-generated)"
    ) {
      invidiousSubtitleUrl = getInvidiousCurrentInstance() + captionENAuto.url;
    }
    if (subtitleInfo !== 0) {
      console.log("downloading captions inv");
      try {
        await DownloadYTVideoSubtitle(
          id,
          subtitleInfo.languageCode,
          serverSubtitleUrl
        );
      } catch (error) {
        console.log("error here");
        setServerCCdownloadFailed(true);
        try {
          await DownloadYTVideoSubtitle(
            id,
            subtitleInfo.languageCode,
            invidiousSubtitleUrl
          );
        } catch (error) {
          await delay(1000);
          setServerCCdownloadFailed(false);
          setConnectionFailed(true);
        }
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
  };

  const getVideoStreamData = async () => {
    try {
      const streamData = await getVideoDefaultStreamData(id);
      console.log(streamData);
      setVideoStreamData(streamData);
    } catch (error) {
      setConnectionFailed(true);
      console.error("Error:", error);
    } finally {
    }
  };

  const getVideoDownloadOptions = async (screen) => {
    try {
      setVideoDownloadOptionsIsLoading(true);
      if (videoDownloadOptions.length === 0) {
        // const downloadOptions = await getYTVideoDownloadFormats(id); // you can chack if it's already been get before so you dont load it again !
        const downloadOptions = await getVideoAllStreamingFormats(id);
        console.log("finished request");
        setVideoDownloadOptions(downloadOptions);
        console.log(downloadOptions);
      }
      if (screen === "desktop") setShowDownloadVideoModal(true);
      if (screen === "mobile") setShowDownloadVideoCanvasMobile(true);
    } catch (error) {
      setConnectionFailed(true);
      console.log("an error occured" + error);
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

  const getVideoInvData = async () => {
    try {
      const videoInvData = await getVideoData(id);
      setVideoData(videoInvData);
      document.title = `${videoInvData.title}`;
      console.log("inv data");
      console.log(videoInvData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleVideoDescriptionDisplay = () => {
    setDescriptionCollpased(!descriptionCollpased);
  };

  const getVideoDescriptionLines = () => {
    return descriptionCollpased
      ? videoData.descriptionHtml
          .split("\n")
          .slice(0, videoDescriptionLinesToDisplay)
          .join("<br />")
      : videoData.descriptionHtml.replace(/\n/g, "<br />");
  };

  const handleVideoPlayingError = () => {
    setVideoPlayingFailed(true);
  };

  useEffect(() => {
    (async () => {
      document.title = "YTUT";
      setIsLoading(true);
      const result = await youTubeVideoExists(id);
      setUrlIsValid(result);
      if (result) {
        getVideoStreamData();
        await getVideoInvData();
        // await getVideoThumbnail();
        // await getVideoCaptions();
      } else {
        document.title = "خطای 404";
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {!isLoading && urlIsValid && (
        <div className="main-body">
          <div className="video-container mb-5">
            <div className="d-flex justify-content-center mt-3">
              {!exp && (
                <div className="yt-video w-100" controls>
                  <VideoPlayer
                    videoUrl={videoStreamData.url}
                    // thumbnail={videoThumbnail}
                    thumbnail={videoData.videoThumbnails[0].url}
                    videoId={id}
                  />
                </div>
              )}
              {exp && videoStreamData.url !== undefined && (
                <div className="yt-video w-100" controls>
                  {videoPlayingFailed && <p>error in playing video</p>}
                  {!videoPlayingFailed && (
                    <VideoPlayer
                      videoUrl={`/api/v1/tunnel/blob?url=${encodeURIComponent(
                        videoStreamData.url
                      )}&id=${id}`}
                      thumbnail={videoData.videoThumbnails[0].url}
                      videoId={id}
                      onError={handleVideoPlayingError}
                    />
                  )}
                </div>
              )}
              {exp && videoStreamData.url === undefined && (
                <div className="yt-video w-100" controls>
                  <VideoLoading />
                </div>
              )}
            </div>
            <div>
              <div className="ltr text-1 mt-1">
                <h1>{videoData.title}</h1>
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
                        <BsEye className="text-purple icon-20" />
                        <span className="video-info-item ps-3">
                          {parseInt(videoData.viewCount).toLocaleString(
                            "en-US"
                          )}
                        </span>
                      </div>

                      {/* <div className="d-flex align-items-center mt-3 flex-wrap">
                        <BsHandThumbsUp className="text-orange icon-20" />
                        <span className="video-info-item ps-3">
                          {parseInt(videoData.likeCount).toLocaleString(
                            "en-US"
                          )}
                        </span>
                      </div> */}

                      <div className="d-flex align-items-center mt-3 flex-wrap">
                        <BsCalendarDate className="text-green icon-20" />
                        <span className="video-info-item ps-3">
                          {videoData.publishedText}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mt-3 flex-wrap">
                        <BsClock className="text-pink icon-20" />
                        <span className="video-info-item ps-3">
                          {convertSecondsToDurationLength(
                            videoData.lengthSeconds
                          )}
                        </span>
                      </div>

                      <div className="d-flex align-items-center mt-3 flex-wrap">
                        <BsCcSquare className="text-blue icon-20" />
                        {videoData.captions.length >= 10 ? (
                          <>
                            {videoData.captions
                              .slice(0, 3)
                              .map((caption, idx) => (
                                <span
                                  className={`video-info-item ${
                                    idx === 0 ? "ps-3" : "ps-2"
                                  }`}
                                  key={idx}
                                >
                                  {caption.language_code}
                                  {idx !== 2 && ","}
                                </span>
                              ))}
                            {
                              <span className="video-info-item ps-2 rtl">
                                {videoData.captions.length - 3} زبان دیگر و
                              </span>
                            }
                          </>
                        ) : (
                          <>
                            {videoData.captions.map((caption, idx) => (
                              <span
                                className={`video-info-item ${
                                  idx === 0 ? "ps-3" : "ps-2"
                                }`}
                                key={idx}
                              >
                                {caption.language_code}
                                {idx !== videoData.captions.length - 1 && ","}
                              </span>
                            ))}
                          </>
                        )}
                        {!videoData.captions.length && (
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
                          videoData.authorThumbnails.length > 3
                            ? videoData.authorThumbnails[3].url
                            : videoData.authorThumbnails[0].url
                        }
                        height={50}
                        roundedCircle
                      />
                      <h4 className="ps-3 mb-0">{videoData.author}</h4>
                      <h5 className="ps-2 mb-0">({videoData.subCountText})</h5>
                    </div>

                    <h4 className="mt-2">Description: </h4>
                    <div
                      className="mt-3"
                      style={{ wordBreak: "break-all" }}
                      dangerouslySetInnerHTML={{
                        __html: getVideoDescriptionLines(),
                      }}
                    />
                    <div className="mt-2">
                      <p
                        className="mt-1"
                        className="pointer"
                        onClick={toggleVideoDescriptionDisplay}
                      >
                        {descriptionCollpased ? `show more` : `show less`}
                      </p>
                    </div>
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
                          to={getYouTubeVideoUrlById(id)}
                          target="_blank"
                          className="url-green fs-5"
                        >
                          مشاهده در YouTube
                        </Link>
                      </div>
                      <div className="row">
                        <div className="fs-5 mt-4 col-lg-12 col-md-12 col-sm-6">
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

                        <div className="mt-4 col-lg-12 col-md-12 col-sm-6">
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

                        <div className="mt-4 col-lg-12 col-md-12 col-sm-6">
                          <Button
                            className="btn-blue btn-no-bs w-100"
                            onClick={() => setShowEmbedShareModal(true)}
                          >
                            اشتراک‌گذاری Embed
                          </Button>
                        </div>

                        <div className="mt-4 col-lg-12 col-md-12 col-sm-6">
                          {!exp && (
                            <OverlayTrigger
                              placement="left"
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderEmbedVPNTooltip}
                            >
                              <Button
                                className="btn-orange btn-no-bs w-100"
                                onClick={() => setShowExpViewModal(true)}
                              >
                                مشاهده در حالت آزمایشی
                              </Button>
                            </OverlayTrigger>
                          )}
                          {exp && (
                            <Link to={`/watch/${id}`}>
                              <Button
                                className="btn-orange btn-no-bs w-100"
                                onClick={handleDefaultViewRequest}
                              >
                                مشاهده در حالت عادی
                              </Button>
                            </Link>
                          )}
                        </div>
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
              captionsData={videoData.captions}
              onDownloadRequest={initializeSubtitleDownload}
            />
          }
          {
            <DownloadSubtitleCanvasMobile
              onShow={setShowDownloadSubtitleCanvasMobile}
              showC={showDownloadSubtitleCanvasMobile}
              captionsData={videoData.captions}
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
            <ExperimentalViewModal
              onShow={setShowExpViewModal}
              showP={showExpViewModal}
              onExpViewRequest={handleExpViewRequest}
            />
          }
          {
            <ShareVideoEmbedModal
              onShow={setShowEmbedShareModal}
              showP={showEmbedShareModal}
              videoId={id}
            />
          }
          {
            <div className="download-failed-toast-container">
              <ConnectionFailedToast
                onShow={setConnectionFailed}
                showT={connectionFailed}
              />
            </div>
          }
          {
            <div className="download-failed-toast-container">
              <CaptionDownloadFailedToast
                onShow={setServerCCdownloadFailed}
                showT={serverCCdownloadFailed}
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
