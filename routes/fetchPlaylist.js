import express from "express"
import fetchPlaylistData from "../services/fetchPlaylistData.js"

const router = express.Router()

router.get("/playlists/:id", async (req, res) => {
  const playlistId = req.params.id
  try {
    const data = await fetchPlaylistData(playlistId);
    res.send(`
      <html>
      <body>
        <h1>Fetched Data for Playlist ID: ${playlistId}</h1>
        <pre>${JSON.stringify(data, null, 2)}</pre> <!-- Display data in browser -->
      </body>
      </html>
    `);
  } catch (error) {
    console.error(`Error fetching playlist data for ID: ${playlistId}`, error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

export default router;
