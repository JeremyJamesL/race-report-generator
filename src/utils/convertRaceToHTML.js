export default function (raceData) {
  function splitString(string) {
    return string.split("_").join(" ");
  }
  const generalInfo = raceData.general;
  const goals = raceData.goals;
  const splits =
    raceData.chosenSystem === "metric"
      ? raceData.splits.splitInKMs
      : raceData.splits.splitInMiles;
  let htmlString = `<div className="flex gap-10"><aside><div className="card">`;

  Object.keys(generalInfo).forEach((key) => {
    htmlString += `
      <div class="mb-2">
        <label for="${key}" class="capitalize">${splitString(key)}</label>
        <input type="text" name="${key}" id="${key}" value="${
      generalInfo[key]
    }" />
      </div>
    `;
  });

  Object.keys(goals).forEach((key) => {
    htmlString += `
        <div class="mb-2">
            <label for="${key}" class="capitalize">${splitString(key)}</label>
            <input type="text" name="${key}" id="${key}" value="${
      goals[key]
    }" />
        </div>
    `;
  });

  Object.keys(splits).forEach((key) => {
    htmlString += `
        <div class="mb-2">
            <label for="${key}" class="capitalize">${splitString(key)}</label>
            <input type="text" name="${key}" id="${key}" value="${
      splits[key]
    }" />
        </div>
    `;
  });

  htmlString += `</div></aside></div>`;

  return htmlString;
}
