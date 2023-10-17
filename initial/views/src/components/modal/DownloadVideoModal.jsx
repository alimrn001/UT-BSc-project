import { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { getLanguageTranslationByCode } from "../../utils/translation/Translation";

export default function DownloadVideoModal({
  showP,
  onShow,
  optionsData,
  onDownloadRequest,
}) {
  const [show, setShow] = useState(showP);

  const handleClose = () => {
    onShow(false);
    setShow(false);
  };

  useEffect(() => {
    setShow(showP);
  }, [showP]);

  const handleYTVideoDownload = (captionInfo) => {
    onDownloadRequest(captionInfo);
  };

  return (
    <>
      <Modal dir="rtl" show={show} onHide={handleClose}>
        <Modal.Header className="bg-1 text-1">
          <div className="custom-close-button" onClick={handleClose}>
            <Button className="btn btn-modal-close btn-no-bs d-flex align-items-center bg-1">
              <BsXLg />
            </Button>
          </div>
          <Modal.Title>دانلود ویدیو</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-1 text-1">
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
        </Modal.Body>
        <Modal.Footer className="video-info-modal-footer d-flex justify-content-between bg-1 text-1">
          <Button className="btn btn-purple btn-no-bs" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
