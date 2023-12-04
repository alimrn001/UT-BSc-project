import axios from "axios";

const invidiousUnblockedInstances = [
  "https://vid.puffyan.us/",
  "https://invidious.asir.dev/",
  "https://iv.ggtyler.dev/",
  "https://inv.us.projectsegfau.lt/",
  "https://invidious.slipfox.xyz/",
  "https://iv.nboeck.de/",
]; // invidious non-filtered instances (last one is german server, not USA!)

export async function getSearchResults(q, type, page) {
  //add sort query too if needed!
  let searchType = type.join(",");
  const encodedSearchQuery = encodeURIComponent(q);
  if (type.length === 1 && type[0] === "all")
    searchType = "video,channel,playlist";

  try {
    console.log("here");
    const response = await axios.get(
      `${invidiousUnblockedInstances[0]}/api/v1/search?q=${encodedSearchQuery}&type=${searchType}&page=${page}`
    );
    const searchResults = response.data;
    return searchResults;
  } catch (error) {
    throw new Error(error);
  }
}
