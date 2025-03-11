import express from "express";
import apiFetchPlaylist from "../routes/fetchPlaylist.js";
import streamVideos from "../routes/streamVideos.js";

const app = express();
const port = 3000;


app.get("/", (req, res) => {
  res.send("Hello World in Vercel!");
});

app.use("/api", apiFetchPlaylist);

app.use("/stream", streamVideos);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
