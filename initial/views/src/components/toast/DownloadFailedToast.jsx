import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

export default function DownloadFailedToast({ showT, onShow }) {
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
      <ToastContainer
        className="p-3 ltr"
        // position={"bottom-center"}
        // style={{ zIndex: 15000 }}
      >
        <Toast
          onClose={handleClose}
          show={show}
          delay={10000}
          className="border-danger border-2"
        >
          <Toast.Header className="text-1 bg-danger border-danger border-2"></Toast.Header>
          <Toast.Body className="rtl bg-1">
            <h5>خطا در برقراری ارتباط!</h5>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
