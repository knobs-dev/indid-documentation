# API Key Security Best Practices

## DO

- Store API keys as environment variables (e.g., `.env` or a secret manager)
- Rotate API keys periodically (every 3–6 months)
- Apply the principle of least privilege (scopes/permissions)
- Monitor API key usage from the dashboard

## DON'T

- Never commit API keys to source control
- Do not expose API keys on the client side (browser)
- Do not share API keys publicly
