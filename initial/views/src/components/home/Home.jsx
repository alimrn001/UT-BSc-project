import { Link } from "react-router-dom";
import { urlIsValid } from "../../utils/youtubeAPI/YTAPI";

export default function Home() {
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

      <div>
        <div class="input-group url-input-group mb-3 ltr">
          <button class="btn btn-gradient input-group-text" id="basic-addon2">
            <span className="text-1">مشاهده</span>
          </button>
          <input
            type="text"
            class="form-control url-input-field"
            placeholder="لینک ویدیو را اینجا قرار دهید"
            aria-describedby="basic-addon2"
          />
        </div>
        <div className="d-flex align-items-center"></div>
      </div>
    </div>
  );
}
