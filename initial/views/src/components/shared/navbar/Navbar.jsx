import Logo from "../../../assets/logo.svg";
import {
  BsMoonFill,
  BsSunFill,
  BsQuestionCircle,
  BsList,
} from "react-icons/bs";
import { CiMenuBurger } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

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
        <div className="col-2 d-sm-flex d-md-none justify-content-center">
          sidebar icon
        </div>

        <Link
          className="col-8 col-md-2 d-flex justify-content-center align-items-center text-center"
          to="/"
        >
          <img
            src={Logo}
            alt="logo"
            width="45"
            height="45"
            className="d-inline-block align-text-top"
          />
          <span className="text-1 pe-1 d-none d-md-block">App name</span>
        </Link>

        <div className="col-8 d-none d-md-block">search form</div>

        <div className="col-2 d-sm-flex d-md-none justify-content-center">
          search icon
        </div>

        <div className="col-2 d-md-flex d-none">util</div>
        {/* <Link className="col-2 d-flex align-items-center d-sm-none" to="/">
          salam
        </Link>

        <Link className="col-2 navbar-brand d-flex align-items-center" to="/">
          <img
            src={Logo}
            alt="logo"
            width="45"
            height="45"
            className="d-inline-block align-text-top"
          />
          <span className="text-1 pe-1 d-none d-sm-block">App name</span>
        </Link>

        <div className="col-8 col-sm-4 d-none d-sm-block">
          <Form.Control size="lg" type="text" placeholder="Large text" />
        </div>

        <div className="col-sm-2 align-items-center justify-content-end d-none d-sm-flex">
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

        <div className="d-flex col-sm-2 align-items-center justify-content-end d-block d-sm-none">
          <Button
            className="btn btn-no-bs theme-toggle-btn text-1 pe-0 ps-0"
            variant=""
          >
            <CiMenuBurger className="icon-24" />
          </Button>
        </div>
       */}
      </div>
    </nav>
  );
}
