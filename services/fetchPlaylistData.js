import axios from "axios";
import Innertube from "youtubei.js";
const youtube = await Innertube.create();
const playlistID = "PLbHxd0f6XdHko_QS9nol7nzAxk64NRldc"; // Just for testing

async function fetchPlaylistData(playlistID) {
  console.time("Total Execution Time");
  console.time("Fetching Time");
  let playlist = await youtube.getPlaylist(playlistID);
  let playlistItems = Array.from(playlist.items.map(item => ({
    id: item.id,
    title: item.title.text,
    thumbnail: item.thumbnails[0],
    author: item.author.name,
    duration: item.duration.seconds
  })));
  console.timeEnd("Fetching Time");
  // fetch all data until the end
  while (playlist.has_continuation) {
    console.time("Fetching Continuation");
    playlist = await playlist.getContinuation();
    console.timeEnd("Fetching Continuation");
    console.time('Concatenation Time');
    playlistItems = playlistItems.concat(playlist.items.map(item => ({
      id: item.id,
      title: item.title.text,
      thumbnail: item.thumbnails[0],
      author: item.author.name,
      duration: item.duration.seconds
    })));;
    console.timeEnd('Concatenation Time')
  }
  console.log(`Total items fetched: ${playlistItems.length}`);
  console.timeEnd("Total Execution Time");
  return playlistItems;

  console.log(playlistItems.length);
}

// Use ES module export
export default fetchPlaylistData;
