import express from "express"
import fetchPlaylistData from "../services/fetchPlaylistData.js"

const router = express.Router()

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
