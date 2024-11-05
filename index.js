import express from "express";
import cors from "cors";
import "dotenv/config";
import convertRaceToJson from "./utils/convertRaceToJson.js";
import { NodeHtmlMarkdown } from "node-html-markdown";
import bodyParser from "body-parser";
const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.text({ type: "text/html" }));
app.use(express.text());

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/api/getRace", async (req, res) => {
  const { query } = req;
  const code = query.code;
  const raceID = query.raceID;
  const apiKey = process.env.STRAVA_API_KEY;
  const clientID = process.env.CLIENT_ID;
  const reqURL = `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${apiKey}&code=${code}&grant_type=authorization_code`;

  try {
    const tokenResponse = await fetch(reqURL, { method: "POST" });
    if (!tokenResponse.ok) {
      throw new Error("API token response failed");
    }

    const tokenData = await tokenResponse.json();

    const raceResponse = await fetch(
      `https://www.strava.com/api/v3/activities/${raceID}?access_token=${tokenData.access_token}`
    );

    if (!raceResponse.ok) {
      throw new Error("Something went wrong fetching race data");
    }

    const raceData = await raceResponse.json();
    const convertedRaceData = convertRaceToJson(raceData);

    res.render("race", {
      race: convertedRaceData,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/markdown", (req, res) => {
  res.send(NodeHtmlMarkdown.translate(req.body));
});

app.listen(port, () => {
  console.log("listening on port", port);
});
