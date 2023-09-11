import ReactPlayer from "react-player";

export default function VideoPlayer() {
  return (
    <div className="main-body">
      <div className="video-container">
        <div className="d-flex justify-content-center mt-3">
          <video className="yt-video w-100" controls>
            <source src="https://www.aparat.com/v/EaQbL" type="text/html" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <div className="ltr text-1 mt-1">
            <h1>Tame Impala - Let It Happen (Official Video)</h1>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-6 col-sm-12 order-xxl-0 order-xl-0 order-lg-0 order-md-1 order-sm-2 order-2">
                persian persian persian persian persian persian persian persian
                persian persian persian persian persian persian persian persian
                persian persian persian persian
              </div>
              <div className="col-xxl-8 col-xl-6 col-lg-6 col-md-12 col-sm-12 order-xxl-1 order-xl-1 order-lg-1 order-md-0 order-sm-0 order-0">
                hello hello hello hello hello hello hello hello hello hello
                hello hello hello hello hello hello hello hello hello hello
                hello hello hello hello
              </div>
              <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-6 col-sm-12 order-xxl-2 order-xl-2 order-lg-2 order-md-2 order-sm-1 order-1">
                bye bye bye bye bye bye bye bye bye bye bye bye bye bye bye bye
                bye bye bye bye bye bye bye bye bye bye bye bye bye bye bye bye
                bye
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
