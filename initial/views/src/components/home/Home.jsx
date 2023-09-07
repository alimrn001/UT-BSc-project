import { Link } from "react-router-dom";
import { urlIsValid } from "../../utils/youtubeAPI/YTAPI";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { YTUrlIsValid } from "../../utils/youtubeAPI/YTAPI";

export default function Home() {
  const [isCheckingVideo, setIsCheckingVideo] = useState(false);
  const [urlIsValid, setUrlIsValid] = useState(false);
  const [urlIsRequested, setUrlIsRequested] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

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
        <div class="input-group  mb-3 ltr" style={{ height: "50px" }}>
          <button
            class="btn btn-gradient input-group-text"
            id="basic-addon2"
            onClick={handleUrlSubmit}
          >
            <span className="text-1">
              {!isCheckingVideo && <span>مشاهده</span>}
              {isCheckingVideo && (
                <div
                  class="spinner-border d-flex align-items-center"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              )}
            </span>
          </button>
          <input
            type="text"
            class="form-control url-input-field"
            placeholder="لینک ویدیو را اینجا قرار دهید"
            aria-describedby="basic-addon2"
            value={videoUrl}
            onChange={(e) => handleVideoUrlChange(e)}
            onSubmit={handleUrlSubmit}
          />
        </div>
        {!urlIsValid && !isCheckingVideo && urlIsRequested && (
          <div className="text-danger">
            <BsInfoCircle style={{ height: 20, width: 20 }} />
            <span className="pe-1">لینک ویدیو معتبر نمی‌باشد!</span>
          </div>
        )}
      </div>
    </div>
  );
}
