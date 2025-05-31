const express = require('express');
const UAParser = require('ua-parser-js');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('TNSKILL, 8th Floor, CMRL Building, METROS,

No.327 Anna Salai, Nandanam, Chennai – 600035.

Helpline Number: 044-22500107

We are avilable from 10.00 AM to 06.00 PM

servicedesk@tnsdc.in /track');
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
