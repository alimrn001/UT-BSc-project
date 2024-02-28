import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Offcanvas,
  Stack,
  Collapse,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import {
  BsXLg,
  BsHouseDoorFill,
  BsQuestionCircle,
  BsMoonFill,
  BsSunFill,
  BsArrowDownShort,
  BsCheckLg,
} from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

export default function NavbarSideCanvas({
  showS,
  onShow,
  theme,
  onThemeChange,
}) {
  const [show, setShow] = useState(showS);

  const [themeCollpaseMenuIsOpen, setThemeCollapseMenuIsOpen] = useState(false);

  const setTheme = (themeSelected) => {
    if (theme != themeSelected) onThemeChange();
  };

  const handleClose = () => {
    onShow(false);
    setShow(false);
  };

  useEffect(() => {
    setShow(showS);
  }, [showS]);

  return (
    <Offcanvas
      dir="rtl"
      show={show}
      onHide={handleClose}
      placement="end"
      className="bg-3 text-1 "
      style={{ borderRadius: "0.3rem 0 0 0.3rem" }}
    >
      <Offcanvas.Header>
        <div className="custom-close-button mt-1" onClick={handleClose}>
          <Button className="btn border-0 p-0 fs-3 btn-no-bs d-flex align-items-center bg-3 text-1">
            <BsXLg />
          </Button>
        </div>
        {/* <Offcanvas.Title>دانلود ویدیو</Offcanvas.Title> */}
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack className="mt-1">
          <Link
            to="/"
            className="d-flex flex-wrap align-items-center px-2 py-4 text-decoration-none text-1"
            onClick={handleClose}
          >
            <BsHouseDoorFill className="text-1 icon-20" />
            <span className="video-info-item pe-3">صفحه اصلی</span>
          </Link>

          <Link
            to="/faq"
            className="d-flex flex-wrap align-items-center px-2 py-4 text-decoration-none text-1 border-top-solid"
            onClick={handleClose}
          >
            <BsQuestionCircle className="text-1 icon-20" />
            <span className="video-info-item pe-3">پرسش‌های متداول</span>
          </Link>

          <div
            className="d-flex flex-wrap align-items-center justify-content-between px-2 py-4 border-top-solid"
            onClick={() => setThemeCollapseMenuIsOpen(!themeCollpaseMenuIsOpen)}
          >
            <div className="d-flex flex-wrap align-items-center justify-content-between w-100">
              <div className="d-flex flex-wrap align-items-center">
                {theme === "dark" && <BsMoonFill className="icon-20" />}
                {theme === "light" && <BsSunFill className="icon-24" />}
                <span className="video-info-item pe-3">انتخاب تم</span>
              </div>
              <div>
                {themeCollpaseMenuIsOpen && <FaAngleUp className="icon-20" />}
                {!themeCollpaseMenuIsOpen && (
                  <FaAngleDown className="icon-20" />
                )}
              </div>
            </div>
          </div>

          <div className="px-2">
            <Collapse
              className=" theme-collapse-menu w-100"
              style={{ border: "solid 1px black !important;" }}
              in={themeCollpaseMenuIsOpen}
              //   dimension="width"
            >
              <div className="rtl">
                <div
                  className="d-flex flex-wrap align-items-center justify-content-between p-2"
                  onClick={() => setTheme("dark")}
                >
                  <span style={{ fontSize: "1.1rem" }}>تاریک</span>
                  {theme === "dark" && <BsCheckLg className="icon-18" />}
                </div>
                <div
                  className="d-flex flex-wrap align-items-center justify-content-between border-top-solid p-2"
                  onClick={() => setTheme("light")}
                >
                  <span style={{ fontSize: "1.1rem" }}>روشن</span>
                  {theme === "light" && <BsCheckLg className="icon-20" />}
                </div>
              </div>
            </Collapse>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
