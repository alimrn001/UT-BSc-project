import Logo from "../../../assets/logo.svg";
import { BsMoonFill, BsSunFill, BsQuestionCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Navbar() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const navigate = useNavigate();

  useEffect(() => {
    loadTheme(theme);
  }, [theme]);

  function getCurrentTheme() {
    let storedTheme = localStorage.getItem("yt.theme");
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function loadTheme(theme) {
    const root = document.querySelector(":root");
    if (theme === "light") {
      // Set your light mode styling here
    } else {
      // Set your dark mode styling here
    }
    root.setAttribute("color-scheme", theme);
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("yt.theme", newTheme);
  };

  return (
    <nav className="navbar bg-1 justify-content-between">
      <div className="container-fluid navbar-container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={Logo}
            alt="logo"
            width="45"
            height="45"
            className="d-inline-block align-text-top"
          />
          <span className="text-1 pe-1">App name</span>
        </Link>
        <div className="d-flex align-items-center">
          <Link to="/faq">
            <Button
              className="btn btn-no-bs theme-toggle-btn text-1"
              variant=""
              // onClick={(e) => navigateToFAQ(e)}
            >
              <BsQuestionCircle className="icon-22" />
            </Button>
          </Link>
          <Button
            className="btn text-1 btn-no-bs theme-toggle-btn d-flex align-items-center"
            type="button"
            variant=""
            onClick={toggleTheme}
          >
            {theme === "light" && <BsMoonFill className="icon-20" />}
            {theme === "dark" && <BsSunFill className="icon-24" />}
          </Button>
        </div>
      </div>
    </nav>
  );
}
