// import axios from "axios";
import Innertube from "youtubei.js";
import scrapePlaylistThumbnail from "./scrapeService.js";

const youtube = await Innertube.create();
let length = 0;

export default async function fetchPlaylistData(playlistID, res) {
  try {
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

    let playlistItems = playlist.items.map(item => ({
      id: item.id,
      title: item.title.text,
      thumbnail: item.thumbnails[0],
      author: item.author.name,
      duration: item.duration.seconds
    }));
    // console.log(`data: ${JSON.stringify(playlistItems)}\n\n`)s
    console.log(`[Batch Sent] ${playlistItems.length} items sent to client.`);
    res.write(`data: ${JSON.stringify(playlistItems)}\n\n`)
    // fetch all data until the end
    while (playlist.has_continuation) {
      playlist = await playlist.getContinuation();
      playlistItems = playlist.items.map(item => ({
        id: item.id,
        title: item.title.text,
        thumbnail: item.thumbnails[0],
        author: item.author.name,
        duration: item.duration.seconds
      }));
      length += playlistItems.length;
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