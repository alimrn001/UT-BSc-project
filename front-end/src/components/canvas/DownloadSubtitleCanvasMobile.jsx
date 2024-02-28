import { useEffect, useState } from "react";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { getLanguageTranslationByCode } from "../../utils/translation/Translation";

export default function DownloadSubtitleCanvasMobile({
  showC,
  onShow,
  captionsData,
  onDownloadRequest,
}) {
  const [show, setShow] = useState(showC);

  const handleClose = () => {
    onShow(false);
    setShow(false);
  };

  useEffect(() => {
    setShow(showC);
  }, [showC]);

  const handleFaraSubDownload = () => {
    onDownloadRequest(0);
  };

  const handleYTSubDownload = (captionInfo) => {
    onDownloadRequest(captionInfo);
  };

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
        <Offcanvas.Title>دانلود زیرنویس</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p className="fw-bold">
          لطفا زیرنویس با زبان مورد نظر خود را برای دانلود انتخاب کنید.
        </p>
        <Stack>
          <div
            className={`d-flex flex-wrap align-items-center justify-content-between px-2 py-3`}
          >
            <div>
              <h5 className="mb-0">فارسی (ترجمه فرازین)</h5>
            </div>
            <div>
              <Button
                className="btn btn-outline-green btn-no-bs d-flex align-items-center bg-1"
                onClick={handleFaraSubDownload}
              >
                دانلود
              </Button>
            </div>
          </div>
          {captionsData.map((caption, idx) => (
            <div
              className={`d-flex flex-wrap align-items-center justify-content-between px-2 py-3 border-top-dashed`}
            >
              <div>
                <h5 className="mb-0">
                  {getLanguageTranslationByCode(
                    caption.language_code,
                    caption.label
                  )}
                </h5>
              </div>
              <div>
                <Button
                  className="btn btn-outline-green btn-no-bs d-flex align-items-center bg-1"
                  onClick={() => {
                    const captionInfo = {
                      // id: caption.id,
                      languageCode: caption.language_code,
                      label: caption.label,
                      url: caption.url,
                    };
                    handleYTSubDownload(captionInfo);
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
