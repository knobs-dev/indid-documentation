# Rate Limiting

All requests are rate‑limited per IP address: 150 requests per 60 seconds.

If the limit is exceeded, clients should back off and retry after the window resets.
