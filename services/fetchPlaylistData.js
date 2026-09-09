// import axios from "axios";
import Innertube from "youtubei.js";
import scrapePlaylistThumbnail from "./scrapeService.js";

const youtube = await Innertube.create();

export default async function fetchPlaylistData(playlistID, res) {
  try {
    let length = 0;
    // Start scraping high-quality thumbnail in background
    const thumbnailPromise = scrapePlaylistThumbnail(playlistID);

    let playlist = await youtube.getPlaylist(playlistID);
    console.log(`data: ${JSON.stringify(playlist.info.total_items)}\n\n`)
    res.write(`data: ${JSON.stringify(playlist.info.total_items)}\n\n`)

    // Try to resolve the high-quality thumbnail and send it to client
    console.log("Attempting to fetch high-quality thumbnail...");
    try {
        const hqThumbnail = await thumbnailPromise;
        if (hqThumbnail) {
             console.log("Sending high-quality scraped thumbnail to client.");
             res.write(`data: ${JSON.stringify({ thumbnail: hqThumbnail })}\n\n`);
        }
    } catch (e) {
        console.log("Failed to fetch HQ thumbnail during streaming:", e);
    }

    const parseTimeToSeconds = (timeStr) => {
      if (!timeStr || typeof timeStr !== 'string') return 0;
      const parts = timeStr.split(':').map(Number);
      if (parts.some(isNaN)) return 0;
      
      // MM:SS
      if (parts.length === 2) {
        return (parts[0] * 60) + parts[1];
      }
      // HH:MM:SS
      if (parts.length === 3) {
        return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
      }
      return 0;
    };

    const extractAndCount = (rawVideos) => {
      if (!rawVideos) return [];
      return rawVideos.flatMap(video => {
        const videoId = video.content_id || video.id || video.video_id;
        if (videoId) {
          length++;
          return {
            id: video.content_id || video.id || video.video_id,
            title: video.title?.text || video.metadata?.title?.text || "Title Unavailable",
            thumbnail: video.thumbnails?.[0] || video.content_image?.image?.[0] || "Thumbnail Unavailable",
            author: video.author?.name || video.metadata?.metadata?.metadata_rows?.[0]?.metadata_parts?.[0]?.text?.text || "Unknown",
            duration: video.duration?.seconds || parseTimeToSeconds(video.content_image?.overlays?.[0].badges?.[0].text) || 0
          };
        }
        return [];
      });
    };

    let playlistItems = extractAndCount(playlist.videos);
    console.log(`data: ${JSON.stringify(playlistItems)}\n\n`);
    console.log(`[Batch Sent] ${playlistItems.length} items sent to client.`);
    res.write(`data: ${JSON.stringify(playlistItems)}\n\n`)
    // fetch all data until the end
    while (playlist.has_continuation) {
      playlist = await playlist.getContinuation();
      playlistItems = extractAndCount(playlist.videos);
      // console.log(`data: ${JSON.stringify(playlistItems)}\n\n`)
      console.log(`[Batch Sent] ${playlistItems.length} items sent to client.`);
      res.write(`data: ${JSON.stringify(playlistItems)}\n\n`)
    }
    res.write(`length: ${JSON.stringify(length)}\n\n`)
    return 'complete'
  } catch (error) {
    console.log(error)
    res.write('event: playlistFetchFailed\n');
    res.end();
    return 'playlistFetchFailed'
  }
}