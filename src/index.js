import "./styles.css";
import {
  convertMetresToKm,
  convertMetresToMiles,
  convertSecondsToHHMMSS,
  convertSplits,
} from "./utils/convertMetrics";
import convertRaceToHTML from "./utils/convertRaceToHTML";
const $ = document.querySelector.bind(document);

const datacontroller = (() => {
  // Object for storing all race info returned by the Strava API
  let raceInfo = {};

  return {
    setRaceID: (race) => {
      localStorage.setItem("race", race);
    },

    retrieveStravaRaceInfo: async (code) => {
      const raceID = localStorage.getItem("race");
      const tokenResponse = await fetch(
        `http://localhost:3001/api/getToken?code=${code}`
      );

      if (!tokenResponse.ok) {
        console.log("Something went wrong calling the API");
        return;
      }
      const {
        access_token,
        athlete: { id },
      } = await tokenResponse.json();

      const raceRespose = await fetch(
        `http://localhost:3001/api/getRace?ID=${raceID}&accessToken=${access_token}`
      );

      const raceData = await raceRespose.json();
      const { data } = raceData;

      const raceObject = {
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
      };

      raceInfo = { ...raceObject };
    },

    getAllRaceInfo: () => {
      return raceInfo;
    },
  };
})();

const interfaceController = (() => {
  const DOMStrings = {
    add: "#add-race",
    modal: "#modal",
    closeModal: "#close-modal",
    submitRace: "#submit-race",
    raceInput: "#race-input",
    formFeedback: "#form-feedback",
    errorModal: "#error-modal",
    closeErrorModal: "#close-error-modal",
    primaryContent: "#primary-content",
  };

  return {
    showModal: function () {
      $(DOMStrings.modal).classList.remove("hidden");
      $(DOMStrings.modal).classList.add("fixed", "flex");
    },

    hideModal: function () {
      $(DOMStrings.modal).classList.add("hidden");
      $(DOMStrings.modal).classList.remove("fixed", "flex");
    },

    showErrorModal: function () {
      $(DOMStrings.errorModal).classList.remove("hidden");
      $(DOMStrings.errorModal).classList.add("fixed", "flex");
    },

    hideErrorModal: function () {
      $(DOMStrings.errorModal).classList.add("hidden");
      $(DOMStrings.errorModal).classList.remove("fixed", "flex");
    },

    injectRaceHTML: function (race) {
      const html = convertRaceToHTML(race);
      $(DOMStrings.primaryContent).innerHTML = html;
    },

    getDOMStrings: function () {
      return DOMStrings;
    },
  };
})();

const controller = ((UICtrl, DataCtrl) => {
  const DOM = UICtrl.getDOMStrings();

  const submitRace = () => {
    const raceId = $(DOM.raceInput).value;

    if (!raceId) {
      return ($(DOM.formFeedback).textContent = "You need to specify a race");
    }

    DataCtrl.setRaceID(raceId);

    window.location =
      "https://www.strava.com/oauth/authorize?client_id=96784&response_type=code&redirect_uri=http://localhost:3000/?&approval_prompt=force&scope=activity:read_all";
  };

  // Detect URL on Strava app redirect to get URL params for auth
  const handlePageLoad = async (e) => {
    const urlParams = new URLSearchParams(window.location.search);
    const scope = urlParams.get("scope");

    // Exit function is it isn't Strava redirect URL
    if (!scope) return;

    // If permisssions are insufficient, call it out
    if (scope !== "read,activity:read_all") {
      UICtrl.showErrorModal();
      return;
    }

    const code = urlParams.get("code");

    // Get race info
    await DataCtrl.retrieveStravaRaceInfo(code);

    // Inject race data html into DOM
    UICtrl.injectRaceHTML(datacontroller.getAllRaceInfo());
  };

  const setUpEventListeners = () => {
    $(DOM.add).addEventListener("click", UICtrl.showModal);
    $(DOM.closeModal).addEventListener("click", UICtrl.hideModal);
    $(DOM.closeErrorModal).addEventListener("click", UICtrl.hideErrorModal);
    $(DOM.submitRace).addEventListener("click", submitRace);
    window.addEventListener("load", handlePageLoad);
  };

  return {
    init: function () {
      setUpEventListeners();
    },
  };
})(interfaceController, datacontroller);

controller.init();
