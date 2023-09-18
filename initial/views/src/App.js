import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import VideoPlayer from "./components/video/Video";
import Error from "./components/shared/errors/Error";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="watch/:id" element={<VideoPlayer />} />
            <Route path="*" element={<Error code={404} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
