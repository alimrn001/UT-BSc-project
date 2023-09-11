import ReactPlayer from "react-player";

export default function VideoPlayer() {
  return (
    <div className="main-body">
      <div className="d-flex justify-content-center mt-5">
        <video className="yt-video" controls>
          <source src="https://www.aparat.com/v/EaQbL" type="text/html" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
