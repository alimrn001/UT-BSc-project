import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";

export default function ExperimentalViewModal({ showP, onShow }) {
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
      <Modal dir="rtl" show={show} onHide={handleClose} size="lg">
        <Modal.Header className="bg-1 text-1">
          <div className="custom-close-button" onClick={handleClose}>
            <Button className="btn btn-modal-close btn-no-bs d-flex align-items-center bg-1">
              <BsXLg />
            </Button>
          </div>
          <Modal.Title>مشاهده ویدیو در حالت آزمایشی</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-1 text-1">
          <p className="fw-bold">
            در حالت آزمایشی می توانید ویدیو مورد نظر خود را
            <span className="text-green"> بدون نیاز به VPN </span> مشاهده کنید.
          </p>
        </Modal.Body>
        <Modal.Footer className="video-info-modal-footer d-flex justify-content-between bg-1 text-1">
          <Link to="./exp">
            <Button className="btn btn-orange btn-no-bs">مشاهده</Button>
          </Link>
          <Button className="btn btn-purple btn-no-bs" onClick={handleClose}>
            بستن
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
