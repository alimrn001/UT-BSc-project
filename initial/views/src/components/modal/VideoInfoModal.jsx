import { useState, useEffect } from "react";
import { Button, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  BsXLg,
  BsTv,
  BsEye,
  BsHandThumbsUp,
  BsCcSquare,
  BsCalendarDate,
  BsClock,
} from "react-icons/bs";
import { convertYouTubeDurationToMinutes } from "../../utils/dateTime/DateTimeConverter";
import NoSubtitleToGetAlert from "../alerts/NoSubtitleToGetAlert";
import axios from "axios";

export default function VideoInfoModal({ videoData, showP, captionsData }) {
  const [show, setShow] = useState(showP);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [thumbnail, setThumbnail] = useState(null);
  const navigate = useNavigate();

  const handleWatchVideoRequest = () => {
    navigate(`watch/${videoData.videoInfo.id}`);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/v1/thumbnail/${videoData.videoInfo.id}/`,
        {
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setThumbnail(`data:;base64,${base64}`);
      })
      .catch((error) => console.error("Error fetching thumbnail:", error));
  }, []);

  return (
    <>
      <Modal
        className="rtl video-info-modal p-0 m-0"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="video-info-modal-header bg-1 text-1">
          <div className="custom-close-button" onClick={handleClose}>
            <Button className="btn btn-modal-close btn-no-bs d-flex align-items-center bg-1">
              <BsXLg />
            </Button>
          </div>
          <Modal.Title>اطلاعات ویدیو</Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-1 text-1 ltr">
          <Card className="bg-1 text-1 video-info-modal-card">
            <Card.Img
              variant="top"
              src={thumbnail}
              // src={
              //   videoData.videoInfo.snippet.thumbnails.standard?.url ||
              //   videoData.videoInfo.snippet.thumbnails.default.url
              // }
            />
            <Card.Body className="bg-1 text-1">
              <Card.Title>{videoData.videoInfo.snippet.title}</Card.Title>
              <Card.Text>
                <div className="d-flex align-items-center flex-wrap">
                  <BsTv style={{ height: 20, width: 20 }} />
                  <span className="video-info-item ps-3">
                    {videoData.videoInfo.snippet.channelTitle}
                  </span>
                </div>

                <div className="d-flex align-items-center mt-3 flex-wrap">
                  <BsEye style={{ height: 20, width: 20 }} />
                  <span className="video-info-item ps-3">
                    {parseInt(videoData.statistics.viewCount).toLocaleString(
                      "en-US"
                    )}
                  </span>
                </div>

                <div className="d-flex align-items-center mt-3 flex-wrap">
                  <BsHandThumbsUp style={{ height: 20, width: 20 }} />
                  <span className="video-info-item ps-3">
                    {parseInt(videoData.statistics.likeCount).toLocaleString(
                      "en-US"
                    )}
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
                    <>
                      <span className="video-info-item ps-3">فاقد زیرنویس</span>
                      <div className="w-100"></div>
                      <div className="mt-3 w-100 flex-column">
                        <NoSubtitleToGetAlert />
                      </div>
                    </>
                  )}
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Modal.Body>

        <Modal.Footer className="video-info-modal-footer d-flex justify-content-between bg-1 text-1">
          <Button
            className="btn btn-pink btn-no-bs"
            onClick={handleWatchVideoRequest}
          >
            مشاهده / دانلود
          </Button>
          <Button className="btn btn-purple btn-no-bs" onClick={handleClose}>
            بازگشت
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
