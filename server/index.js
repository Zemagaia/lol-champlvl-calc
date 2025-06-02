// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3001;
const PATCH = '15.11.1'; // or latest from Riot

app.get('/champion/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const url = `https://ddragon.leagueoflegends.com/cdn/${PATCH}/data/en_US/champion/${name}.json`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching champion:', err.message);
    res.status(500).json({ error: 'Champion not found or API error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
