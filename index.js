const express = require('express');
const { resolve } = require('path');
const logger = require('progress-estimator')();
const youtubedl = require('youtube-dl-exec');

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.get('/test-download', async (req, res) => {
  try {
    const url = 'https://www.youtube.com/watch?v=6xKWiCMKKJg';
    const promise = youtubedl(url, { dumpSingleJson: true });
    const result = await logger(promise, `Obtaining ${url}`);
    console.log(result); // Log the result to the console
    res.json(result); // Send the JSON result as a response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
