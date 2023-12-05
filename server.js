const express = require('express');
const app = express();

const client = require('./db/client.js');
client.connect();

app.get('/', (req, res) => {
  res.send('<h1>Hello Robot</h1>');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));