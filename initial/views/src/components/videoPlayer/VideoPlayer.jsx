import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import Error from "../shared/errors/Error";
import ReactPlayer from "react-player";
import PageLoading from "../shared/loading/PageLoading";
import {
  BsXLg,
  BsTv,
  BsEye,
  BsHandThumbsUp,
  BsTranslate,
  BsCalendarDate,
  BsClock,
} from "react-icons/bs";
import { Link, useParams, useLocation } from "react-router-dom";
import NoSubtitleToGetModal from "../modal/NoSubtitleToGetModal";
import { useEffect, useState } from "react";
import {
  YTUrlIsValid,
  retrieveVideoData,
  getYtVideoUrlById,
} from "../../utils/youtubeAPI/YTAPI";

import {
  convertYouTubeDurationToMinutes,
  convertYouTubeDateToString,
} from "../../utils/dateTime/DateTimeConverter";

export default function VideoPlayer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const id = searchParams.get("v");
  const { id } = useParams();

  const [showNoSubtitleModal, setShowNoSubtitleModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [urlIsValid, setUrlIsValid] = useState(false);

  const [videoData, setVideoData] = useState({});

  const handleSubtitleDownloadRequest = () => {
    setShowNoSubtitleModal(true);
  };

  useEffect(() => {
    console.log(id + " is id");
    getVideoData();
  }, []);

  const getVideoData = async () => {
    try {
      setIsLoading(true);
      const result = await YTUrlIsValid(getYtVideoUrlById(id));
      console.log("result is : " + result);
      setUrlIsValid(result);
      if (result) {
        const videoData = await retrieveVideoData(getYtVideoUrlById(id));
        console.log(videoData);
        setVideoData(videoData);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isLoading && urlIsValid && (
        <div className="main-body">
          <div className="video-container mb-5">
            <div className="d-flex justify-content-center mt-3">
              <video className="yt-video w-100" controls>
                <source src="https://www.aparat.com/v/EaQbL" type="text/html" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div>
              <div className="ltr text-1 mt-1">
                <h1>{videoData.videoInfo.snippet.title}</h1>
              </div>
              <Container dir="ltr">
                <Row>
                  <Col
                    xxl={{ span: 2, order: 0 }}
                    xl={{ span: 3, order: 0 }}
                    lg={{ span: 3, order: 0 }}
                    md={{ span: 6, order: 1 }}
                    sm={{ span: 12 }}
                    className="order-1 mt-1"
                  >
                    <Stack gap={3}>
                      <div className="d-flex align-items-center">
                        <BsEye style={{ height: 20, width: 20 }} />
                        <span className="video-info-item ps-2">
                          {parseInt(
                            videoData.statistics.viewCount
                          ).toLocaleString("en-US")}
                        </span>
                      </div>

                      <div className="d-flex align-items-center">
                        <BsHandThumbsUp style={{ height: 20, width: 20 }} />
                        <span className="video-info-item ps-2">
                          {parseInt(
                            videoData.statistics.likeCount
                          ).toLocaleString("en-US")}
                        </span>
                      </div>

                      <div className="d-flex align-items-center">
                        <BsCalendarDate style={{ height: 20, width: 20 }} />
                        <span className="video-info-item ps-2">
                          {new Date(
                            videoData.videoInfo.snippet.publishedAt
                          ).toDateString()}
                        </span>
                      </div>

                      <div className="d-flex align-items-center">
                        <BsClock style={{ height: 20, width: 20 }} />
                        <span className="video-info-item ps-2">
                          {convertYouTubeDurationToMinutes(
                            videoData.videoInfo.contentDetails.duration
                          ).toFixed(0)}{" "}
                          min
                        </span>
                      </div>

                      <div className="d-flex align-items-center">
                        <BsTranslate style={{ height: 20, width: 20 }} />
                        <span className="video-info-item ps-2">
                          {videoData.videoInfo.snippet.defaultAudioLanguage
                            ? videoData.videoInfo.snippet.defaultAudioLanguage
                            : "-"}
                        </span>
                      </div>
                    </Stack>
                  </Col>

                  <Col
                    xxl={{ span: 8, order: 1 }}
                    xl={{ span: 6, order: 1 }}
                    lg={{ span: 6, order: 1 }}
                    md={{ span: 12, order: 0 }}
                    sm={{ span: 12 }}
                    className="order-0 mt-1"
                  >
                    <div></div>
                    <div
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
                    className="order-2 mt-1"
                  >
                    <Stack gap={3}>
                      <div className="">
                        <Link
                          to={getYtVideoUrlById(id)}
                          target="_blank"
                          className="url-purple fs-5"
                        >
                          مشاهده در YouTube
                        </Link>
                      </div>

                      <div className="fs-5">
                        <Button
                          className="btn-purple btn-no-bs w-100"
                          onClick={handleSubtitleDownloadRequest}
                        >
                          دانلود زیرنویس فارسی
                        </Button>
                      </div>

                      <div className="fs-4">دانلود ویدیو</div>

                      <div className="ltr">
                        <Form.Select
                          className="bg-1 text-1 btn-no-bs select-form-purple"
                          aria-label="Default select example"
                        >
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </Form.Select>
                      </div>

                      <div>
                        <Button className="btn-pink btn-no-bs w-100">
                          دانلود
                        </Button>
                      </div>
                    </Stack>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          {
            <NoSubtitleToGetModal
              onShow={setShowNoSubtitleModal}
              showP={showNoSubtitleModal}
            />
          }
        </div>
      )}
      {!isLoading && !urlIsValid && <Error code={404} />}
      {isLoading && <PageLoading />}
    </>
  );
}
