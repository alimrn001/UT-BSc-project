import axios from "axios";

const invidiousUnblockedInstances = [
  "https://invidious.flokinet.to",
  "https://invidious.privacydev.net",
  "https://yt.artemislena.eu",
  "https://iv.ggtyler.dev", // needs vpn
  "https://iv.nboeck.de",
  "https://vid.puffyan.us",
  "https://invidious.asir.dev", // server down
  "https://inv.us.projectsegfau.lt",
  "https://invidious.slipfox.xyz",
]; // invidious non-filtered instances (first one is german server, not USA!)

export function getInvidiousCurrentInstance() {
  return invidiousUnblockedInstances[0];
  // return "https://invidious.slipfdsadaox.xyz/";
}

export function getYouTubeVideoUrlById(videoId) {
  return `https://youtu.be/${videoId}`;
}

export function getVideoIdFromYouTubeURL(videoUrl) {
  //checks only the first 11 characters and ignores the rest
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

  // Match the 'v' parameter using the regular expression
  const match = videoUrl.match(regExp);

  // Extract the 'v' parameter value if a match is found
  if (match) {
    return match[1]; // Return the value of the 'v' parameter
  } else {
    return null; // Return null if the 'v' parameter is not found
  }
}

export async function youTubeVideoExists(videoId) {
  // console.log("url is:" + videoUrl);
  // let videoId = getVideoIdFromYouTubeURL(videoUrl);
  if (videoId === null || videoId === undefined) return false;
  try {
    const response = await axios.get(
      `${getInvidiousCurrentInstance()}/api/v1/videos/${videoId}`
    );
    console.log("video id is :" + videoId);
    console.log("axios response is : ");
    console.log(response);
    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    // console.log("error for:" + videoUrl);
    return false;
  }
}

export async function getSearchResults(q, type, page) {
  //add sort query too if needed!
  let searchType = type.join(",");
  const encodedSearchQuery = encodeURIComponent(q);
  if (type.length === 1 && type[0] === "all")
    searchType = "video,channel,playlist";

  try {
    console.log("here");
    const response = await axios.get(
      `${getInvidiousCurrentInstance()}/api/v1/search?q=${encodedSearchQuery}&type=${searchType}&page=${page}`
    );
    const searchResults = response.data;
    return searchResults;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getVideoData(videoId) {
  try {
    const response = await axios.get(
      `${getInvidiousCurrentInstance()}/api/v1/videos/${videoId}`
    );
    const videoData = response.data;
    return videoData;
  } catch (error) {
    throw new Error(error);
  }
}
