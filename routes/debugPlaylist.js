import express from "express"
import Innertube from "youtubei.js";

const router = express.Router()
const youtube = await Innertube.create();

router.get("/playlist/:id", async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const allVideos = [];
    let playlist = await youtube.getPlaylist(req.params.id);
    // console.log(playlist.videos)
    allVideos.push(...playlist.videos);
    while (playlist.has_continuation) {
      playlist = await playlist.getContinuation();
      allVideos.push(...playlist.videos);
    }
    res.json(allVideos); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
