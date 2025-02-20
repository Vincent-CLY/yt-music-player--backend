import axios from "axios";
import Innertube from "youtubei.js";
const youtube = await Innertube.create();
const playlistID = "PLbHxd0f6XdHko_QS9nol7nzAxk64NRldc"; // Just for testing

async function fetchPlaylistData(playlistID) {
  let playlist = await youtube.getPlaylist(playlistID);
  // let playlistItems = Array.from(playlist.items);
  let counter = playlist.items.length;
  console.log(counter);
  // fetch all data until the end
  while (playlist.has_continuation) {
    playlist = await playlist.getContinuationData();
    // playlistItems = playlistItems.concat(playlist.items);
    counter += playlist.length;
  }
  return counter;
  playlistItems.map(item => ({
    id: item.id,
    title: item.title.text,
    thumbnail: item.thumbnails[0],
    author: item.author.name,
    duration: item.duration.seconds
  }));
  console.log(playlistItems.length);
}

// Use ES module export
export default fetchPlaylistData;
