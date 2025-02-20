import express from "express"
import fetchPlaylistData from "../services/fetchPlaylistData.js"

const router = express.Router()

router.get("/playlists/:id", async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendData = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }

  const playlistId = req.params.id
  try {
    // const data = await fetchPlaylistData(playlistId, sendData);
    await fetchPlaylistData(playlistId, sendData);
    // console.log(data);
    // console.log(data.length);
  //   res.json(data)
  // } catch (error) {
  //   console.error(`Error fetching playlist data for ID: ${playlistId}`, error)
  //   res.status(500).json({ message: "Internal Server Error" })
  // }
    res.write('event: end\ndata: {}\n\n');
  } catch (error) {
    console.error('Error fetching data:', error);
    res.write(`data: ${JSON.stringify({ error: 'Error fetching data' })}\n\n`);
  }
  req.on('close', () => {
    console.log('Client Disconnected');
  })
})

export default router;
