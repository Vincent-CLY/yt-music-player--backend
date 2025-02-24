import axios from "axios";
import Innertube from "youtubei.js";
const youtube = await Innertube.create();
const playlistID = "PLbHxd0f6XdHko_QS9nol7nzAxk64NRldc"; // Just for testing

async function fetchPlaylistData(playlistID, res) {
  try {
    let playlist = await youtube.getPlaylist(playlistID);
    console.log(`data: ${JSON.stringify(playlist.info.total_items)}\n\n`)
    res.write(`data: ${JSON.stringify(playlist.info.total_items)}\n\n`)
    let playlistItems = Array.from(playlist.items.map(item => ({
      id: item.id,
      title: item.title.text,
      thumbnail: item.thumbnails[0],
      author: item.author.name,
      duration: item.duration.seconds
    })));
    console.log(`data: ${JSON.stringify(playlistItems)}\n\n`)
    res.write(`data: ${JSON.stringify(playlistItems)}\n\n`)
    // fetch all data until the end
    while (playlist.has_continuation) {
      playlist = await playlist.getContinuation();
      playlistItems = Array.from(playlist.items.map(item => ({
        id: item.id,
        title: item.title.text,
        thumbnail: item.thumbnails[0],
        author: item.author.name,
        duration: item.duration.seconds
      })));
      console.log(`data: ${JSON.stringify(playlistItems)}\n\n`)
      res.write(`data: ${JSON.stringify(playlistItems)}\n\n`)
    }
  } catch (error) {
    console.log(error)
    return error
  }
  // console.log(playlistItems.length);
}

// Use ES module export
export default fetchPlaylistData;
