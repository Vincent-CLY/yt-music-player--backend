import express from "express";
import fetchPlaylist from "../routes/fetchPlaylist.js";
import debugPlaylist from "../routes/debugPlaylist.js";

const app = express();
const port = 3000;


app.get("/", (req, res) => {
  res.send("Hello World in Vercel!");
});

app.use("/api", fetchPlaylist);

app.use("/debug", debugPlaylist);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
