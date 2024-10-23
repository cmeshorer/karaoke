/**
 * Formats a duration (milliseconds) as "min:sec"
 * @param  {number} duration The duration
 * @return {string} The formatted duration
 */
export const formatDuration = (duration: number) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / 1000 / 60) % 60);
  const formattedDuration = [
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
  return formattedDuration;
};

/**
 * Formats a release date ("year-month-day") as "year"
 * @param  {string} releaseDate The release date
 * @return {string} The formatted release date
 */
export const formatReleaseDate = (releaseDate: string) => {
  const formattedReleaseDate = releaseDate.includes("-")
    ? releaseDate.split("-")[0]
    : releaseDate;
  return formattedReleaseDate;
};
