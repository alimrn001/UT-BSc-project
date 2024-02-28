import { Spinner } from "react-bootstrap";

export default function VideoLoading() {
  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Spinner animation="grow" className="text-purple" />
      <Spinner animation="grow mx-2" className="text-purple" />
      <Spinner animation="grow" className="text-purple" />
    </div>
  );
}
