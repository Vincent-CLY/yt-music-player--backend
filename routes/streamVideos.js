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
        addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
        cookies: "/workspaces/yt-music-player--backend/youtube.com_cookies.txt",
        f: 'bv*+ba/b', // Adjust format as needed
      });
      console.log(output.requested_downloads[0].requested_formats[0])
      const videoURL = output.requested_formats[0].url;
      const audioURL = output.requested_formats[1].url;
      console.log(`Video: ${videoURL}`);
      console.log(`Audio: ${audioURL}`);
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Video Streaming</title>
        </head>
        <body>
            <video id="videoPlayer" controls width="600">
                <source src="${videoURL}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </body>
        </html>
      `);
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