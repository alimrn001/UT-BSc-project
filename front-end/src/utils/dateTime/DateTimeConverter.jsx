export function convertYouTubeDurationToMinutes(duration) {
  const match = duration.match(/P(\d+D)?T(\d+H)?(\d+M)?(\d+S)?/);

  const days = match[1] ? parseInt(match[1]) : 0;
  const hours = match[2] ? parseInt(match[2]) : 0;
  const minutes = match[3] ? parseInt(match[3]) : 0;
  const seconds = match[4] ? parseInt(match[4]) : 0;

  const totalMinutes = days * 24 * 60 + hours * 60 + minutes + seconds / 60;

  return totalMinutes;
}

export function convertYouTubeDateToString(date) {
  const dateTimeString = date;
  const dateTime = new Date(dateTimeString);
  return dateTime.toDateString();
}

export function convertSecondsToDurationLength(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  let duration = "";
  if (hours > 0) {
    duration += `${hours} hour${hours > 1 ? "s" : ""} `;
  }
  if (minutes >= 0) {
    duration += `${minutes} min${minutes > 1 ? "s" : ""} `;
  }
  return duration.trim();
}
