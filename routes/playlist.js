import express from "express"
import fetchPlaylistData from "../services/fetchPlaylistData.js"
import getPlaylistMetadata from "../services/validatePlaylist.js"

const router = express.Router()

router.get("/validate/:id", async (req, res) => {
  const playlistId = req.params.id;
  try {
    const metadata = await getPlaylistMetadata(playlistId);
    if (metadata.isValid) {
      res.json(metadata);
    } else {
      res.status(404).json({ isValid: false, message: "Playlist not found or invalid" });
    }
  } catch (error) {
    res.status(500).json({ isValid: false, message: "Internal Server Error" });
  }
});

router.get("/playlist/:id", async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()
  const playlistId = req.params.id
  req.on('close', () => {
    // Clean up resources
    res.end();
  });
  try {
    console.time('FetchPlaylist');
    const status = await fetchPlaylistData(playlistId, res);
    console.timeEnd('FetchPlaylist');
    // console.log(data.length);
    if (status == 'complete') {
      res.write('event: complete\ndata: {"status": "complete"}\n\n');
      res.end()
    }
    // res.json(data)
  } catch (error) {
    console.error(`Error fetching playlist data for ID: ${playlistId}`, error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

export default router;
