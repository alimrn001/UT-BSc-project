import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./styles/general.css";
import "./styles/navbar.css";
import "./styles/home.css";
import "./styles/videoInfoModal.css";
import "./styles/videoPlayer.css";
import "./styles/errors.css";
import "./styles/downloadSubtitleModal.css";
import "./styles/downloadFailedToast.css";
import "./styles/alerts.css";
import "./styles/faq.css";
import "./styles/embedShareModal.css";
// import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
