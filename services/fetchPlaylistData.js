import axios from "axios";
import Innertube from "youtubei.js";

const youtube = await Innertube.create();
const playlistID = "PLbHxd0f6XdHko_QS9nol7nzAxk64NRldc"; // Just for testing

async function fetchPlaylistData(playlistID) {
  const firstPage = await youtube.getPlaylist(playlistID);
  let playlistItems = firstPage.items.map(item => ({
    id: item.id,
    title: item.title.text,
    thumbnail: item.thumbnails[0],
    author: item.author.name,
    duration: item.duration.seconds
  }));

  // Array to hold all continuation promises
  const continuationPromises = [];
  let nextPage = firstPage;
  while (nextPage.has_continuation) {
    continuationPromises.push(nextPage.getContinuation());
    nextPage = await nextPage.getContinuation();
  }

  // Wait for all continuation requests to complete
  const pages = await Promise.all(continuationPromises);

  // Process each page and combine the results
  pages.forEach(page => {
    playlistItems = playlistItems.concat(page.items.map(item => ({
      id: item.id,
      title: item.title.text,
      thumbnail: item.thumbnails[0],
      author: item.author.name,
      duration: item.duration.seconds
    })));
  });

  console.log(playlistItems.length);
  return playlistItems;
}

// Use ES module export
export default fetchPlaylistData;
