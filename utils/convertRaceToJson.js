import {
  convertMetresToKm,
  convertSecondsToHHMMSS,
  convertMetresToMiles,
  convertSplits,
} from "./convertMetrics.js";

const convertRaceToJson = function (data) {
  return {
    general: {
      name: data.name,
      date: new Date(data.start_date).toDateString(),
      distance_KM: convertMetresToKm(data.distance),
      distance_miles: convertMetresToMiles(data.distance),
      location: data.location_city || "",
      finish_time: convertSecondsToHHMMSS(data.elapsed_time),
      elevation_gain: data.total_elevation_gain,
      gear: data.gear.name || "",
      strava_url: `https://www.strava.com/activities/${data.id}`,
    },
    splits: {
      splitInKMs: convertSplits(data.splits_metric),
      splitInMiles: convertSplits(data.splits_standard),
    },
    chosenSystem: "metric",
    goals: {
      goal_1: "Sub 140",
      goal_2: "Sub 120",
    },
    text_sections: {
      section_1: "Background",
      section_2: "Training",
      section_3: "Pre-race",
    },
    race_goals: {
      goal_1: "sub 140",
      goal_2: "sub 120",
    },
  };
};

export default convertRaceToJson;
