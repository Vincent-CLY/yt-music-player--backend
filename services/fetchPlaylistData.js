import axios from "axios";
import Innertube from "youtubei.js";
const youtube = await Innertube.create();
const playlistID = "PLbHxd0f6XdHko_QS9nol7nzAxk64NRldc"; // Just for testing

async function fetchPlaylistData(playlistID) {
  let playlist = await youtube.getPlaylist(playlistID);
  let playlistItems = Array.from(playlist.items);
  return playlistItems
  // fetch all data until the end
  while (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    
    playlistItems = playlistItems.concat(playlist.items);
  }
  
  console.log(playlistItems.length);
}

// Use ES module export
export default fetchPlaylistData;
