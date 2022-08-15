import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const data = JSON.parse(fs.readFileSync("./data.json"));

app.use(express.json()); //Used to parse JSON bodies
app.use(cors());

app.put("/highscore", (req, res) => {
  if (+req.body.score > +data.highscore) {
    data.highscore = req.body.score;
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.json({
      status: "success",
      message: "High score updated",
      highscore: data.highscore,
    });
  } else {
    res.json({
      status: "success",
      message: "Highscore not exceeded",
      currentScore: req.body.score,
      highScore: data.highscore,
    });
  }
});

app.get("/highscore", (_req, res) => {
  res.json(data);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
