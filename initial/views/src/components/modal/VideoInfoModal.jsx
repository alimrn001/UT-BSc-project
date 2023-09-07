import { useState } from "react";
import { Button, Modal, Card } from "react-bootstrap";

export default function VideoInfoModal({ videoData, showP }) {
  const [show, setShow] = useState(showP);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal className="rtl" show={show} onHide={handleClose}>
        <Modal.Header>
          <div className="custom-close-button" onClick={handleClose}>
            <Button className="btn-close"></Button>
          </div>
          <Modal.Title>اطلاعات ویدیو</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ltr">
          <Card>
            <Card.Img
              variant="top"
              src={videoData.videoInfo.snippet.thumbnails.standard.url}
            />
            <Card.Body>
              <Card.Title>{videoData.videoInfo.snippet.title}</Card.Title>
              <Card.Text>
                <p>Channel: {videoData.videoInfo.snippet.channelTitle}</p>
                <p>Published At: {videoData.videoInfo.snippet.publishedAt}</p>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-start">
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
