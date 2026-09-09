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

    const extractAndCount = (rawVideos) => {
      if (!rawVideos) return [];
      return rawVideos.map(video => {
        length++;
        return {
          id: video.content_id || video.id || video.video_id,
          title: video.title?.text || video.metadata?.title?.text || "Unavailable Video",
          thumbnail: video.thumbnails?.[0] || video.content_image?.image?.sources?.[0] || "",
          author: video.author?.name || video.metadata?.author?.name || "Unknown",
          duration: video.duration?.seconds || video.metadata?.duration?.seconds || 0
        };
      });
    };

    let playlistItems = extractAndCount(playlist.videos);
    // console.log(`data: ${JSON.stringify(playlistItems)}\n\n`)s
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