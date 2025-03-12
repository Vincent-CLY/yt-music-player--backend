import express from "express";
import youtubeDl from "youtube-dl-exec";

const router = express.Router();

// Route for streaming video
router.get("/:videoID", async (req, res) => {
  const videoID = req.params.videoID; // Assuming videoID is passed in the URL
  const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;

  const downloadVideo = async () => {
    try {
      const output = await youtubeDl(videoUrl, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        preferFreeFormats: true,
        addHeader: ['referer:youtube.com', 'user-agent:googlebot']
      });
      console.log(output);
      res.status(200).json(output);
    } catch (error) {
      console.error('Error downloading video:', error);
      res.status(500).json({ error: 'Error downloading video' });
    }
  };

  downloadVideo();
});

// Optional: Add a health check endpoint
router.get('/health', (req, res) => {
  res.status(200).send('Video streaming service is healthy');
});

export default router;