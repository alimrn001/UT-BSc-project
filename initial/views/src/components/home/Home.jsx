import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { YTUrlIsValid, retrieveVideoData } from "../../utils/youtubeAPI/YTAPI";
import VideoInfoModal from "../modal/VideoInfoModal";
import { Button, InputGroup, FormControl } from "react-bootstrap";

export default function Home() {
  const [isCheckingVideo, setIsCheckingVideo] = useState(false);
  const [urlIsValid, setUrlIsValid] = useState(false);
  const [urlIsRequested, setUrlIsRequested] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [modalVideoData, setModalVideoData] = useState(null);
  const [showVideoDataModal, setShowVideoDataModal] = useState(false);

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
    setUrlIsRequested(false);
    // setIsCheckingVideo(false);
  };

  const handleUrlSubmit = async () => {
    setIsCheckingVideo(true);
    setUrlIsRequested(true);

    try {
      const result = await YTUrlIsValid(videoUrl);
      console.log("result is : " + result);
      setUrlIsValid(result);
      if (result) {
        const videoData = await retrieveVideoData(videoUrl);
        setModalVideoData(videoData);
        setShowVideoDataModal(true);
        console.log(videoData);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsCheckingVideo(false);
    }
  };

  return (
    <div className="main-body">
      <div
        className="d-flex flex-column align-items-center px-3"
        style={{ textAlign: "center" }}
      >
        <h1 className="text-purple">YtDown</h1>
        <h5 className="mt-1">
          با استفاده از YtDown ویدیو‌های مورد علاقه خود در{" "}
          <Link to="https://youtube.com" className="url-purple">
            YouTube
          </Link>{" "}
          را با <span className="text-pink">زیرنویس فارسی</span> مشاهده کنید.
        </h5>
        <h5 className="mt-3">
          برای استفاده تنها کافیست لینک ویدیو را در باکس زیر قرار دهید!
        </h5>
      </div>

      <div className="url-input-group">
        <InputGroup className="mb-3 ltr" style={{ height: "50px" }}>
          <Button
            className="btn-gradient"
            id="basic-addon2"
            onClick={handleUrlSubmit}
          >
            <span className="text-1">
              {!isCheckingVideo ? (
                <span>مشاهده</span>
              ) : (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </span>
          </Button>
          <FormControl
            type="text"
            className="url-input-field"
            placeholder="لینک ویدیو را اینجا قرار دهید"
            aria-describedby="basic-addon2"
            value={videoUrl}
            onChange={(e) => handleVideoUrlChange(e)}
            onSubmit={handleUrlSubmit}
          />
        </InputGroup>
        {!urlIsValid && !isCheckingVideo && urlIsRequested && (
          <div className="text-danger">
            <BsInfoCircle style={{ height: 20, width: 20 }} />
            <span className="pe-1">لینک ویدیو معتبر نمی‌باشد!</span>
          </div>
        )}
      </div>

      {showVideoDataModal && (
        <VideoInfoModal showP={true} videoData={modalVideoData} />
      )}
    </div>
  );
}
