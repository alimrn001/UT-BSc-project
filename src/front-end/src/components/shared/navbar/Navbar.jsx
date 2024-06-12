import Logo from "../../../assets/logo.svg";
import {
  BsMoonFill,
  BsSunFill,
  BsQuestionCircle,
  BsArrowLeft,
  BsSearch,
} from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import NavbarSideCanvas from "../../canvas/NavbarSideCanvas";

export default function Navbar() {
  const [theme, setTheme] = useState(getCurrentTheme());
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [mobileSearchBarIsOpen, setMobileSearchBarIsOpen] = useState(false);

  const handleYTSearch = (event) => {
    event.preventDefault();
    const searchValue = document.querySelector("#YTSearchFormInput").value;
    navigate(`/search?q=${searchValue}`);
  };

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

    // return "dark"; // always set dark as the default theme!
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
      {!mobileSearchBarIsOpen && (
        <div className="container-fluid navbar-container">
          <div className="col-2 d-flex d-md-none justify-content-start">
            <Button
              className="btn btn-no-bs text-1 p-0"
              variant=""
              onClick={() => setShowSidebar(true)}
            >
              <AiOutlineMenu className="icon-26 me-1" />
            </Button>
          </div>

          <Link
            className="col-8 col-md-2 d-flex align-items-center text-center text-decoration-none navbar-logo"
            to="/"
          >
            <img
              src={Logo}
              alt="logo"
              width="45"
              height="45"
              className="d-inline-block align-text-top"
            />
            <span className="text-1 pe-1 d-none d-md-block">YTUT</span>
          </Link>

          <div className="col-8 d-none d-md-block">
            <Form onSubmit={(e) => handleYTSearch(e)}>
              <Form.Control
                id="YTSearchFormInput"
                name="YTSearchFormInput"
                className="bg-3 navbar-search-form"
                size="lg"
                type="text"
                placeholder="جستجو در YouTube"
              />
            </Form>
          </div>

          <div className="col-2 d-flex d-md-none justify-content-end">
            <Button
              className="btn btn-no-bs theme-toggle-btn text-1 p-0"
              variant=""
            >
              <BsSearch
                className="icon-22 ms-1"
                onClick={() => setMobileSearchBarIsOpen(true)}
              />
            </Button>
          </div>

          <div className="col-2 d-md-flex d-none justify-content-end">
            <Link to="/faq">
              <Button
                className="btn btn-no-bs theme-toggle-btn text-1"
                variant=""
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
          {
            <NavbarSideCanvas
              onShow={setShowSidebar}
              showS={showSidebar}
              theme={theme}
              onThemeChange={toggleTheme}
            />
          }
        </div>
      )}
      {mobileSearchBarIsOpen && (
        <div className="container-fluid navbar-container">
          <div className="col-10">
            <Form onSubmit={(e) => handleYTSearch(e)}>
              <Form.Control
                id="YTSearchFormInput"
                name="YTSearchFormInput"
                className="bg-3 navbar-search-form"
                size="lg"
                type="text"
                placeholder="جستجو در YouTube"
              />
            </Form>
          </div>

          <div className="col-2 d-flex justify-content-end">
            <Button
              className="btn btn-no-bs theme-toggle-btn text-1 p-0"
              variant=""
            >
              <FaArrowLeft
                className="icon-22 ms-1"
                onClick={() => setMobileSearchBarIsOpen(false)}
              />
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
