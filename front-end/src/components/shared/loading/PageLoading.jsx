import Spinner from "react-bootstrap/Spinner";

export default function PageLoading() {
  return (
    <>
      <div className="main-body d-flex justify-content-center align-items-center text-center">
        <Spinner animation="border" className="text-purple" />
      </div>
    </>
  );
}
