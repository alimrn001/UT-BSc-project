import { useEffect, useState } from "react";
import { Button, CloseButton, ToastContainer } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import Toast from "react-bootstrap/Toast";

export default function CaptionDownloadFailedToast({ showT, onShow }) {
  const [show, setShow] = useState(showT);

  const handleClose = () => {
    onShow(false);
    setShow(false);
  };

  useEffect(() => {
    setShow(showT);
  }, [showT]);

  return (
    <>
      <ToastContainer className="p-3 ltr">
        <Toast
          onClose={handleClose}
          show={show}
          delay={3000}
          autohide
          className="toast-body-container border-2"
        >
          <Toast.Body className="rtl bg-alert text-alert">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="mb-0">خطا در هنگام دانلود زیرنویس!</h5>
              <Button
                onClick={handleClose}
                className="bg-alert text-alert border-0 btn-no-bs"
              >
                <BsXLg />
              </Button>
            </div>
            <h5 className="mb-0">در حال امتحان روشی دیگر</h5>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
