import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function VideoInfoModal({ videoData, showP }) {
  const [show, setShow] = useState(showP);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sample Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is a simple modal example using React Bootstrap.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
