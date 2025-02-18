import express from "express";
import apiFetchPlaylist from "../routes/fetchPlaylist.js";

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World in Vercel!");
});

app.use("/api", apiFetchPlaylist);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
