import express from "express"
import Innertube from "youtubei.js";

const router = express.Router()
const youtube = await Innertube.create();

router.get("/playlist/:id", async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const allPages = [];
    let playlist = await youtube.getPlaylist(req.params.id);
    allPages.push(playlist);
    while (playlist.has_continuation) {
      playlist = await playlist.getContinuation();
      allPages.push(playlist);
    }
    res.json(allPages); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
