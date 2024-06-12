import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.svg";

export default function EmbedNavbar() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Link to="/" target="blank_">
          <img
            src={Logo}
            alt="logo"
            width="45"
            height="45"
            className="d-inline-block align-text-top"
          />
        </Link>
      </div>
    </>
  );
}
