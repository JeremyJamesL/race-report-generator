const raceInput = document.querySelector(".race-input");
const submitBtn = document.querySelector(".submit");
const entryContent = document.querySelector(".entry-content");

window.addEventListener("load", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const scope = urlParams.get("scope");
  let raceID;
  if (localStorage.getItem("raceID")) {
    raceID = localStorage.getItem("raceID");
  }

  if (!scope) return;

  try {
    const code = urlParams.get("code");
    const data = await fetch(
      `http://localhost:8000/api/getRace?code=${code}&raceID=${raceID}`
    );
    const html = await data.text();
    entryContent.insertAdjacentHTML("afterbegin", html);
  } catch (err) {
    console.log(err);
  }
});

entryContent.addEventListener("input", (e) => {
  const classArr = Array.from(e.target.classList);
  const index = classArr.findIndex((el) => el.includes("input__"));
  const classString = classArr[index];
  const outputSelector = `.output__${classString.split("__")[1]}`;
  document.querySelector(outputSelector).innerHTML = e.target.value;
});

entryContent.addEventListener("click", async (e) => {
  if (e.target.classList.contains("get-markdown")) {
    const string = document.querySelector(".app").innerHTML;
    const response = await fetch("http://localhost:8000/api/markdown", {
      method: "POST",
      headers: {
        "Content-Type": "text/html",
      },
      body: string,
    });
    const data = await response.text();
    await navigator.clipboard.writeText(data);
    console.log("markdown copied!");
  }
});

submitBtn.addEventListener("click", () => {
  localStorage.setItem("raceID", raceInput.value);
  window.location = `https://www.strava.com/oauth/authorize?client_id=96784&response_type=code&redirect_uri=http://localhost:8000/&approval_prompt=force&scope=activity:read_all`;
});
