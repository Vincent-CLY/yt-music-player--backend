import express from "express";
import { exec } from "youtube-dl-exec";

const router = express.Router();

// Route for streaming video
router.get("/:videoID", async (req, res) => {
  try {
    const videoID = req.params.videoID;
    const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;

    // First get video info
    try {
      const videoInfo = await exec(videoUrl, {
        dumpSingleJson: true,
        noWarnings: true,
        preferFreeFormats: true,
      });

      // Set streaming headers
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', `inline; filename="${videoInfo.title}.mp4"`);
      res.setHeader('Accept-Ranges', 'bytes');

      // Create the video stream
      const stream = exec(videoUrl, {
        output: '-', // Output to stdout
        format: 'best[ext=mp4]', // Best MP4 format
        quiet: true,
      });

      // Handle stream events
      stream.stdout.on('data', (chunk) => {
        // Optional: Track progress
        console.log(`Streaming chunk of size: ${chunk.length}`);
      });

      stream.stderr.on('data', (data) => {
        console.error(`Stream error: ${data}`);
      });

      stream.stdout.on('end', () => {
        console.log('Stream ended');
      });

      // Pipe the video stream to response
      stream.stdout.pipe(res);

      // Handle client disconnection
      req.on('close', () => {
        stream.kill();
        console.log('Client disconnected, stream killed');
      });

    } catch (error) {
      console.error('Error getting video info:', error);
      res.status(500).send('Error getting video information');
    }

  } catch (error) {
    console.error('Stream error:', error);
    res.status(500).send('Error streaming video');
  }
});

// Optional: Add a health check endpoint
router.get('/health', (req, res) => {
  res.status(200).send('Video streaming service is healthy');
});

export default router;