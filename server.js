const express = require('express');
const app = express();
const port = 3000;

const apiFetchPlaylist = require('./routes/fetchPlaylist');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiFetchPlaylist);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
