import express from "express"
import fetchPlaylistData from "../services/fetchPlaylistData.js"

const router = express.Router()

router.get("/playlists/:id", async (req, res) => {
  const playlistId = req.params.id
  try {
    const data = await fetchPlaylistData(playlistId);
    console.log(data)
    res.json(data)
  } catch (error) {
    console.error(`Error fetching playlist data for ID: ${playlistId}`, error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

export default router;
