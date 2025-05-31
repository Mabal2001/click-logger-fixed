# Click Logger API

A simple API to log IP address, browser, OS, and location when users visit a link.

## Endpoints

- `GET /` — health check
- `GET /track` — track user data

## Example Response

```json
{
  "ip": "x.x.x.x",
  "userAgent": "...",
  "os": "...",
  "browser": "...",
  "location": {
    "city": "...",
    "region": "...",
    "country": "..."
  }
}
```

## Deploy

You can deploy this easily to [Vercel](https://vercel.com).
