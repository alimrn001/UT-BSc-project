export function getShortenedNumber(number) {
  if (number < 1000) return `${number}`;
  else if (number >= 1000 && number < 1000000) return `${number / 1000}k`;
  else if (number >= 1000000) return `${number / 1000000}m`;
}
