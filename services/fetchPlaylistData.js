import axios from "axios";
import Innertube from "youtubei.js";
const youtube = await Innertube.create();
const playlistID = "PLbHxd0f6XdHko_QS9nol7nzAxk64NRldc"; // Just for testing

async function fetchPlaylistData(playlistID) {
  let playlist = await youtube.getPlaylist(playlistID);
  let playlistItems = Array.from(playlist.items);
  // fetch all data until the end
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  if (playlist.has_continuation) {
    playlist = await playlist.getContinuation();
    playlistItems = playlistItems.concat(playlist.items);
  }
  return playlistItems.map(item => ({
    id: item.id,
    title: item.title.text,
    thumbnail: item.thumbnails[0],
    author: item.author.name,
    duration: item.duration.seconds
  }))
  return playlistItems;

  console.log(playlistItems.length);
}

// Use ES module export
export default fetchPlaylistData;
