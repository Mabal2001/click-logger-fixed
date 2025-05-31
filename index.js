const express = require('express');
const UAParser = require('ua-parser-js');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('✅ Click Logger API is running. Use /track');
});

app.get('/track', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const parser = new UAParser(userAgent);
  const ua = parser.getResult();

  const os = `${ua.os.name} ${ua.os.version}`;
  const browser = `${ua.browser.name} ${ua.browser.version}`;

  let location = {};
  try {
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    location = await geoRes.json();
  } catch (err) {
    location = { error: 'Location fetch failed' };
  }

  res.json({ ip, userAgent, os, browser, location });
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}/track`);
});

module.exports = app;
