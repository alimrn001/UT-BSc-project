import { useEffect, useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { getLanguageTranslationByCode } from "../../utils/translation/Translation";

export default function DownloadSubtitleModal({
  showP,
  onShow,
  captionsData,
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

  const handleFaraSubDownload = () => {
    onDownloadRequest(0);
  };

  const handleYTSubDownload = (captionInfo) => {
    onDownloadRequest(captionInfo);
  };

  return (
    <>
      <Modal dir="rtl" show={show} onHide={handleClose}>
        <Modal.Header className="video-info-modal-header bg-1 text-1">
          <div className="custom-close-button" onClick={handleClose}>
            <Button className="btn btn-modal-close btn-no-bs d-flex align-items-center bg-1">
              <BsXLg />
            </Button>
          </div>
          <Modal.Title>دانلود زیرنویس</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-1 text-1">
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
                className={`d-flex flex-wrap align-items-center justify-content-between px-2 py-3 sub-language-container`}
              >
                <div>
                  <h5 className="mb-0">
                    {getLanguageTranslationByCode(caption.snippet.language)}
                  </h5>
                </div>
                <div>
                  <Button
                    className="btn btn-outline-green btn-no-bs d-flex align-items-center bg-1"
                    onClick={() => {
                      const captionInfo = {
                        id: caption.id,
                        languageCode: caption.snippet.language,
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
