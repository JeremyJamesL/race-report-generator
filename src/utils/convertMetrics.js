const convertMetresToKm = function (metres) {
  return (metres / 1000).toFixed(2).toString();
};

const convertMetresToMiles = function (metres) {
  return (metres * 0.000621).toFixed(2).toString();
};

const convertSecondsToHHMMSS = function (seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
};

const convertSecondsToMMSS = function (seconds) {
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    minutes.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0"),
  ].join(":");
};

const convertSplits = function (splits) {
  return splits.map((el) => convertSecondsToMMSS(el.elapsed_time));
};

export {
  convertMetresToKm,
  convertMetresToMiles,
  convertSecondsToHHMMSS,
  convertSplits,
};
