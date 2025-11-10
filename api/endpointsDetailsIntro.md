# Endpoints Details

## Base URL

The base URL for all API requests is: [https://api.indid.io](https://api.indid.io)

## Technical Requirements

- HTTPS is required for all requests.
- The Indid API follows RESTful conventions.
- Operations are performed via `GET` and `POST` requests.
- Request and response bodies are encoded as JSON.

## Authentication

All endpoints require authentication via an API Key included in the `Authorization` header:

`Authorization: Bearer YOUR_API_KEY`

## Endpoint Access Requirements

Depending on the endpoint, one or more of the following requirements may apply:

- API Key validity: a valid API Key must be provided in the authorization header.
- Configured ChainId: the specified `chainId` must be enabled for the project associated with the API Key.
- Active module: the specific module (e.g., Account Abstraction, Notarization) must be enabled for the project (managed from the Dashboard).
- User authentication: the endpoint requires direct user authentication (via Dashboard login, not API Key).
- Public endpoint: no authentication required.
