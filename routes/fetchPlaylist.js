import express from "express"
import fetchPlaylistData from "../services/fetchPlaylistData.js"

const cors = require('cors');
const router = express.Router()

router.use(cors({origin: 'https://vitejsviteeestp8it-y5f1--5173--7f809d15.local-corp.webcontainer.io'}));

router.get("/playlists/:id", async (req, res) => {
  const playlistId = req.params.id
  try {
    const data = await fetchPlaylistData(playlistId);
    res.json(data)
  } catch (error) {
    console.error(`Error fetching playlist data for ID: ${playlistId}`, error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

export default router;
