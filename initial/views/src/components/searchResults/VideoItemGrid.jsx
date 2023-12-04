import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { Card } from "react-bootstrap";

export default function VideoItemGrid({ data }) {
  return (
    <Card className="bg-1 border-0 p-1">
      <Link to={`/watch/${data.videoId}`}>
        <Card.Img variant="top" src={data.videoThumbnails[0].url} />
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/watch/${data.videoId}`} className="url-purple-hover">
            {data.title}
          </Link>
        </Card.Title>
        <Card.Text>
          <Link
            to={data.authorUrl}
            className="url-purple-hover d-flex align-items-center"
          >
            <div className="pe-1">{data.author}</div>
            {data.authorVerified && <MdVerified />}
          </Link>
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div>{`Uploaded ${data.publishedText}`}</div>
          <div>{data.viewCountText}</div>
        </div>
      </Card.Body>
    </Card>
  );
}
