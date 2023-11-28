import { Link, useParams, useLocation } from "react-router-dom";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchStr = queryParams.get("q");
  return (
    <div className="main-body container mt-5">
      <div className="mt-3">
        <h3>نمایش نتایج جستجو برای: {searchStr}</h3>
      </div>
      <div className="row"></div>
    </div>
  );
}
