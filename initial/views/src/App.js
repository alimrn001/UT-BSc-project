import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import VideoPlayer from "./components/videoPlayer/VideoPlayer";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="video" element={<VideoPlayer />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
