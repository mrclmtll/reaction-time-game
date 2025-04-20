const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/reactiontime");

const HighscoreSchema = new mongoose.Schema({
  name: String,
  reaction_time: Number,
  date: { type: Date, default: Date.now },
});

const Highscore = mongoose.model("Highscore", HighscoreSchema);

app.post("/api/highscores", async (req, res) => {
  const { name, time } = req.body;
  const newScore = new Highscore({ name, reaction_time: time });
  await newScore.save();
  console.log("saved highscore", newScore);

  res.status(201).send(newScore);
});

app.get("/api/highscores", async (req, res) => {
  const scores = await Highscore.find().sort({ reaction_time: 1 }).limit(10);
  res.send(scores);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
