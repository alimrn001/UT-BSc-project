import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import {
  YTUrlIsValid,
  retrieveVideoData,
  extractVideoIdFromUrl,
  retrieveCaptionsData,
} from "../../utils/youtubeAPI/YTAPI";
import {
  getVideoData,
  youTubeVideoExists,
  getVideoIdFromYouTubeURL,
} from "../../utils/invidiousAPI/INVAPI";
import VideoInfoModal from "../modal/VideoInfoModal";
import { Button, InputGroup, FormControl, Spinner } from "react-bootstrap";

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
    setShowVideoDataModal(false);

    try {
      // const result = await YTUrlIsValid(videoUrl);
      const result = await youTubeVideoExists(
        getVideoIdFromYouTubeURL(videoUrl)
      );
      console.log("id is : " + getVideoIdFromYouTubeURL(videoUrl));
      console.log("result is : " + result);
      setUrlIsValid(result);
      if (result) {
        console.log("id is : " + getVideoIdFromYouTubeURL(videoUrl));
        const videoData = await getVideoData(
          getVideoIdFromYouTubeURL(videoUrl)
        );
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

  useEffect(() => {
    document.title = "YTUT";
  }, []);

  return (
    <div className="main-body">
      <div
        className="d-flex flex-column align-items-center px-3 mt-4"
        style={{ textAlign: "center" }}
      >
        <h1 className="text-purple">YTUT</h1>
        <h5 className="mt-1">
          با استفاده از YTUT ویدیو‌های مورد علاقه خود در{" "}
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
        <InputGroup className="mb-3 ltr">
          <Button
            className="btn-gradient btn-no-bs"
            id="basic-addon2"
            onClick={handleUrlSubmit}
          >
            <span className="text-1 d-flex align-items-center p-2">
              {!isCheckingVideo ? (
                <span>مشاهده</span>
              ) : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </span>
          </Button>
          <FormControl
            type="text"
            className="url-input-field" //add rtl if needed here
            placeholder="لینک ویدیو را اینجا قرار دهید"
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
