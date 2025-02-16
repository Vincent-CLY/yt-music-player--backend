import express from "express";
import apiFetchPlaylist from "../routes/fetchPlaylist.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("test");
});

app.use("/api", apiFetchPlaylist);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
