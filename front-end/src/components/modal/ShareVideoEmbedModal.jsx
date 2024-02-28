import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  Row,
  Col,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import { BsXLg } from "react-icons/bs";

export default function ShareVideoEmbedModal({ showP, onShow, videoId }) {
  const [show, setShow] = useState(showP);
  const [embedUrl, setEmbedUrl] = useState();
  const [showMainUrl, setShowMainUrl] = useState(false);
  const [showYTUrl, setShowYTUrl] = useState(false);
  const [showVideoTitle, setShowVideoTitle] = useState(false);
  const embedUrlRef = useRef(null);

  const handleClose = () => {
    onShow(false);
    setShow(false);
  };

  const updateEmbedUrl = () => {
    const url = `http://localhost:3000/embed/v/${videoId}?showTitle=${
      showVideoTitle ? "1" : "0"
    }&showSrc=${showMainUrl ? "1" : "0"}&showYTUrl=${showYTUrl ? "1" : "0"}`;
    setEmbedUrl(url);
  };

  const handleVideoTitleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked; // Define isChecked here
    console.log(id);
    console.log(isChecked);
    if (id === 1) setShowVideoTitle(isChecked);
    else if (id === 2) setShowMainUrl(isChecked);
    else if (id === 3) setShowYTUrl(isChecked);

    // Now use isChecked here
    const url = `http://localhost:3000/embed/v/${videoId}?showTitle=${
      id === 1 ? (isChecked ? "1" : "0") : showVideoTitle ? "1" : "0"
    }&showSrc=${
      id === 2 ? (isChecked ? "1" : "0") : showMainUrl ? "1" : "0"
    }&showYTUrl=${id === 3 ? (isChecked ? "1" : "0") : showYTUrl ? "1" : "0"}`;
    setEmbedUrl(url);
  };

  const copyToClipboard = () => {
    if (embedUrlRef.current) {
      embedUrlRef.current.select();
      document.execCommand("copy");
    }
  };

  useEffect(() => {
    setShow(showP);
    updateEmbedUrl();
  }, [showP]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        dialogClassName="embed-share-modal"
      >
        <Modal.Body
          className=" bg-3 text-1 p-0"
          style={{ borderRadius: "0.3rem" }}
        >
          <Container>
            <Row>
              <Col lg="8" md="12" className="">
                <iframe
                  className="w-100 embed-iframe"
                  //   src={`/embed/v/${videoId}`}
                  src={embedUrl}
                  // width="600"
                  //   height="400"
                ></iframe>
              </Col>
              <Col lg="4" md="12" className="p-0">
                <Card className="bg-3 h-100 embed-share-data-card">
                  <Card.Header className="embed-share-data-card-header bg-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Modal.Title> Embed اشتراک‌گذاری</Modal.Title>
                      </div>
                      <Button
                        className="btn btn-no-bs d-flex align-items-center bg-3 border-0 fs-large text-1 bg-3 px-0"
                        onClick={handleClose}
                      >
                        <BsXLg />
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body className="embed-share-data-card-body bg-3">
                    <Card.Text>
                      <Form.Control
                        ref={embedUrlRef}
                        className="bg-3 text-green embed-url-textarea-form"
                        as="textarea"
                        rows={4}
                        placeholder="Disabled readonly input"
                        aria-label="Disabled input example"
                        readOnly
                        value={`<iframe width="600" height="400" src=${embedUrl}></iframe>`}
                      />
                      <div className="mt-5 rtl">
                        <h5>تنظیمات</h5>
                        <div className="mt-3 d-flex">
                          <Form.Check
                            type="checkbox"
                            checked={showVideoTitle}
                            onChange={(event) =>
                              handleVideoTitleCheckboxChange(event, 1)
                            }
                          />
                          <label
                            class="form-check-label pe-2"
                            for="defaultCheck1"
                          >
                            نمایش نام ویدیو
                          </label>
                        </div>

                        <div className="mt-3 d-flex">
                          <Form.Check
                            type="checkbox"
                            checked={showMainUrl}
                            onChange={(event) =>
                              handleVideoTitleCheckboxChange(event, 2)
                            }
                          />
                          <label
                            class="form-check-label pe-2"
                            for="defaultCheck1"
                          >
                            نمایش لینک ویدیو در YTUT
                          </label>
                        </div>

                        <div className="mt-3 d-flex">
                          <Form.Check
                            type="checkbox"
                            checked={showYTUrl}
                            onChange={(event) =>
                              handleVideoTitleCheckboxChange(event, 3)
                            }
                          />
                          <label
                            class="form-check-label pe-2"
                            for="defaultCheck1"
                          >
                            نمایش لینک ویدیو در YouTube
                          </label>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-3 embed-share-data-card-footer">
                    <Button
                      className="btn-blue btn-no-bs"
                      onClick={copyToClipboard}
                    >
                      کپی
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
