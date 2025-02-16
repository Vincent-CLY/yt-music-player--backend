import express from "express";
import apiFetchPlaylist from "../routes/fetchPlaylist.js";

import Innertube from "youtubei.js";
const youtube = await Innertube.create();

const app = express();
const port = 3000;

async function fetchPlaylistData(playlistID) {
  let playlist = await youtube.getPlaylist(playlistID);
  let playlistItems = Array.from(playlist.items);
  console.log(playlist.info.total_items); // ['items', 'has_continuation', 'continuation']
  console.log(playlist.items);
  for (let i = 0; i < playlist.info.total_items; i++) {
    
  }
  // fetch all data until the end
  while (playlist.has_continuation) {
    playlist = await playlist.getContinuation();

    playlistItems = playlistItems.concat(playlist.items);
  }

  console.log(playlistItems.length); // 598
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/playlists/:id", async (req, res) => {
  const playlistId = req.params.id;
  try {
    const data = await fetchPlaylistData(playlistId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// app.use("/api", apiFetchPlaylist);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
