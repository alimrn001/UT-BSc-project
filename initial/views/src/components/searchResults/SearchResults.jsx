import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { getSearchResults } from "../../utils/invidiousAPI/INVAPI";
import VideoItemGrid from "./VideoItemGrid";
import PageLoading from "../shared/loading/PageLoading";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchStr = queryParams.get("q");
  const [searchResultsList, setSearchResultsList] = useState([]);
  const [searchPageNumber, setSearchPageNumber] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const getUserSearchResultsList = async (pageNumber) => {
    setIsLoaded(false);
    const results = await getSearchResults(searchStr, ["video"], pageNumber);
    setIsLoaded(true);
    console.log("search results are");
    console.log(results);
    setSearchResultsList(results);
  };

  useEffect(() => {
    getUserSearchResultsList(searchPageNumber);
  }, [searchPageNumber]);

  return (
    <div className="main-body container mt-5">
      <div className="mt-3">
        <h3>نمایش نتایج جستجو برای: {searchStr}</h3>
      </div>
      {isLoaded && (
        <div className="row ltr mt-5">
          {searchResultsList.map((result, idx) => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
              {result.type === "video" && <VideoItemGrid data={result} />}
            </div>
          ))}
        </div>
      )}
      {!isLoaded && <PageLoading />}
    </div>
  );
}
