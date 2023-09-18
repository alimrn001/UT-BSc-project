import { useState } from "react";
import { Button, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  BsXLg,
  BsTv,
  BsEye,
  BsHandThumbsUp,
  BsTranslate,
  BsCalendarDate,
  BsClock,
} from "react-icons/bs";
import {
  convertYouTubeDurationToMinutes,
  convertYouTubeDateToString,
} from "../../utils/dateTime/DateTimeConverter";

export default function VideoInfoModal({ videoData, showP, captionsData }) {
  const [show, setShow] = useState(showP);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handleWatchVideoRequest = () => {
    navigate(`watch/${videoData.videoInfo.id}`);
  };

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
              src={
                videoData.videoInfo.snippet.thumbnails.standard?.url ||
                videoData.videoInfo.snippet.thumbnails.default.url
              }
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
                  <BsTranslate style={{ height: 20, width: 20 }} />
                  {captionsData.map((caption, idx) => (
                    <span className="video-info-item ps-2">
                      {caption.snippet.language}
                      {idx !== captionsData.length - 1 && ","}
                    </span>
                  ))}
                </div>
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
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
