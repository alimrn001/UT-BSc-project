import { useEffect, useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { getLanguageTranslationByCode } from "../../utils/translation/Translation";

export default function DownloadVideoCanvasMobile({
  showC,
  onShow,
  optionsData,
  onDownloadRequest,
}) {
  const [show, setShow] = useState(showC);

  const handleClose = () => {
    onShow(false);
    setShow(false);
  };

  const handleYTVideoDownload = (optionInfo) => {
    onDownloadRequest(optionInfo);
  };

  useEffect(() => {
    setShow(showC);
  }, [showC]);

  return (
    <Offcanvas
      dir="rtl"
      show={show}
      onHide={handleClose}
      // responsive="sm"
      placement="bottom"
      className="bg-1 text-1"
      style={{ height: "100vh" }}
      // style={{ height: "fit-content" }}
    >
      <Offcanvas.Header>
        <div className="custom-close-button" onClick={handleClose}>
          <Button className="btn btn-modal-close btn-no-bs d-flex align-items-center bg-1">
            <BsXLg />
          </Button>
        </div>
        <Offcanvas.Title>دانلود ویدیو</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p className="fw-bold">
          لطفا فرمت مورد نظر خود برای دانلود انتخاب کنید.
        </p>
        <Stack>
          {optionsData.map((option, idx) => (
            <div
              className={`d-flex flex-wrap align-items-center justify-content-between px-2 py-3 ${
                idx !== 0 && "border-top-dashed"
              }`}
            >
              <div className="d-flex justify-content-between">
                <p className="mb-0">نوع : {option.extension}</p>
                {option.type === "video" && (
                  <p className="mb-0">, کیفیت : {option.resolution} </p>
                )}
                {option.type === "audio" && (
                  <p className="mb-0">, کیفیت : {option.audio_abr} </p>
                )}
              </div>
              <div>
                <Button
                  className="btn btn-outline-green btn-no-bs d-flex align-items-center bg-1"
                  onClick={() => {
                    handleYTVideoDownload(option);
                  }}
                >
                  دانلود
                </Button>
              </div>
            </div>
          ))}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
