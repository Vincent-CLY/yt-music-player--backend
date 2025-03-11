import express from "express";
import pkg from "yt-dlp-wrap"; // Import the entire package
const YTDlpWrap = pkg.default; // Access the default export
let help = await ytDlpWrap.getHelp();
console.log(`Help: ${help}`);

const router = express.Router();
const ytDlp = new YTDlpWrap("/workspaces/yt-music-player--backend/yt-dlp/yt-dlp_linux");
// const ytDlp = new YTDlpWrap("../yt-dlp/yt-dlp_linux"); 

// Route for streaming video
router.get("/:videoID", async (req, res) => {
  const videoID = req.params.videoID;

  if (!videoID) {
    return res.status(400).send("Video ID is required");
  }

  try {
    // Use yt-dlp to stream the video
    const ytDlpProcess = ytDlp.exec([
      `https://www.youtube.com/watch?v=${videoID}`,
      "-f", // Format flag
      "best", // Use the best available format
      "-o", // Output flag
      "-"   // Output to stdout
    ]);

    res.setHeader("Content-Type", "video/mp4"); // Set content type for MP4
    ytDlpProcess.stdout.on("error", (err) => {
        console.error("Stream error:", err);
        res.status(500).send("Error processing video stream.");
    });

    ytDlpProcess.stdout.pipe(res); // Pipe the video stream to the response

    ytDlpProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
    });

    ytDlpProcess.on("close", (code) => {
      console.log(`yt-dlp process exited with code ${code}`);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to stream the video");
  }
});

export default router; // Export the router
