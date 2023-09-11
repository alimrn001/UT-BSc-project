import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GetErrorDescriptionByCode } from "../../../utils/errors/ErrorUtils";

export default function Error({ code }) {
  return (
    <div className="main-body">
      <Stack
        gap={3}
        className="align-items-center"
        style={{ textAlign: "center" }}
      >
        <div>
          <p className="text-purple error-code">{code}</p>
        </div>
        <h1 className="text-1">{GetErrorDescriptionByCode(code)}</h1>
        <h2>
          <Link to="/" className="url-purple">
            بازگشت به صفحه اصلی
          </Link>
        </h2>
      </Stack>
    </div>
  );
}
