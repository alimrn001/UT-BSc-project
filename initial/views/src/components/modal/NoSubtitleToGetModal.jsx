import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";

export default function NoSubtitleToGetModal({ showP, onShow }) {
  const [show, setShow] = useState(showP);

  const handleClose = () => {
    onShow(false);
    setShow(false);
  };

  useEffect(() => {
    setShow(showP);
  }, [showP]);

  return (
    <>
      <Modal dir="rtl" show={show} onHide={handleClose}>
        <Modal.Header className="bg-1 text-1">
          <div className="custom-close-button" onClick={handleClose}>
            <Button className="btn btn-modal-close btn-no-bs d-flex align-items-center bg-1">
              <BsXLg />
            </Button>
          </div>
          <Modal.Title>خطا</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-1 text-1">
          <p className="fw-bold">متاسفانه ویدیو دارای زیرنویس نمی باشد!</p>
        </Modal.Body>
        <Modal.Footer className="video-info-modal-footer d-flex justify-content-between bg-1 text-1">
          <Button className="btn btn-pink btn-no-bs" onClick={handleClose}>
            متوجه شدم
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
