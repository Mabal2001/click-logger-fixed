const express = require('express');
const UAParser = require('ua-parser-js');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const SHEET_WEBHOOK_URL = "https://script.google.com/a/macros/tnsdc.in/s/AKfycbxT8OLbnezsaw1JmakHBRwjd4suE64D2r5sh8M5ocHtOz8ORMZgIf0Xlmy2mWyhL7se/exec";

app.get('/', (req, res) => {
  res.send('Tamilnadu Skill Development Corporation. Use /track');
});

app.get('/track', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';

  const os = getOS(userAgent);
  const browser = getBrowser(userAgent);

  const locationRes = await fetch(`https://ipapi.co/${ip}/json`);
  const location = await locationRes.json();

  const log = {
    ip,
    os,
    browser,
    userAgent,
    location
  };

  // Send to Google Sheets
  await fetch(SHEET_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify(log),
    headers: { 'Content-Type': 'application/json' },
  });

  res.json(log);
});

// Utility: Parse OS
function getOS(userAgent) {
  if (/Windows NT/.test(userAgent)) return "Windows";
  if (/Mac OS X/.test(userAgent)) return "macOS";
  if (/Linux/.test(userAgent)) return "Linux";
  if (/Android/.test(userAgent)) return "Android";
  if (/iPhone|iPad/.test(userAgent)) return "iOS";
  return "Unknown";
}

// Utility: Parse Browser
function getBrowser(userAgent) {
  if (/Chrome/.test(userAgent)) return "Chrome";
  if (/Firefox/.test(userAgent)) return "Firefox";
  if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) return "Safari";
  if (/Edge/.test(userAgent)) return "Edge";
  if (/MSIE|Trident/.test(userAgent)) return "Internet Explorer";
  return "Unknown";
}

app.listen(port, () => {
  console.log(`Click Logger API listening at http://localhost:${port}`);
});
module.exports = app;
