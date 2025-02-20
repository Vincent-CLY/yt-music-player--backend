import axios from "axios";
import Innertube from "youtubei.js";
const youtube = await Innertube.create();
const playlistID = "PLbHxd0f6XdHko_QS9nol7nzAxk64NRldc"; // Just for testing

const extract = (items) => {
  return items.map(item => ({
    id: item.id,
    title: item.title.text,
    thumbnail: item.thumbnails[0],
    author: item.author.name,
    duration: item.duration.seconds
  }))
}

async function fetchPlaylistData(playlistID, sendData) {
  // console.time("Total Execution Time");
  // console.time("Fetching Time");
  let playlist = await youtube.getPlaylist(playlistID);
  sendData(playlist.info.total_items);
  // let playlistItems = Array.from(extract(playlist.items));
  sendData(extract(playlist.items));
  // console.timeEnd("Fetching Time");
  // fetch all data until the end
  while (playlist.has_continuation) {
    // console.time("Fetching Continuation");
    playlist = await playlist.getContinuation();
    // console.timeEnd("Fetching Continuation");
    // console.time('Concatenation Time');
    // playlistItems = playlistItems.concat(extract(playlist.items));
    sendData(extract(playlist.items));
    // console.timeEnd('Concatenation Time')
  }
  // console.log(`Total items fetched: ${playlistItems.length}`);
  // console.timeEnd("Total Execution Time");
  // return playlistItems;
  
  // console.log(playlistItems.length);
}

// Use ES module export
export default fetchPlaylistData;
