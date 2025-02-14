const express = require('express');
const fetchPlaylistData = require('../services/fetchPlaylistData');
const router = express.Router();

router.get('/fetchPlaylist/:id', async (req, res) => {
    const playlistId = req.params.id;
    try {
      const data = await fetchPlaylistData(playlistId);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports =router;