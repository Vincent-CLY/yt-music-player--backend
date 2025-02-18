import express from "express";
import apiFetchPlaylist from "../routes/fetchPlaylist.js";

const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({origin: 'https://vitejsviteeestp8it-y5f1--5173--7f809d15.local-corp.webcontainer.io'}));

app.get("/", (req, res) => {
  res.send("Hello World in Vercel!");
});

app.use("/api", apiFetchPlaylist);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
