import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import NoSubtitleToGetModal from "../modal/NoSubtitleToGetModal";
import Error from "../shared/errors/Error";
import PageLoading from "../shared/loading/PageLoading";
import DownloadSubtitleModal from "../modal/DownloadSubtitleModal";
import DownloadFailedToast from "../toast/DownloadFailedToast";

import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Stack,
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
  convertYouTubeDurationToMinutes,
  convertYouTubeDateToString,
} from "../../utils/dateTime/DateTimeConverter";

export default function Video() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { id } = useParams();

  const [showNoSubtitleModal, setShowNoSubtitleModal] = useState(false);

  const [showDownloadSubtitleModal, setShowDownloadSubtitleModal] = useState(
    false
  );

  const [isLoading, setIsLoading] = useState(true);

  const [urlIsValid, setUrlIsValid] = useState(false);

  const [videoData, setVideoData] = useState({});

  const [captionsData, setCaptionsData] = useState([]);

  const [downloadFailed, SetDownloadFailed] = useState(false);

  const [channelData, setChannelData] = useState({});

  const handleSubtitleDownloadRequest = () => {
    if (captionsData.length === 0) setShowNoSubtitleModal(true);
    else setShowDownloadSubtitleModal(true);
  };

  const initializeSubtitleDownload = (subtitleInfo) => {
    console.log(
      "downloading " + subtitleInfo.id + " " + subtitleInfo.languageCode
    );
    downloadSubtitle(subtitleInfo);
    SetDownloadFailed(true);
  };

  const getChannelData = async (channelId) => {
    try {
      const response = await retrieveChannelData(channelId);
      setChannelData(response);
      console.log("this is channel data");
      console.log(response);
      // Do something with the channel data, e.g., set it in state
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

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await YTUrlIsValid(getYtVideoUrlById(id));
      setUrlIsValid(result);
      if (result) {
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
              <video className="yt-video w-100" controls>
                <source type="text/html" />
                Your browser does not support the video tag.
              </video>
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
                      <h4 className="ps-3">
                        {videoData.videoInfo.snippet.channelTitle}
                      </h4>
                    </div>
                    {!channelData.channelInfo.statistics
                      .hiddenSubscriberCount && (
                      <h5 className="mt-2">
                        (
                        {parseInt(
                          channelData.channelInfo.statistics.subscriberCount
                        ).toLocaleString("en-US")}{" "}
                        subscribers)
                      </h5>
                    )}
                    <h4>Description: </h4>
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

                      <div className="fs-5 mt-4">
                        <Button
                          className="btn-purple btn-no-bs w-100"
                          onClick={handleSubtitleDownloadRequest}
                        >
                          دانلود زیرنویس
                        </Button>
                      </div>

                      <div className="mt-4">
                        <Button className="btn-pink btn-no-bs w-100">
                          دانلود ویدیو
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
