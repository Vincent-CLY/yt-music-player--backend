const { default: axios } = require('axios');
const fetch = require('axios');

const playlistID = 'PLbHxd0f6XdHko_QS9nol7nzAxk64NRldc'; // Just for testing
const baseURL = 'https://inv.nadeko.net/api/v1/playlists/';

async function fetchPlaylistData(playlistID) {
    const apiURL = `${baseURL}${playlistID}`;
    try {
        const res = await axios.get(apiURL);
        console.log(res);
        return res.data;
    } catch (erorr) {
        console.error('Error fetching data: ', error);
        throw error;
    }
};

module.exports = fetchPlaylistData;