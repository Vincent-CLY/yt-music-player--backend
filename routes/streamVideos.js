import express from "express";
import youtubeDl from "youtube-dl-exec";

const router = express.Router();

// Route for streaming video
router.get("/:videoID", async (req, res) => {
    const videoID = req.params.videoID;
    const downloadVideo = async () => {
      try {
        const output = await youtubeDl('https://www.youtube.com/watch?v=6xKWiCMKKJg', {
          dumpSingleJson: true,
          noCheckCertificates: true,
          noWarnings: true,
          preferFreeFormats: true,
          addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        });
        console.log(output);
      } catch (error) {
        console.error('Error downloading video:', error);
      }
    };
    
    downloadVideo();
  });

// Optional: Add a health check endpoint
router.get('/health', (req, res) => {
  res.status(200).send('Video streaming service is healthy');
});

export default router;