import axios from "axios";
import Innertube from "youtubei.js";
const youtube = await Innertube.create();
const playlistID = "PLbHxd0f6XdHko_QS9nol7nzAxk64NRldc"; // Just for testing

async function fetchPlaylistData(playlistID, res) {
  let playlist = await youtube.getPlaylist(playlistID);
  res.write(plalylist.info.total_items);
  res.flush();
  let playlistItems = Array.from(playlist.items.map(item => ({
    id: item.id,
    title: item.title.text,
    thumbnail: item.thumbnails[0],
    author: item.author.name,
    duration: item.duration.seconds
  })));
  res.write(playlistItems);
  res.flush();

  // fetch all data until the end
  while (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items.map(item => ({
      id: item.id,
      title: item.title.text,
      thumbnail: item.thumbnails[0],
      author: item.author.name,
      duration: item.duration.seconds
    })));;
    res.write(playlistItems);
    res.flush();
  }
  return playlistItems;

  console.log(playlistItems.length);
}

// Use ES module export
export default fetchPlaylistData;
