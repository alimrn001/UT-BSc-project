import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { getSearchResults } from "../../utils/invidiousAPI/INVAPI";
import VideoItemGrid from "./VideoItemGrid";
import PageLoading from "../shared/loading/PageLoading";
import { Button } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchStr = queryParams.get("q");
  const pageNumQ = queryParams.get("page");
  const [searchResultsList, setSearchResultsList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserSearchResultsList = async (pageNumber) => {
    try {
      setIsLoaded(false);
      const results = await getSearchResults(searchStr, ["video"], pageNumber);
      console.log("search results are");
      console.log(results);
      if (results === undefined) setSearchResultsList([]);
      else setSearchResultsList(results);
      setIsLoaded(true);
    } catch (error) {
      setSearchResultsList([]);
      setIsLoaded(true);
    }
  };

  const handlePageChange = (isNextPage) => {
    const newPage =
      pageNumQ === null ? 2 : isNextPage ? +pageNumQ + 1 : +pageNumQ - 1;
    navigate(`/search?q=${searchStr}&page=${newPage}`);
  };

  useEffect(() => {
    console.log("pagenum is:" + pageNumQ);
    getUserSearchResultsList(pageNumQ === null ? 1 : pageNumQ);
  }, [pageNumQ, searchStr]);

  return (
    <div className="main-body container mt-5">
      <div className="mt-3">
        <h3>نمایش نتایج جستجو برای: {searchStr}</h3>
        <div className="mt-5 d-flex justify-content-between">
          <Button
            className="btn btn-outline-green btn-no-bs d-flex justify-content-between align-items-center"
            onClick={() => handlePageChange(true)}
          >
            <BsChevronRight className="ms-1" />
            صفحه بعد
          </Button>

          {pageNumQ !== null && pageNumQ > 1 && (
            <Button
              className="btn btn-outline-green btn-no-bs d-flex justify-content-between align-items-center"
              onClick={() => handlePageChange(false)}
            >
              صفحه قبل
              <BsChevronLeft className="me-1" />
            </Button>
          )}
        </div>
      </div>
      {isLoaded &&
        (searchResultsList.length ? (
          <div className="row ltr mt-5">
            {searchResultsList.map((result, idx) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                {result.type === "video" && <VideoItemGrid data={result} />}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-3">موردی یافت نشد</div>
        ))}

      {!isLoaded && <PageLoading />}
      <div className="mt-5 d-flex justify-content-between mb-4">
        <Button
          className="btn btn-outline-green btn-no-bs d-flex justify-content-between align-items-center"
          onClick={() => handlePageChange(true)}
        >
          <BsChevronRight className="ms-1" />
          صفحه بعد
        </Button>

        {pageNumQ !== null && pageNumQ > 1 && (
          <Button
            className="btn btn-outline-green btn-no-bs d-flex justify-content-between align-items-center"
            onClick={() => handlePageChange(false)}
          >
            صفحه قبل
            <BsChevronLeft className="me-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
